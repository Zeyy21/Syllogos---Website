"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ----------------------------------------------------------------
   Palette in warm gold mirrors the Syllogos application's
   --accent-primary: #d8b65a. Nodes glow amber; filaments are deep
   gold; the key light is the brand accent itself.
   ---------------------------------------------------------------- */
const PALETTE = {
  dark: {
    point: "#d8b65a",
    pointDim: "#8a6f2e",
    filament: "#6b5520",
    ambient: 0.4,
    keyLight: "#e8c970",
  },
  light: {
    point: "#b8963f",
    pointDim: "#9a7b2e",
    filament: "#c4a85a",
    ambient: 0.9,
    keyLight: "#d8b65a",
  },
};

type Mode = "dark" | "light";

/* ----------------------------------------------------------------
   Topology uses five primary points that echo the logo constellation.
   Satellites add depth. Kept sparse and intentional.
   ---------------------------------------------------------------- */
type Pt = { p: [number, number, number]; primary: boolean };

/* The five PRIMARY nodes are the literal Syllogos logo mark.
   Logo SVG coords (viewBox 0-100, Y-down) → scene space:
   sceneX = (svgX - 53) / 13 ,  sceneY = (52 - svgY) / 13
   so the constellation assembles into the exact brand graph.

     A (30,38) left-upper   B (70,26) top-right
     C (52,56) centre
     D (30,74) bottom-left  E (76,74) bottom-right        */
const LOGO = {
  A: [(30 - 53) / 13, (52 - 38) / 13, 0],
  B: [(70 - 53) / 13, (52 - 26) / 13, 0],
  C: [(52 - 53) / 13, (52 - 56) / 13, 0],
  D: [(30 - 53) / 13, (52 - 74) / 13, 0],
  E: [(76 - 53) / 13, (52 - 74) / 13, 0],
} as const;

const POINTS: Pt[] = [
  // index 0-4 are the logo nodes on the z=0 plane
  { p: LOGO.C as [number, number, number], primary: true }, // 0 centre
  { p: LOGO.A as [number, number, number], primary: true }, // 1 left-upper
  { p: LOGO.B as [number, number, number], primary: true }, // 2 top-right
  { p: LOGO.D as [number, number, number], primary: true }, // 3 bottom-left
  { p: LOGO.E as [number, number, number], primary: true }, // 4 bottom-right
  // index 5-9 are faint depth satellites pushed back
  { p: [-3.6, 1.0, -2.0], primary: false },
  { p: [3.7, -0.4, -2.3], primary: false },
  { p: [-0.2, 2.9, -2.5], primary: false },
  { p: [1.0, -2.9, -2.1], primary: false },
  { p: [-3.0, -2.0, -2.8], primary: false },
];

/* The six LOGO edges (drawn during the intro to form the mark),
   then a few faint satellite links that fade in afterward. */
const LOGO_EDGES: [number, number][] = [
  [1, 3], // A-D
  [1, 0], // A-C
  [1, 2], // A-B
  [0, 2], // C-B
  [0, 3], // C-D
  [0, 4], // C-E
];

const SATELLITE_EDGES: [number, number][] = [
  [1, 5],
  [2, 6],
  [2, 7],
  [3, 8],
  [3, 9],
];


/* ----------------------------------------------------------------
   Intro choreography (seconds):
     0.00–0.70  five logo nodes fly in
     0.50–1.40  six logo edges draw  → THE LOGO IS FORMED
     1.40–2.05  depth satellites fade/scale in
     1.55–2.30  satellite edges draw → graph expands past the logo
     2.30+      idle (drift, pulses, dust)
   ---------------------------------------------------------------- */
const LOGO_NODE_END = 0.7;
const LOGO_EDGE_START = 0.5;
const LOGO_EDGE_END = 1.4; // logo complete
const SAT_NODE_START = 1.4;
const SAT_NODE_END = 2.05;
const SAT_EDGE_START = 1.55;
const SAT_EDGE_END = 2.3;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

/* Logo nodes converge inward from just outside the mark; satellites
   drift in from deeper in space. Deterministic per index. */
function startOffset(i: number, isLogo: boolean): THREE.Vector3 {
  if (isLogo) {
    // start slightly outward along the node's own direction → converge in
    const f = POINTS[i].p;
    const out = new THREE.Vector3(f[0], f[1], f[2]);
    const len = out.length() || 1;
    out.multiplyScalar((len + 1.6) / len);
    out.z -= 1.4;
    return out;
  }
  const a = i * 2.39996;
  const r = 3.4 + (i % 3) * 0.6;
  return new THREE.Vector3(
    Math.cos(a) * r,
    Math.sin(a) * r,
    -3.2 - (i % 3) * 0.5,
  );
}

/* ----------------------------------------------------------------
   One set of filament edges that draws progressively (B endpoint
   travels from A→B). Used twice: the logo edges, then the satellites.
   ---------------------------------------------------------------- */
