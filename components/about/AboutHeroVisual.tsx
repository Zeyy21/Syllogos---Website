"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../Reveal";

const STAGES = [
  {
    n: "01",
    label: "Evidence",
    detail: "Source material organized",
  },
  {
    n: "02",
    label: "CRAF 4.0",
    detail: "Criteria applied across ten dimensions",
  },
  {
    n: "03",
    label: "Researcher",
    detail: "Interpretation remains researcher-led",
  },
];

export default function AboutHeroVisual() {
  const reduce = useReducedMotion();

  return (
    <Reveal delay={0.08}>
      <div className="relative mx-auto aspect-[5/4] w-full max-w-[510px] overflow-hidden rounded-[1.5rem] border border-[rgb(var(--border)/0.09)] acrylic-elevated">
        <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-[rgb(var(--border)/0.07)] px-5 py-3.5">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-text-tertiary">
            Assessment pathway
          </span>
          <span className="flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-accent-text">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Researcher-led
          </span>
        </div>

        <div className="absolute inset-x-7 top-[22%] bottom-[18%] flex items-center sm:inset-x-9">
          <div className="relative w-full">
            <div className="absolute left-[13%] right-[13%] top-5 h-px bg-[rgb(var(--border)/0.1)]">
              <motion.div
                className="h-full origin-left bg-accent"
                initial={{ scaleX: 0, opacity: 0.35 }}
                animate={
                  reduce
                    ? { scaleX: 1, opacity: 0.65 }
                    : { scaleX: [0, 1, 1], opacity: [0.35, 0.75, 0] }
                }
                transition={{
                  duration: 4.2,
                  times: [0, 0.78, 1],
                  repeat: reduce ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="relative grid grid-cols-3 gap-3 sm:gap-5">
              {STAGES.map((stage, i) => (
                <div key={stage.n} className="flex min-w-0 flex-col items-center text-center">
                  <motion.div
                    className={`relative grid h-10 w-10 place-items-center rounded-full border font-mono text-[0.62rem] font-medium ${{
                      0: "border-[rgb(var(--border)/0.13)] bg-bg text-text-secondary",
                      1: "border-[rgb(var(--accent-soft)/0.42)] bg-accent/10 text-accent-text",
                      2: "border-[rgb(var(--border)/0.13)] bg-bg text-text-secondary",
                    }[i]}`}
                    animate={reduce ? undefined : { scale: [1, 1.055, 1] }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.65,
                    }}
                  >
                    {stage.n}
                  </motion.div>
                  <h3 className="mt-5 font-serif text-[clamp(0.95rem,1.8vw,1.15rem)] font-medium text-text">
                    {stage.label}
                  </h3>
                  <p className="mt-2 max-w-[8.5rem] text-[0.7rem] leading-relaxed text-text-tertiary sm:text-[0.76rem]">
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-5 bottom-4 flex items-center gap-3 border-t border-[rgb(var(--border)/0.07)] pt-4">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span className="font-mono text-[0.53rem] uppercase tracking-[0.13em] text-text-tertiary">
            AI supports assessment · Researchers retain interpretation
          </span>
        </div>
      </div>
    </Reveal>
  );
}
