"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "../Reveal";
import AppShot from "../AppShot";

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.96, 1]);

  return (
    <section ref={ref} className="relative pb-8 pt-2">
      <div className="container-x">
        <motion.div
          style={reduce ? undefined : { y, scale }}
          className="mx-auto max-w-4xl"
        >
          <Reveal>
            <AppShot
              screen="actionmenu"
              variant="fullscreen"
              alt="The Syllogos desktop app with a captured paper and the CRAF 4.0 action menu"
              priority
            />
          </Reveal>
        </motion.div>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 flex max-w-lg flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
            <span className="figure-label">Fig. 01</span>
            <span className="figure-caption text-[0.875rem]">
              Eight assessment workflows and source comparison, available
              without leaving the material you are reading.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
