"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "Bring in the research",
    body: "Use the screen, a PDF or file, a DOI, or pasted text without leaving your reading workflow.",
  },
  {
    n: "02",
    title: "Choose the assessment",
    body: "Select a quick overview, a focused evaluation, a complete CRAF report, or comparison between sources.",
  },
  {
    n: "03",
    title: "Examine the report",
    body: "Review the score, quality band, evidence, strengths, weaknesses, limitations, and questions for deeper reading.",
  },
  {
    n: "04",
    title: "Engage and compare",
    body: "Question the assessment through five research paradigms, then compare studies when claims or conclusions diverge.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 70%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section-pad border-t border-[rgb(var(--border)/0.07)]">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          index="05"
          title={
            <>
              From source to <em>informed scholarly judgment</em>
            </>
          }
          subtitle="A continuous path from reading to structured evaluation, dialogue, comparison, and a better-informed research decision."
        />

        <div ref={ref} className="relative mx-auto mt-14 max-w-2xl">
          {/* track */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-[rgb(var(--border)/0.1)] md:left-1/2" />
          {/* progress line */}
          <motion.div
            className="absolute left-[19px] top-2 w-px bg-accent md:left-1/2"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-9">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06}>
                <div
                  className={`relative flex items-start gap-5 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* node marker with serif numeral, like a figure index */}
                  <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full acrylic-elevated md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="font-serif text-[1.1rem] font-medium leading-none text-accent-text">
                      {step.n}
                    </span>
                  </div>
                  {/* card */}
                  <div
                    className={`flex-1 rounded-[1.1rem] acrylic card-hover p-5 md:max-w-[44%] ${
                      i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <h3 className="display-sm text-[1.1rem] text-text">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[0.85rem] leading-relaxed text-text-tertiary">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
