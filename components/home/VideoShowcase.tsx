"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../Reveal";
import DisplayHeading from "../DisplayHeading";

const VIDEO_SRC = "/video/Syllogos%20-%20Overview.mp4";

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current sm:h-6 sm:w-6"
    >
      <path d="M8.25 5.38a1 1 0 0 1 1.53-.85l9.03 6.62a1.05 1.05 0 0 1 0 1.7l-9.03 6.62a1 1 0 0 1-1.53-.85V5.38Z" />
    </svg>
  );
}

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    setHasStarted(true);
    try {
      await video.play();
    } catch {
      // Native controls remain available if the browser declines playback.
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="overview"
      className="video-showcase section-seam relative overflow-hidden pb-[clamp(4.5rem,9vw,8rem)] pt-[clamp(4rem,7vw,6.5rem)]"
      aria-label="Syllogos product overview"
    >
      <div className="video-showcase-orbit" aria-hidden="true" />

      <div className="container-x relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <span className="readout">
              <span className="readout-index">FILM 01</span>
              <span className="text-text-tertiary/50">/</span>
              Product overview
            </span>
          </Reveal>

          <DisplayHeading
            as="h2"
            size="section"
            delay={0.05}
            className="mt-5"
          >
            Why research quality deserves <em>more than a summary.</em>
          </DisplayHeading>

          <Reveal delay={0.1}>
            <p
              id="overview-description"
              className="mx-auto mt-5 max-w-2xl text-balance text-[0.975rem] leading-relaxed text-text-secondary"
            >
              In under three minutes: the reasoning behind Syllogos, the CRAF
              4.0 framework, and an evidence-linked workflow designed to keep
              scholarly judgment in your hands.
            </p>
          </Reveal>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: reduce ? 0.35 : 0.85,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="video-stage group relative mx-auto mt-11 max-w-[1080px] sm:mt-14"
        >
          <div className="video-stage-ambient" aria-hidden="true" />

          <div className="video-stage-shell relative overflow-hidden rounded-[1.25rem] p-1.5 sm:rounded-[1.75rem] sm:p-2.5">
            <div className="flex h-10 items-center gap-2 border-b border-[rgb(var(--border)/0.08)] px-3 sm:h-12 sm:px-4">
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--surface-highlight)/0.14)] sm:h-2.5 sm:w-2.5" />
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--surface-highlight)/0.14)] sm:h-2.5 sm:w-2.5" />
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent-soft)/0.58)] sm:h-2.5 sm:w-2.5" />
              <span className="ml-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-text-tertiary sm:ml-2 sm:text-[0.62rem]">
                Syllogos / Overview
              </span>
              <span className="ml-auto font-mono text-[0.56rem] tabular-nums tracking-[0.12em] text-text-tertiary sm:text-[0.62rem]">
                02:50
              </span>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-b-[0.95rem] bg-[#050914] sm:rounded-b-[1.15rem]">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={VIDEO_SRC}
                poster="/video/syllogos-overview-poster.png"
                preload="metadata"
                playsInline
                controls={hasStarted}
                onPlay={() => {
                  setHasStarted(true);
                  setIsPlaying(true);
                }}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                aria-label="Syllogos product overview video"
                aria-describedby="overview-description"
              >
                Your browser does not support HTML video. You can{" "}
                <a href={VIDEO_SRC}>download the Syllogos overview video</a>
                {" "}instead.
              </video>

              {!isPlaying && (
                <div className="video-stage-poster pointer-events-none absolute inset-0 grid place-items-center">
                  <button
                    type="button"
                    onClick={playVideo}
                    className="video-play pointer-events-auto group/play relative grid h-16 w-16 cursor-pointer place-items-center rounded-full text-[#151109] sm:h-20 sm:w-20"
                    aria-label={hasStarted ? "Resume Syllogos overview" : "Play Syllogos overview"}
                  >
                    <span className="absolute inset-0 rounded-full border border-[rgb(var(--accent-soft)/0.5)]" />
                    <span className="relative ml-0.5 grid h-12 w-12 place-items-center rounded-full bg-accent shadow-[0_12px_40px_rgb(0_0_0/0.42)] transition-transform duration-300 group-hover/play:scale-105 sm:h-15 sm:w-15">
                      <PlayIcon />
                    </span>
                  </button>

                  {!hasStarted && (
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-6">
                      <p className="hidden max-w-sm font-serif text-[0.9rem] italic leading-relaxed text-white/70 sm:block">
                        Three minutes on why research quality deserves more than
                        a summary.
                      </p>
                      <span className="ml-auto rounded-full border border-white/12 bg-black/25 px-3 py-1.5 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/70 backdrop-blur-md sm:text-[0.6rem]">
                        4K product film
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <Reveal delay={0.16}>
          <div className="mx-auto mt-5 flex max-w-[1080px] flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-between">
            <p className="flex items-center gap-2">
              <span className="figure-label">Film 01</span>
              <span className="figure-caption text-[0.82rem] sm:text-[0.875rem]">
                Why Syllogos — a guided product overview
              </span>
            </p>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.13em] text-text-tertiary/70">
              Sound on · Fullscreen available
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
