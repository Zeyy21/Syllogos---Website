"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reports whether an element is on screen. Used to pause WebGL scenes
 * when scrolled out of view — saves battery/GPU and stops off-screen
 * render loops.
 */
export function useInView<T extends HTMLElement>(margin = "150px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: margin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);

  return { ref, inView };
}
