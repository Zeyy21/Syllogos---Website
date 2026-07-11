"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

/**
 * Gallery: a guided tour of the desktop app's five fullscreen states.
 *
 * Auto-advances every 7s, pauses on hover / when the tab is hidden /
 * under prefers-reduced-motion. Keyboard-accessible (Left/Right + Home/End).
 * Each shot swaps with a crossfade and is wrapped in the site's acrylic
 * frame to mirror the app's glass material system.
 */

type Theme = "dark" | "light";
type ShotId = "idle" | "actionmenu" | "bookmarks" | "insights" | "settings" | "labs";

type Slide = {
  id: ShotId;
  eyebrow: string;
  title: string;
  caption: string;
  alt: string;
};

const SLIDES: Slide[] = [
  {
    id: "idle",
    eyebrow: "Idle",
    title: "A quiet surface, ready when you are",
    caption:
      "Frameless acrylic shell that floats above your desktop. Nothing demands attention until there's something worth saying.",
    alt: "Syllogos desktop app idle state with a frameless overlay, empty paste surface, and sidebar",
  },
  {
    id: "actionmenu",
    eyebrow: "Contextual analysis",
    title: "Eight one-click actions on any paper",
    caption:
      "Paste or auto-detect a paper and Syllogos surfaces a contextual panel of analytical actions: fast for quick understanding and deep for rigorous critique.",
    alt: "Syllogos desktop app with captured research context and the CRAF 4.0 action menu below",
  },
  {
    id: "labs",
    eyebrow: "Labs · Beta",
    title: "Conversational research, on demand",
    caption:
      "Labs opens a grounded Q&A panel over your loaded paper. Ask follow-up questions, probe the methods, and challenge the findings without leaving the analysis.",
    alt: "Syllogos Labs conversational Q&A panel open over a loaded research paper with context rail",
  },
  {
    id: "bookmarks",
    eyebrow: "Saved research",
    title: "A library that ranks itself by what matters",
    caption:
      "Bookmark any result. Color-coded cards make the action type and credibility at-a-glance obvious, sortable, and persistent across sessions.",
    alt: "Syllogos Saved Research library with color-coded bookmarked analyses",
  },
  {
    id: "insights",
    eyebrow: "Insights dashboard",
    title: "A profile that learns how you read",
    caption:
      "Field distribution, credibility spread, confidence breakdown, and recurring keyword trends form a quiet mirror of your research behavior.",
    alt: "Syllogos Insights dashboard with field distribution, credibility spread and keywords",
  },
  {
    id: "settings",
    eyebrow: "Settings",
    title: "Tuned for how you actually work",
    caption:
      "Detection sensitivity, full-text fetch sources, theme, language, and a full keyboard-shortcut system keep every control within reach.",
    alt: "Syllogos settings panel with detection, fetch, appearance and keyboard shortcut options",
  },
];

const DWELL_MS = 7000;
const FADE_MS = 0.55;

// Reads the live site theme (data-theme attribute on <html>) so the gallery
// shows the matching app capture. Re-reads on theme toggles via MutationObserver.
function useSiteTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("dark");
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
  return theme;
}

