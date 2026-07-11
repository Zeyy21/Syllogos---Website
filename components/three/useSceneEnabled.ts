"use client";

import { useEffect, useState } from "react";

/**
 * Decides whether a WebGL scene should mount.
 * Off for reduced-motion users, very small viewports, and when WebGL
 * is unavailable — callers render a static fallback instead.
 */
export function useSceneEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const tooSmall = window.innerWidth < 640;

    let hasWebGL = false;
    try {
      const canvas = document.createElement("canvas");
      hasWebGL = !!(
        canvas.getContext("webgl2") || canvas.getContext("webgl")
      );
    } catch {
      hasWebGL = false;
    }

    setEnabled(!reduce && !tooSmall && hasWebGL);
  }, []);

  return enabled;
}

/** Tracks the active site theme so 3D scenes can recolor. */
export function useThemeMode(): "dark" | "light" {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const read = () =>
      setMode(
        document.documentElement.getAttribute("data-theme") === "light"
          ? "light"
          : "dark",
      );
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  return mode;
}
