"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Variant = "overlay" | "fullscreen";

type Props = {
  /** screen identifier, e.g. "actionmenu", "idle", "insights", "labs" */
  screen: string;
  variant: Variant;
  alt: string;
  className?: string;
  priority?: boolean;
};

// Dimensions match the captured screenshots exactly (see
// scripts/captureShots.mjs). Fullscreen captures render at the monitor's
// native 1920×1080; overlays at 520×780. Both are crisp 1:1 renders with no
// upscaling, which gives 2× density for the website's ~960px display width.
const DIMS: Record<Variant, { w: number; h: number }> = {
  fullscreen: { w: 1920, h: 1080 },
  overlay: { w: 520, h: 780 },
};

/**
 * Framed product screenshot that mirrors the site theme. A dark site shows
 * the dark app capture, a light site shows the light capture. Swaps live on
 * theme toggle. Wrapped in an acrylic shell with window chrome that mirrors
 * the app's own frameless window.
 */
export default function AppShot({
  screen,
  variant,
  alt,
  className = "",
  priority = false,
}: Props) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const read = () =>
      setTheme(
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

  const { w, h } = DIMS[variant];
  const src = `/shots/${variant}_${theme}_${screen}.png`;

  return (
    <div
      className={`group relative overflow-hidden rounded-[1.25rem] acrylic-elevated p-2 ${className}`}
    >
      <div className="overflow-hidden rounded-[0.85rem] border border-[rgb(var(--border)/0.08)] bg-bg-deep">
        <div className="flex items-center gap-1.5 border-b border-[rgb(var(--border)/0.07)] px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--surface-highlight)/0.14)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--surface-highlight)/0.14)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent-soft)/0.5)]" />
          <span className="ml-1.5 text-[0.62rem] font-medium uppercase tracking-[0.1em] text-text-tertiary">
            Syllogos
          </span>
        </div>
        <Image
          key={src}
          src={src}
          alt={alt}
          width={w}
          height={h}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 620px"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
