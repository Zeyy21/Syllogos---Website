"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useSceneEnabled, useThemeMode } from "./useSceneEnabled";
import { useInView } from "./useInView";

// WebGL bundle is lazy-loaded and never blocks first paint.
const KnowledgeGraph = dynamic(() => import("./KnowledgeGraph"), {
  ssr: false,
});

/**
 * Static fallback shown while the scene loads, on reduced-motion,
 * small screens, or when WebGL is unavailable.
 */
function StaticGraph() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full opacity-70"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g
        stroke="var(--accent)"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        fill="none"
      >
        <line x1="200" y1="200" x2="110" y2="120" />
        <line x1="200" y1="200" x2="300" y2="105" />
        <line x1="200" y1="200" x2="120" y2="290" />
        <line x1="200" y1="200" x2="290" y2="300" />
        <line x1="110" y1="120" x2="300" y2="105" />
        <line x1="120" y1="290" x2="290" y2="300" />
      </g>
      {[
        [200, 200, 16],
        [110, 120, 12],
        [300, 105, 11],
        [120, 290, 11],
        [290, 300, 12],
      ].map(([cx, cy, r], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r * 2.4} fill="url(#hg-glow)" />
          <circle cx={cx} cy={cy} r={r} fill="var(--accent)" />
        </g>
      ))}
    </svg>
  );
}

export default function HeroScene() {
  const enabled = useSceneEnabled();
  const mode = useThemeMode();
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>("200px");

  // The R3F canvas must mount into an already-measured box, or it locks
  // to a 300x150 default. Track the container size and only mount once
  // it has real dimensions.
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.round(r.width), h: Math.round(r.height) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const ready = size.w > 0 && size.h > 0;

  return (
    <div
      ref={(node) => {
        boxRef.current = node;
        inViewRef.current = node;
      }}
      className="absolute inset-0"
    >
      {enabled && ready ? (
        <KnowledgeGraph mode={mode} active={inView} />
      ) : (
        <StaticGraph />
      )}
    </div>
  );
}
