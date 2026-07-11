"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useSceneEnabled } from "./useSceneEnabled";
import { useInView } from "./useInView";

// Heavy WebGL module, code-split with SSR disabled, fetched only at runtime.
const ParticleScene = dynamic(() => import("./ParticleScene"), {
  ssr: false,
});

/**
 * Lightweight ambient particle field for section backdrops. The three.js
 * bundle only downloads when this mounts, pauses off-screen, and only
 * mounts once its container has a measured size.
 */
export default function DepthField({ className = "" }: { className?: string }) {
  const enabled = useSceneEnabled();
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>("120px");

  const boxRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setReady(r.width > 0 && r.height > 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={(node) => {
        boxRef.current = node;
        inViewRef.current = node;
      }}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      {enabled && ready && <ParticleScene active={inView} />}
    </div>
  );
}
