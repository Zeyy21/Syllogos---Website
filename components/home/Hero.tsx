"use client";

import { motion } from "framer-motion";
import MagneticButton from "../MagneticButton";
import { IconArrowRight } from "../Icons";
import BrandConstellation from "./BrandConstellation";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="hero-field relative min-h-[100svh] overflow-hidden">
      {/* readability scrim behind the copy */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, var(--bg) 0%, color-mix(in srgb, var(--bg) 92%, transparent) 40%, color-mix(in srgb, var(--bg) 22%, transparent) 68%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute right-[clamp(1rem,4vw,5rem)] top-1/2 hidden w-[min(47vw,620px)] -translate-y-[47%] lg:block">
        <BrandConstellation />
      </div>

      <div className="pointer-events-none absolute -right-24 top-28 h-72 w-72 opacity-25 lg:hidden">
        <BrandConstellation />
      </div>

      <div className="container-x relative flex min-h-[100svh] items-center">
        <div className="max-w-[650px] py-32 lg:max-w-[600px]">
          {/* Masthead line, a journal volume/edition slug in mono */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-3"
          >
            <span className="readout">
              <span className="readout-index">SYLLOGOS / CRAF 4.0</span>
            </span>
            <span className="hidden items-center gap-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-text-tertiary">
                democratizing research
              </span>
            </span>
          </motion.div>

          {/* The headline is set in Fraunces display + italic gold. */}
          <h1 className="mt-7 display text-[clamp(3.15rem,6.6vw,5.7rem)] text-text">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease }}
            >
              Read as a researcher.
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.26, ease }}
            >
              <em>Evaluate as a reviewer.</em>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="mt-6 max-w-lg text-[1.06rem] leading-relaxed text-text-secondary"
          >
            Syllogos brings the evaluative logic of an experienced Q1 peer-review
            committee to every researcher. It organizes the evidence, tests the
            study across ten dimensions, and leaves the final scholarly judgment
            in human hands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
            className="mt-8 flex flex-col items-start gap-2.5 sm:flex-row sm:items-center"
          >
            <MagneticButton href="/download">
              Start free
              <IconArrowRight width={16} height={16} />
            </MagneticButton>
            <MagneticButton href="/features" variant="secondary">
              Explore the assessment
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.74, ease }}
            className="mt-4 font-mono text-[0.72rem] tracking-[0.04em] text-text-tertiary"
          >
            AI provides the analysis · You provide the understanding
          </motion.p>

          {/* Spec tokens form a measured strip with mono labels and tick nodes */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.86, ease }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {[
              ["FRAMEWORK", "CRAF 4.0"],
              ["DIMENSIONS", "10 evaluated"],
              ["BANDS", "5 quality levels"],
              ["JUDGMENT", "Human-led"],
            ].map(([k, v]) => (
              <span key={k} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-text-tertiary/70">
                  {k}
                </span>
                <span className="text-[0.78rem] font-medium text-text-secondary">
                  {v}
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 hidden h-16 w-px bg-gradient-to-b from-[rgb(var(--accent-soft)/0.35)] to-transparent lg:block" />
    </section>
  );
}
