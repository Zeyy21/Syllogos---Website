"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import { IconArrowRight } from "../Icons";

/**
 * Gallery: a guided tour of the desktop app's five fullscreen states.
 *
 * Auto-advances every 4s and pauses only while hovered.
 * Keyboard-accessible (Left/Right + Home/End).
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
    title: "Assessment available inside the reading moment",
    caption:
      "Open Syllogos over the source when you need it, then hide it without interrupting the work in front of you.",
    alt: "Syllogos desktop app idle state with a frameless overlay, empty paste surface, and sidebar",
  },
  {
    id: "actionmenu",
    eyebrow: "Contextual analysis",
    title: "Eight ways to assess a study",
    caption:
      "Move from context and key points to methods, validity, contribution, coherence, sources, bias, and a complete integrated assessment.",
    alt: "Syllogos desktop app with captured research context and the CRAF 4.0 action menu below",
  },
  {
    id: "labs",
    eyebrow: "Labs · Beta",
    title: "One assessment, five research paradigms",
    caption:
      "Question the assessment through Positivist, Post-Positivist, Constructivist, Critical, and Pragmatist perspectives.",
    alt: "Syllogos Labs conversational Q&A panel open over a loaded research paper with context rail",
  },
  {
    id: "bookmarks",
    eyebrow: "Saved research",
    title: "Keep each assessment with its source",
    caption:
      "Save results with their assessment type, quality band, confidence, and evidence so the reasoning remains available for later review.",
    alt: "Syllogos Saved Research library with color-coded bookmarked analyses",
  },
  {
    id: "insights",
    eyebrow: "Insights dashboard",
    title: "See the pattern across your research",
    caption:
      "Review fields, quality bands, confidence levels, and recurring concepts across the body of work you have assessed.",
    alt: "Syllogos Insights dashboard with field distribution, quality-band spread and keywords",
  },
  {
    id: "settings",
    eyebrow: "Settings",
    title: "A workflow that stays under your control",
    caption:
      "Control detection, content retrieval, language, appearance, and keyboard shortcuts while keeping the researcher in command.",
    alt: "Syllogos settings panel with detection, fetch, appearance and keyboard shortcut options",
  },
];

const DWELL_MS = 4000;
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

  // Autoplay pauses only when the pointer is over the gallery.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setIdx((i) => (i + 1) % SLIDES.length);
    }, DWELL_MS);
    return () => clearTimeout(t);
  }, [idx, paused]);

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
          eyebrow="Assessment in practice"
          index="04"
          align="center"
          title={
            <>
              Six windows into <em>human-AI research evaluation</em>
            </>
          }
          subtitle="From first input to dialogic review, each screen supports one purpose: making rigorous research assessment clearer, faster, and more accessible."
        />

        <div
          className="mx-auto mt-12 max-w-5xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
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

                {/* Prominent manual navigation, always visible over the stage */}
                <button
                  type="button"
                  onClick={() => goTo(idx - 1)}
                  aria-label="Previous figure"
                  className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-[rgb(var(--border)/0.14)] bg-bg/80 text-text shadow-[var(--shadow-sm)] backdrop-blur-md transition-[transform,background-color,border-color] duration-200 hover:scale-105 hover:border-[rgb(var(--accent-soft)/0.42)] hover:bg-surface sm:grid"
                >
                  <IconArrowRight
                    width={19}
                    height={19}
                    className="rotate-180"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(idx + 1)}
                  aria-label="Next figure"
                  className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-[rgb(var(--border)/0.14)] bg-bg/80 text-text shadow-[var(--shadow-sm)] backdrop-blur-md transition-[transform,background-color,border-color] duration-200 hover:scale-105 hover:border-[rgb(var(--accent-soft)/0.42)] hover:bg-surface sm:grid"
                >
                  <IconArrowRight width={19} height={19} />
                </button>

                {/* Caption strip pinned to bottom of stage in soft acrylic */}
                <div
                  className="gallery-caption relative px-4 py-4 sm:absolute sm:inset-x-0 sm:bottom-0 sm:px-5 sm:pb-4 sm:pt-10"
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

              <div className="mt-2 grid grid-cols-2 gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={() => goTo(idx - 1)}
                  aria-label="Previous figure"
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[rgb(var(--border)/0.1)] bg-bg/60 px-4 py-2.5 text-[0.8rem] font-medium text-text-secondary transition-colors hover:border-[rgb(var(--accent-soft)/0.32)] hover:text-text"
                >
                  <IconArrowRight width={16} height={16} className="rotate-180" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => goTo(idx + 1)}
                  aria-label="Next figure"
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[rgb(var(--accent-soft)/0.28)] bg-accent/10 px-4 py-2.5 text-[0.8rem] font-medium text-text transition-colors hover:bg-accent/15"
                >
                  Next
                  <IconArrowRight width={16} height={16} />
                </button>
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
