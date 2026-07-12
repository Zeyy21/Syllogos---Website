"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { IconRadar, IconBolt, IconShield } from "../Icons";

/* A card that tilts subtly toward the cursor on desktop only */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg)`;
  };
  const reset = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export default function ValueProps() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="Beyond summarization"
          index="01"
          align="left"
          title={
            <>
              A paper is more than its findings. <em>Evaluate its quality.</em>
            </>
          }
          subtitle="CRAF 4.0 examines methods, evidence, originality, theory, literature, sources, writing, peer-review status, reflexivity, and ethical or institutional standards in one structured assessment."
        />

        {/* Bento grid, deliberately asymmetric */}
        <div className="mt-12 grid gap-3.5 md:grid-cols-12">
          {/* Large feature cell */}
          <Reveal className="md:col-span-7">
            <TiltCard className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] acrylic card-hover p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-[11px] bg-accent/12 text-accent-text">
                    <IconRadar width={20} height={20} />
                  </span>
                  <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-text-tertiary">
                    <span className="text-text-tertiary/50">A1</span> &middot; Detection
                  </span>
                </div>
                <h3 className="mt-6 display-sm text-[1.35rem] text-text">
                    Assessment begins where reading happens
                </h3>
                <p className="mt-2.5 max-w-md text-[0.9rem] leading-relaxed text-text-tertiary">
                  Bring in a screen, PDF, DOI, file, or pasted text. Syllogos
                  organizes the material for assessment without forcing you to
                  rebuild your workflow around the application.
                </p>
                {/* decorative scanning line */}
                <div className="mt-6 flex-1">
                  <div className="relative h-full min-h-[110px] overflow-hidden rounded-xl border border-[rgb(var(--border)/0.08)] bg-bg-deep">
                    <div className="space-y-2 p-4">
                      {[0.9, 0.7, 0.8, 0.55].map((w, i) => (
                        <div
                          key={i}
                          className="h-2 rounded-full bg-[rgb(var(--surface-highlight)/0.07)]"
                          style={{ width: `${w * 100}%` }}
                        />
                      ))}
                    </div>
                    <motion.div
                      className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-accent/12 to-transparent"
                      animate={{ y: ["-48px", "160px"] }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>
              </article>
            </TiltCard>
          </Reveal>

          {/* Tall narrow cell */}
          <Reveal delay={0.08} className="md:col-span-5">
            <TiltCard className="h-full">
              <article className="group flex h-full flex-col rounded-[1.25rem] acrylic card-hover p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-[11px] bg-accent/12 text-accent-text">
                    <IconBolt width={20} height={20} />
                  </span>
                  <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-text-tertiary">
                    <span className="text-text-tertiary/50">A2</span> &middot; Analysis
                  </span>
                </div>
                <h3 className="mt-6 display-sm text-[1.35rem] text-text">
                    Peer-review criteria, made explicit
                </h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-text-tertiary">
                  Examine methods, validity, novelty, coherence, sources, bias,
                  or run the complete CRAF 4.0 assessment. Each action presents
                  its criteria, evidence, and limitations in a structured form.
                </p>
                <div className="mt-auto grid grid-cols-4 gap-1.5 pt-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-md border border-[rgb(var(--border)/0.08)] bg-[rgb(var(--surface-highlight)/0.04)]"
                    >
                      <div className="m-1.5 h-1 w-3 rounded-full bg-accent/40" />
                    </div>
                  ))}
                </div>
              </article>
            </TiltCard>
          </Reveal>

          {/* Wide cell is desktop-native, private, and always there. Complements
              (does not duplicate) the CRAF instrument section below. */}
          <Reveal delay={0.12} className="md:col-span-12">
            <TiltCard>
              <article className="group grid items-center gap-6 rounded-[1.25rem] acrylic card-hover p-7 md:grid-cols-[1.4fr_1fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-[11px] bg-accent/12 text-accent-text">
                      <IconShield width={20} height={20} />
                    </span>
                    <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-text-tertiary">
                      <span className="text-text-tertiary/50">A3</span> &middot; Native
                    </span>
                  </div>
                  <h3 className="mt-6 display-sm text-[1.35rem] text-text">
                    Collaboration, not replacement
                  </h3>
                  <p className="mt-2.5 max-w-lg text-[0.9rem] leading-relaxed text-text-tertiary">
                    Artificial intelligence organizes and analyzes the evidence;
                    the researcher examines the result, supplies disciplinary
                    context, and remains responsible for its interpretation.
                  </p>
                </div>
                {/* spec readout with measured facts in mono */}
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    ["SUMMON", "Ctrl ⇧ Space"],
                    ["FOOTPRINT", "~85 MB"],
                    ["DETECTION", "OCR + title"],
                    ["OUTPUT", "Researcher-led"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="rounded-xl border border-[rgb(var(--border)/0.08)] bg-[rgb(var(--surface-highlight)/0.03)] px-3.5 py-3"
                    >
                      <div className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-text-tertiary/70">
                        {k}
                      </div>
                      <div className="numeral mt-1 text-[0.92rem] font-medium text-text">
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