function EdgeSet({
  edges,
  clockRef,
  color,
  drawStart,
  drawEnd,
  maxOpacity,
  brightFlash,
}: {
  edges: [number, number][];
  clockRef: React.MutableRefObject<number>;
  color: string;
  drawStart: number;
  drawEnd: number;
  maxOpacity: number;
  /** brief brighten pulse the moment this set finishes drawing */
  brightFlash?: boolean;
}) {
  const ref = useRef<THREE.LineSegments>(null);

  const { geometry, basePositions } = useMemo(() => {
    const pos: number[] = [];
    for (const [a, b] of edges) {
      pos.push(...POINTS[a].p, ...POINTS[b].p);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return { geometry: g, basePositions: pos.slice() };
  }, [edges]);

  useFrame(() => {
    if (!ref.current) return;
    const t = clockRef.current;
    const attr = ref.current.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const m = ref.current.material as THREE.LineBasicMaterial;

    if (t < drawEnd) {
      const span = drawEnd - drawStart;
      edges.forEach((_, ei) => {
        const stagger = (ei / edges.length) * span * 0.5;
        const local = clamp01(
          (t - drawStart - stagger) / (span * 0.55),
        );
        const grow = easeOut(local);
        const base = ei * 6;
        const ax = basePositions[base];
        const ay = basePositions[base + 1];
        const az = basePositions[base + 2];
        const bx = basePositions[base + 3];
        const by = basePositions[base + 4];
        const bz = basePositions[base + 5];
        attr.setXYZ(
          ei * 2 + 1,
          ax + (bx - ax) * grow,
          ay + (by - ay) * grow,
          az + (bz - az) * grow,
        );
      });
      attr.needsUpdate = true;
      m.opacity = clamp01((t - drawStart) / (span * 0.4)) * maxOpacity;
    } else {
      // settled with a faint live pulse and a brief flash right after
      // the set completes (the logo "snaps into focus")
      const since = t - drawEnd;
      const flash =
        brightFlash && since < 0.5
          ? (1 - since / 0.5) * maxOpacity * 1.4
          : 0;
      m.opacity = maxOpacity * 0.9 + Math.sin(t * 0.5) * 0.04 + flash;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/* Logo edges draw first and brighter; satellite edges follow, fainter. */
function Filaments({
  mode,
  clockRef,
}: {
  mode: Mode;
  clockRef: React.MutableRefObject<number>;
}) {
  const c = PALETTE[mode];
  return (
    <>
      <EdgeSet
        edges={LOGO_EDGES}
        clockRef={clockRef}
        color={c.point}
        drawStart={LOGO_EDGE_START}
        drawEnd={LOGO_EDGE_END}
        maxOpacity={0.34}
        brightFlash
      />
      <EdgeSet
        edges={SATELLITE_EDGES}
        clockRef={clockRef}
        color={c.filament}
        drawStart={SAT_EDGE_START}
        drawEnd={SAT_EDGE_END}
        maxOpacity={0.16}
      />
    </>
  );
}

/* A travelling pulse that glides along edges once the graph is built. */
function SignalPulses({
  mode,
  clockRef,
}: {
  mode: Mode;
  clockRef: React.MutableRefObject<number>;
}) {
  const c = PALETTE[mode];
  const tracks = useMemo(
    () =>
      [
        [0, 2],
        [0, 3],
        [1, 2],
      ].map(([a, b], i) => ({
        from: new THREE.Vector3(...POINTS[a].p),
        to: new THREE.Vector3(...POINTS[b].p),
        offset: i * 1.7,
        speed: 0.22 + i * 0.04,
      })),
    [],
  );
  const refs = useRef<THREE.Mesh[]>([]);

  useFrame(() => {
    const t = clockRef.current;
    // pulses only travel once the logo edges exist
    const live = t > LOGO_EDGE_END;
    tracks.forEach((tr, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      if (!live) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = 0;
        return;
      }
      const local = (t - LOGO_EDGE_END) * tr.speed + tr.offset;
      const f = local % 1;
      mesh.position.lerpVectors(tr.from, tr.to, f);
      const fade = Math.sin(f * Math.PI);
      (mesh.material as THREE.MeshBasicMaterial).opacity = fade * 0.9;
      mesh.scale.setScalar(0.4 + fade * 0.6);
    });
  });

  return (
    <group>
      {tracks.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={c.point} transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

/* ----------------------------------------------------------------
   Data point is a precise ring marker. Flies in from a scattered start
   during the intro, then breathes gently.
   ---------------------------------------------------------------- */
function DataPoint({
  pt,
  mode,
  index,
  clockRef,
}: {
  pt: Pt;
  mode: Mode;
  index: number;
  clockRef: React.MutableRefObject<number>;
}) {
  const c = PALETTE[mode];
  const grp = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const size = pt.primary ? 0.13 : 0.075;

  const finalPos = useMemo(() => new THREE.Vector3(...pt.p), [pt]);
  const startPos = useMemo(
    () => startOffset(index, pt.primary),
    [index, pt.primary],
  );
  // logo nodes fly in first (0 → LOGO_NODE_END), satellites after
  const flyStart = pt.primary
    ? index * 0.06
    : SAT_NODE_START + (index - 5) * 0.07;
  const flyEnd = pt.primary ? LOGO_NODE_END : SAT_NODE_END;

  useFrame(() => {
    if (!grp.current) return;
    const t = clockRef.current;
    const local = clamp01((t - flyStart) / (flyEnd - flyStart));
    const e = easeOut(local);

    grp.current.position.lerpVectors(startPos, finalPos, e);
    grp.current.scale.setScalar(e);

    // core breathing only once placed
    if (core.current && local >= 1) {
      const b = 1 + Math.sin(t * 0.9 + index * 1.3) * 0.12;
      core.current.scale.setScalar(b);
    }
  });

  return (
    <group ref={grp} scale={0}>
      <mesh>
        <ringGeometry args={[size, size + 0.014, 48]} />
        <meshBasicMaterial
          color={pt.primary ? c.point : c.pointDim}
          transparent
          opacity={pt.primary ? 0.85 : 0.5}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {pt.primary && (
        <mesh>
          <ringGeometry args={[size + 0.07, size + 0.078, 48]} />
          <meshBasicMaterial
            color={c.point}
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
      <mesh ref={core}>
        <circleGeometry args={[size * 0.42, 24]} />
        <meshBasicMaterial color={c.point} />
      </mesh>
    </group>
  );
}

/* Keeps all ring/core meshes facing the camera. */
function DataPoints({
  mode,
  clockRef,
}: {
  mode: Mode;
  clockRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (group.current) {
      group.current.children.forEach((child) => {
        child.children.forEach((c) => c.quaternion.copy(camera.quaternion));
      });
    }
  });

  return (
    <group ref={group}>
      {POINTS.map((pt, i) => (
        <DataPoint
          key={i}
          pt={pt}
          mode={mode}
          index={i}
          clockRef={clockRef}
        />
      ))}
    </group>
  );
}

/* Sparse ambient dust fades in after the graph assembles. */
function Dust({
  mode,
  clockRef,
}: {
  mode: Mode;
  clockRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Points>(null);
  const c = PALETTE[mode];
  const count = 70;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const t = clockRef.current;
    ref.current.rotation.y = t * 0.012;
    const m = ref.current.material as THREE.PointsMaterial;
    m.opacity = clamp01((t - SAT_NODE_START) / 0.9) * 0.4;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={c.pointDim}
        size={0.028}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* Whole scene: drives the intro clock, then cursor parallax + drift. */
function Rig({ mode }: { mode: Mode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const target = useRef({ x: 0, y: 0 });
  const clockRef = useRef(0); // intro time, in seconds, only advances forward

  useFrame((_, delta) => {
    const slow =
      typeof window !== "undefined" &&
      window.location.search.includes("slowintro")
        ? 0.22
        : 1;
    clockRef.current += Math.min(delta, 0.05) * slow;
    if (!group.current) return;

    const t = clockRef.current;
    // parallax + drift only ramp in once the logo has formed
    const settle = clamp01((t - LOGO_EDGE_END) / 0.8);
    const k = Math.min(1, delta * 1.8);
    target.current.x += (pointer.x * 0.2 - target.current.x) * k;
    target.current.y += (pointer.y * 0.14 - target.current.y) * k;
    const drift = t * 0.04;
    group.current.rotation.y =
      (target.current.x + Math.sin(drift) * 0.1) * settle;
    group.current.rotation.x =
      (-target.current.y + Math.cos(drift * 0.8) * 0.04) * settle;
  });

  return (
    <group ref={group}>
      <Filaments mode={mode} clockRef={clockRef} />
      <SignalPulses mode={mode} clockRef={clockRef} />
      <DataPoints mode={mode} clockRef={clockRef} />
      <Dust mode={mode} clockRef={clockRef} />
    </group>
  );
}

export default function KnowledgeGraph({
  mode,
  active = true,
}: {
  mode: Mode;
  active?: boolean;
}) {
  const c = PALETTE[mode];
  return (
    <Canvas
      camera={{ position: [0, 0, 7.6], fov: 40 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      resize={{ debounce: 0 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <ambientLight intensity={c.ambient} />
      <directionalLight position={[4, 5, 6]} intensity={1.4} color={c.keyLight} />
      <directionalLight position={[-5, -2, 2]} intensity={0.5} color={c.keyLight} />
      <Rig mode={mode} />
    </Canvas>
  );
}
