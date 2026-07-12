"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionHeading from "../SectionHeading";

const MODES = [
  { id: "evidence", label: "Extract evidence", readout: "PASS 01 / SOURCE" },
  { id: "rubric", label: "Apply rubric", readout: "PASS 02 / CRITERIA" },
  { id: "resolve", label: "Present assessment", readout: "PASS 03 / RESULT" },
] as const;

const RUBRIC = [
  ["Sampling strategy justified", true],
  ["Power analysis reported", true],
  ["Primary outcome pre-specified", true],
  ["Attrition fully reconciled", false],
] as const;

export default function LiveAssessment() {
  const [mode, setMode] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const timer = window.setTimeout(() => setMode((v) => (v + 1) % MODES.length), 4200);
    return () => window.clearTimeout(timer);
  }, [mode, paused, reduce]);

  const active = MODES[mode];

  return (
    <section className="section-pad section-tone-enter overflow-hidden">
      <div className="container-x">
        <SectionHeading
          eyebrow="Assessment, made transparent"
          index="02"
          align="left"
          title={<>See how expert evaluation <em>takes shape</em></>}
          subtitle="Syllogos follows a transparent appraisal sequence: identify the evidence, apply explicit criteria, determine the quality band, and present an assessment for the researcher to examine."
        />

        <div
          className="mt-12 overflow-hidden rounded-[1.55rem] border border-[rgb(var(--accent-soft)/0.22)] bg-surface shadow-[0_30px_100px_rgb(0_0_0/0.28)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex flex-col gap-3 border-b border-[rgb(var(--border)/0.08)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.17em] text-text-secondary">
                Structured assessment in progress
              </span>
              <span className="hidden font-mono text-[0.58rem] text-text-tertiary sm:inline">CRAF / 4.0.0</span>
            </div>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent-text">{active.readout}</span>
          </div>

          <div className="grid min-h-[540px] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden border-b border-[rgb(var(--border)/0.08)] p-5 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgb(var(--border) / .035) 1px, transparent 1px)", backgroundSize: "100% 32px" }} />
              <div className="relative flex items-center justify-between">
                <span className="figure-label">SOURCE / METHODS / P. 08</span>
                <span className="font-mono text-[0.58rem] text-text-tertiary">DOI 10.7717/peerj.2026.041</span>
              </div>

              <div className="relative mt-8 max-w-[570px] rounded-[1rem] border border-[rgb(var(--border)/0.1)] bg-bg/55 p-6 shadow-[0_18px_50px_rgb(0_0_0/0.16)] sm:p-8">
                <div className="mb-7 h-3 w-2/3 rounded-full bg-[rgb(var(--surface-highlight)/0.1)]" />
                <div className="space-y-4 font-serif text-[1rem] leading-[1.85] text-text-secondary sm:text-[1.08rem]">
                  <p>
                    We conducted a multicentre, pre-registered study across four
                    research hospitals. The primary outcome and exclusion
                    criteria were specified before data collection.
                  </p>
                  <p className="relative">
                    <motion.span
                      animate={{ backgroundColor: mode === 0 ? "rgb(216 182 90 / 0.22)" : "rgb(216 182 90 / 0.09)" }}
                      className="box-decoration-clone rounded-[3px] px-1 py-0.5 text-text"
                    >
                      Sample size was established through an a priori power
                      analysis targeting 90% power at α = .05.
                    </motion.span>
                    <span className="absolute -right-4 -top-3 grid h-6 w-6 place-items-center rounded-full bg-accent font-mono text-[0.52rem] font-bold text-[#1a1612] sm:-right-8">E1</span>
                  </p>
                  <p>
                    Missing observations were handled using multiple imputation.
                    Attrition was reported by site, although two withdrawals
                    were not assigned a reason.
                  </p>
                </div>

                {mode === 0 && !reduce && (
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-accent/10 to-transparent"
                    initial={{ top: "-20%" }}
                    animate={{ top: "92%" }}
                    transition={{ duration: 2.3, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {["pre-registered", "power analysis", "multicentre", "attrition gap"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className={`rounded-full border px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] ${i === 3 ? "border-[rgb(var(--border)/0.12)] text-text-tertiary" : "border-[rgb(var(--accent-soft)/0.24)] bg-accent/8 text-accent-text"}`}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col p-5 sm:p-8">
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/7 blur-3xl" />
              <AnimatePresence mode="wait">
                {mode === 0 && (
                  <motion.div key="evidence" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="relative flex h-full flex-col">
                    <span className="figure-label">Evidence ledger</span>
                    <h3 className="mt-4 display-sm text-[clamp(1.45rem,3vw,2rem)] text-text">Four claims located.<br /><em className="text-accent-text">One limitation retained.</em></h3>
                    <div className="mt-8 space-y-2.5">
                      {["Study design", "Sample justification", "Outcome specification", "Missing-data handling"].map((item, i) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl border border-[rgb(var(--border)/0.08)] bg-bg/35 px-4 py-3">
                          <span className="grid h-6 w-6 place-items-center rounded-md bg-accent/12 font-mono text-[0.56rem] text-accent-text">E{i + 1}</span>
                          <span className="text-[0.84rem] text-text-secondary">{item}</span>
                          <motion.span className="ml-auto h-1.5 rounded-full bg-accent" initial={{ width: 0 }} animate={{ width: `${78 - i * 8}px` }} transition={{ delay: 0.2 + i * 0.1, duration: 0.7 }} />
                        </div>
                      ))}
                    </div>
                    <p className="marginalia mt-auto text-[0.84rem]">The evidence is organized so the researcher can inspect, question, and interpret the assessment.</p>
                  </motion.div>
                )}

                {mode === 1 && (
                  <motion.div key="rubric" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="relative flex h-full flex-col">
                    <span className="figure-label">Observable criteria / Methodological rigor</span>
                    <div className="mt-7 space-y-3">
                      {RUBRIC.map(([item, pass], i) => (
                        <motion.div key={item} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 rounded-xl border border-[rgb(var(--border)/0.08)] bg-bg/35 p-4">
                          <span className={`grid h-7 w-7 place-items-center rounded-lg font-mono text-[0.65rem] ${pass ? "bg-accent text-[#1a1612]" : "border border-[rgb(var(--border)/0.14)] text-text-tertiary"}`}>{pass ? "✓" : "·"}</span>
                          <span className="text-[0.86rem] text-text-secondary">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-auto pt-8">
                      <div className="flex items-end justify-between">
                        <div><span className="figure-label">Band selected</span><div className="mt-1 display-sm text-[1.45rem] text-text">Strong</div></div>
                        <div className="numeral text-[3.3rem] leading-none text-text">8.6</div>
                      </div>
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[rgb(var(--border)/0.08)]"><motion.div className="h-full rounded-full bg-accent" initial={{ width: 0 }} animate={{ width: "86%" }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} /></div>
                    </div>
                  </motion.div>
                )}

                {mode === 2 && (
                  <motion.div key="resolve" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative flex h-full flex-col items-center justify-center text-center">
                    <span className="figure-label">Integrated assessment</span>
                    <div className="relative mt-8 grid h-52 w-52 place-items-center rounded-full border border-[rgb(var(--accent-soft)/0.32)]">
                      <div className="absolute inset-3 rounded-full border border-dashed border-[rgb(var(--border)/0.15)]" />
                      <div><div className="numeral text-[4.6rem] leading-none text-text">8.1</div><div className="mt-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-accent-text">Strong</div></div>
                    </div>
                    <div className="mt-8 grid w-full grid-cols-3 gap-2">
                      {[["EVIDENCE", "4 / 4"], ["CONFIDENCE", "High"], ["VERSION", "4.0.0"]].map(([k, v]) => (
                        <div key={k} className="rounded-xl border border-[rgb(var(--border)/0.08)] bg-bg/35 p-3"><div className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-text-tertiary">{k}</div><div className="numeral mt-1.5 text-[0.82rem] text-text">{v}</div></div>
                      ))}
                    </div>
                    <p className="mt-6 max-w-sm text-[0.82rem] leading-relaxed text-text-tertiary">Strong methodological foundations with a minor reporting gap. The limitation remains visible for the researcher&rsquo;s interpretation.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid border-t border-[rgb(var(--border)/0.08)] sm:grid-cols-3">
            {MODES.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setMode(i)}
                className={`relative cursor-pointer border-b border-[rgb(var(--border)/0.08)] px-5 py-4 text-left transition-colors sm:border-b-0 sm:border-r sm:last:border-r-0 ${mode === i ? "bg-accent/8 text-text" : "text-text-tertiary hover:bg-[rgb(var(--surface-highlight)/0.025)] hover:text-text-secondary"}`}
              >
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em]">0{i + 1} / {item.label}</span>
                {mode === i && !reduce && <motion.span layoutId="assessment-progress" className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 4.2, ease: "linear" }} style={{ transformOrigin: "left" }} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
