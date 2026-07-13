"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import AppShot from "../AppShot";
import MagneticButton from "../MagneticButton";
import { IconArrowRight } from "../Icons";

const ease = [0.22, 1, 0.36, 1] as const;

const SIGNALS = [
  ["10", "quality dimensions"],
  ["05", "assessment bands"],
  ["01", "researcher in command"],
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [platform, setPlatform] = useState<"macOS" | "Windows" | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const productY = useTransform(scrollYProgress, [0, 1], [0, 54]);
  const productScale = useTransform(scrollYProgress, [0, 1], [1, 0.965]);

  useEffect(() => {
    const platformName = navigator.userAgent.toLowerCase();
    if (platformName.includes("mac")) setPlatform("macOS");
    else if (platformName.includes("win")) setPlatform("Windows");
  }, []);

  return (
    <section
      ref={ref}
      className="hero-field hero-premium relative min-h-[100svh] overflow-hidden"
      aria-labelledby="home-hero-title"
    >
      <div className="hero-premium-glow" aria-hidden="true" />

      <div className="container-x relative grid min-h-[100svh] items-center gap-12 pb-20 pt-28 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 lg:pb-24 lg:pt-32">
        <div className="relative z-10 max-w-[580px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mobile-reveal flex items-center gap-3"
          >
            <span className="readout">
              <span className="readout-index">CRAF 4.0</span>
              <span className="text-text-tertiary/50">/</span>
              Research quality, made legible
            </span>
          </motion.div>

          <h1
            id="home-hero-title"
            className="mt-7 display text-[clamp(3.15rem,14vw,4.25rem)] text-text sm:text-[clamp(4rem,7vw,6.6rem)] lg:text-[clamp(4rem,6vw,6rem)]"
          >
            <motion.span
              className="mobile-reveal block"
              initial={{ opacity: 0, y: "0.38em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.1, ease }}
            >
              Assess the study.
            </motion.span>
            <motion.span
              className="mobile-reveal block"
              initial={{ opacity: 0, y: "0.38em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.22, ease }}
            >
              <em>See what holds.</em>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.42, ease }}
            className="mobile-reveal mt-6 max-w-xl text-[1rem] leading-[1.72] text-text-secondary sm:text-[1.08rem]"
          >
            Syllogos turns a paper into a structured, evidence-linked assessment
            of its methods, validity, contribution, sources, and limitations—so
            you can inspect the reasoning, not merely accept a summary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.52, ease }}
            className="mobile-reveal mt-8 flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center"
          >
            <MagneticButton
              href="/download"
              className="w-[min(19rem,100%)] sm:w-auto"
            >
              {platform ? `Download for ${platform}` : "Start free"}
              <IconArrowRight width={16} height={16} />
            </MagneticButton>
            <MagneticButton
              href="#overview"
              variant="secondary"
              className="w-[min(19rem,100%)] sm:w-auto"
            >
              Watch the overview
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.62, ease }}
            className="mobile-reveal mt-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-text-tertiary"
          >
            Free to start · No credit card · macOS &amp; Windows
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.72, ease }}
            className="mobile-reveal mt-10 grid max-w-lg grid-cols-3 border-y border-[rgb(var(--border)/0.09)]"
          >
            {SIGNALS.map(([value, label], index) => (
              <div
                key={label}
                className={`py-4 pr-3 ${index > 0 ? "border-l border-[rgb(var(--border)/0.09)] pl-4" : ""}`}
              >
                <dt className="sr-only">{label}</dt>
                <dd className="numeral text-[1rem] text-text sm:text-[1.15rem]">
                  {value}
                </dd>
                <dd className="mt-1 text-[0.68rem] leading-snug text-text-tertiary sm:text-[0.72rem]">
                  {label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 34, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: reduce ? 0.35 : 0.95, delay: 0.28, ease }}
          style={reduce ? undefined : { y: productY, scale: productScale }}
          className="mobile-reveal relative mx-auto w-full max-w-[720px] lg:max-w-none"
        >
          <div className="hero-product-aura" aria-hidden="true" />
          <div className="relative">
            <AppShot
              screen="actionmenu"
              variant="fullscreen"
              alt="Syllogos assessing a research paper with the CRAF 4.0 action menu"
              priority
              className="hero-product-shot"
            />

            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease }}
              className="hero-result-card absolute -bottom-6 right-3 hidden w-[250px] rounded-[1.1rem] p-4 sm:block lg:-right-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-text-tertiary">
                  Methodological rigor
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent-soft)/0.75)]" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="display-sm text-[1.15rem] text-text">Strong</div>
                  <div className="mt-1 text-[0.7rem] text-text-tertiary">Evidence traced</div>
                </div>
                <div className="numeral text-[2.3rem] leading-none text-text">8.6</div>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-[rgb(var(--border)/0.1)]">
                <div className="h-full w-[86%] rounded-full bg-accent" />
              </div>
            </motion.div>
          </div>

          <p className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-2 text-center lg:mt-7">
            <span className="figure-label">Fig. 01</span>
            <span className="figure-caption text-[0.8rem] sm:text-[0.86rem]">
              Assessment available inside the reading moment
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
