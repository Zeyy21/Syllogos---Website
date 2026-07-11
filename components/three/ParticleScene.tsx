"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeMode } from "./useSceneEnabled";

function ParticleCloud({ mode }: { mode: "dark" | "light" }) {
  const ref = useRef<THREE.Points>(null);
  const count = 90;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    return arr;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.022 + pointer.x * 0.12;
    ref.current.rotation.x = pointer.y * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={mode === "dark" ? "#d8b65a" : "#b8963f"}
        size={0.05}
        transparent
        opacity={mode === "dark" ? 0.5 : 0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleScene({
  active = true,
}: {
  active?: boolean;
}) {
  const mode = useThemeMode();
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
      resize={{ debounce: 0 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <ParticleCloud mode={mode} />
    </Canvas>
  );
}