export default function ShowcaseGallery() {
  const theme = useSiteTheme();
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabVisible = useRef(true);

  // Pause when the tab is hidden, with no autoplay swaps while it is out of view.
  useEffect(() => {
    const onVis = () => {
      tabVisible.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Autoplay is disabled on hover, hidden tab, or reduced-motion.
  useEffect(() => {
    if (reduce || paused || !tabVisible.current) return;
    const t = setTimeout(() => {
      setIdx((i) => (i + 1) % SLIDES.length);
    }, DWELL_MS);
    return () => clearTimeout(t);
  }, [idx, reduce, paused, tabVisible]);

  const goTo = useCallback((n: number) => {
    const len = SLIDES.length;
    setIdx(((n % len) + len) % len);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(idx + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(idx - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(SLIDES.length - 1);
    }
  };

  const slide = SLIDES[idx];
  const src = `/shots/fullscreen_${theme}_${slide.id}.png`;

  return (
    <section
      className="section-pad"
      aria-labelledby="gallery-heading"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="A guided tour"
          index="04"
          align="center"
          title={
            <>
              Six windows into <em>how Syllogos reads with you</em>
            </>
          }
          subtitle="Each capture is a real frame of the desktop app with the same acrylic surfaces, warm gold accent, and quiet typography. Nothing is mocked up or dressed up for the screenshot."
        />

        <div
          className="mx-auto mt-12 max-w-5xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={onKeyDown}
          role="tablist"
          aria-label="Syllogos app state gallery"
          tabIndex={0}
        >
          {/* Stage */}
          <Reveal>
            <div
              className="group relative overflow-hidden rounded-[1.5rem] acrylic-elevated p-2.5 cursor-default focus-visible:outline-2 focus-visible:outline-[color:var(--accent)] focus-visible:outline-offset-2"
              style={{ outlineOffset: "2px" }}
            >
              {/* Browser-style chrome above the image */}
              <div className="flex items-center gap-1.5 border-b border-[rgb(var(--border)/0.07)] px-3.5 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--surface-highlight)/0.14)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--surface-highlight)/0.14)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent-soft)/0.5)]" />
                <span className="ml-2 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-text-tertiary">
                  Syllogos | {slide.eyebrow}
                </span>
                <span className="ml-auto hidden items-center gap-1.5 text-[0.6rem] text-text-tertiary sm:flex">
                  <kbd className="rounded border border-[rgb(var(--border)/0.14)] px-1.5 py-0.5 text-[0.6rem] font-medium text-text-tertiary">
                    ←
                  </kbd>
                  <kbd className="rounded border border-[rgb(var(--border)/0.14)] px-1.5 py-0.5 text-[0.6rem] font-medium text-text-tertiary">
                    →
                  </kbd>
                  <span>to navigate</span>
                </span>
              </div>

              {/* Image stage with crossfade */}
              <div className="relative overflow-hidden rounded-[0.95rem] border border-[rgb(var(--border)/0.08)] bg-bg-deep">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${theme}-${slide.id}`}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.005 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.998 }}
                    transition={{
                      duration: FADE_MS,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative aspect-[16/9] w-full"
                  >
                    <Image
                      src={src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 960px"
                      className="object-cover object-top"
                      priority={idx === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Caption strip pinned to bottom of stage in soft acrylic */}
                <div
                  className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-10"
                  style={{
                    background:
                      "linear-gradient(to top, color-mix(in srgb, var(--bg-deep) 92%, transparent), transparent)",
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="figure-label">
                        Fig. {String(idx + 1).padStart(2, "0")} | {slide.eyebrow}
                      </span>
                      <h3
                        id="gallery-heading"
                        className="mt-1.5 max-w-xl display-sm text-[clamp(1.1rem,1.9vw,1.45rem)] text-text"
                      >
                        {slide.title}
                      </h3>
                      <p className="mt-1.5 max-w-xl text-[0.86rem] leading-relaxed text-text-tertiary">
                        {slide.caption}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tab row with progress segments */}
          <div
            className="mt-5 flex flex-wrap items-center justify-center gap-1.5"
            role="presentation"
          >
            {SLIDES.map((s, i) => {
              const active = i === idx;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={active}
                  aria-controls="gallery-heading"
                  aria-label={`${s.eyebrow}: ${s.title}`}
                  onClick={() => setIdx(i)}
                  className="group relative cursor-pointer overflow-hidden rounded-full px-3.5 py-1.5 text-[0.78rem] font-medium transition-colors duration-200"
                >
                  <span
                    className={
                      active
                        ? "text-text"
                        : "text-text-tertiary group-hover:text-text-secondary"
                    }
                  >
                    {s.eyebrow}
                  </span>
                  {/* progress underlay */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-1.5 bottom-1 h-0.5 rounded-full bg-[rgb(var(--border)/0.1)]"
                  >
                    {active && !reduce && !paused && (
                      <motion.span
                        key={`${slide.id}-${paused ? "p" : "r"}`}
                        className="block h-full rounded-full bg-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? "0%" : "100%" }}
                        transition={{
                          duration: paused ? 0.2 : DWELL_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
