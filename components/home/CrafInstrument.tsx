"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
} from "framer-motion";
import Reveal from "../Reveal";
import DisplayHeading from "../DisplayHeading";

/* ============================================================
   The CRAF Instrument is the signature showpiece.

   The Comprehensive Research Assessment Framework scores a paper on
   ten dimensions, 0–10, across five bands. This component renders that
   engine as a precision instrument: ten spokes on a calibrated dial,
   needles that sweep to their measured value on scroll, a composite
   score that counts up in the centre, and an inspector that reveals
   each dimension's band + an observable criterion on hover/focus.

   It is the moment that says "this is a research instrument, not a
   chatbot." Data below mirrors the real CRAF 4.0 dimension set.
   ============================================================ */

type Band = "Exemplary" | "Strong" | "Adequate" | "Weak" | "Poor";

type Dimension = {
  key: string;
  label: string;
  short: string;
  value: number; // 0–10, the measured score for the sample paper
  criterion: string; // a representative observable checklist item
};

/* A real, plausible assessment of a strong empirical paper. Values are
   chosen to look measured (not all-maxed) and to span several bands. */
const DIMENSIONS: Dimension[] = [
  {
    key: "methodological_rigor",
    label: "Methodological rigor",
    short: "Rigor",
    value: 8.6,
    criterion: "Pre-registered design with a power analysis",
  },
  {
    key: "scientific_validity",
    label: "Scientific validity",
    short: "Validity",
    value: 7.9,
    criterion: "Conclusions are supported by the reported effects",
  },
  {
    key: "originality_contribution",
    label: "Originality & contribution",
    short: "Originality",
    value: 7.2,
    criterion: "States a contribution absent from prior work",
  },
  {
    key: "theoretical_consistency",
    label: "Theoretical consistency",
    short: "Theory",
    value: 8.1,
    criterion: "Hypotheses follow from the stated framework",
  },
  {
    key: "literature_mastery",
    label: "Literature mastery",
    short: "Literature",
    value: 8.8,
    criterion: "Engages the seminal and the current work",
  },
  {
    key: "source_credibility",
    label: "Source credibility",
    short: "Sources",
    value: 9.2,
    criterion: "Cites primary, peer-reviewed sources",
  },
  {
    key: "writing_quality",
    label: "Writing quality",
    short: "Writing",
    value: 7.6,
    criterion: "Structure and prose are unambiguous",
  },
  {
    key: "peer_evaluation_status",
    label: "Peer evaluation status",
    short: "Peer review",
    value: 8.4,
    criterion: "Published in a peer-reviewed venue",
  },
  {
    key: "objectivity_reflexivity",
    label: "Objectivity & reflexivity",
    short: "Objectivity",
    value: 7.1,
    criterion: "Declares funding and competing interests",
  },
  {
    key: "implicit_legitimacy",
    label: "Implicit legitimacy",
    short: "Legitimacy",
    value: 8.0,
    criterion: "No unsupported appeals to authority",
  },
];

/* Five bands on the 0–10 scale, mirroring CRAF's calibration. */
function bandFor(v: number): Band {
  if (v >= 9.0) return "Exemplary";
  if (v >= 7.5) return "Strong";
  if (v >= 6.0) return "Adequate";
  if (v >= 4.0) return "Weak";
  return "Poor";
}

const COMPOSITE =
  Math.round(
    (DIMENSIONS.reduce((s, d) => s + d.value, 0) / DIMENSIONS.length) * 10,
  ) / 10;

/* ---- geometry ---- */
const SIZE = 440;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUTER = 196; // tick ring
const R_MAX = 168; // full-value spoke length
const R_MIN = 58; // hub radius (zero point)
const N = DIMENSIONS.length;

/* Round every computed coordinate to a fixed precision so the SVG
   serializes identically on the server and the client. Raw trig output
   (Math.cos/sin) differs in its last float digit between renders, which
   triggers a React hydration mismatch on every <line>. Two decimals is
   visually exact and byte-stable. */
const r2 = (n: number): number => Math.round(n * 100) / 100;

/* Spoke i points outward; we start at -90° (top) and go clockwise. */
function angleFor(i: number): number {
  return (-90 + (360 / N) * i) * (Math.PI / 180);
}
function pointAt(i: number, radius: number): [number, number] {
  const a = angleFor(i);
  return [r2(CX + Math.cos(a) * radius), r2(CY + Math.sin(a) * radius)];
}
function radiusForValue(v: number): number {
  return R_MIN + (R_MAX - R_MIN) * (v / 10);
}

export default function CrafInstrument() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const uid = useId().replace(/:/g, "");

  // progress 0→1 drives every needle sweep + ring fill together
  const [progress, setProgress] = useState(reduce ? 1 : 0);
  const [composite, setComposite] = useState(reduce ? COMPOSITE : 0);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c1 = animate(0, 1, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setProgress,
    });
    const c2 = animate(0, COMPOSITE, {
      duration: 1.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setComposite(Math.round(v * 10) / 10),
    });
    return () => {
      c1.stop();
      c2.stop();
    };
  }, [inView, reduce]);

  const shown = active;
  const activeDim = DIMENSIONS[shown];

  // polygon of current animated measured values, the "reading"
  const polyPoints = DIMENSIONS.map((d, i) => {
    const r = radiusForValue(d.value * progress);
    const [x, y] = pointAt(i, r);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <section className="section-pad ruler-rule border-t border-[rgb(var(--border)/0.07)]">
      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="readout">
              <span className="readout-index">CRAF</span>
              <span className="text-text-tertiary/50">/</span>
              the assessment framework
            </span>
          </Reveal>
          <DisplayHeading as="h2" size="section" delay={0.05} className="mt-5 max-w-3xl">
            Ten dimensions. <em>Five bands. 0–10.</em>
          </DisplayHeading>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-balance text-[0.975rem] leading-relaxed text-text-secondary">
              CRAF 4.0 does not reduce a study to an isolated score. It connects
              methodology, validity, contribution, theory, literature, sources,
              writing, peer status, bias, and legitimacy in one multidimensional
              assessment.
            </p>
          </Reveal>
        </div>

        <div
          ref={ref}
          className="mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
        >
          {/* ---- The dial ---- */}
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-[460px]">
              <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="h-full w-full overflow-visible"
                role="img"
                aria-label={`CRAF research assessment instrument. Composite score ${COMPOSITE} out of 10, band ${bandFor(
                  COMPOSITE,
                )}.`}
              >
                <defs>
                  <radialGradient id={`hub-${uid}`} cx="50%" cy="50%" r="50%">
                    <stop
                      offset="0%"
                      stopColor="var(--accent)"
                      stopOpacity="0.22"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--accent)"
                      stopOpacity="0"
                    />
                  </radialGradient>
                </defs>

                {/* concentric calibration rings at 2,4,6,8,10 */}
                {[2, 4, 6, 8, 10].map((g) => {
                  const r = r2(radiusForValue(g));
                  return (
                    <circle
                      key={g}
                      cx={CX}
                      cy={CY}
                      r={r}
                      fill="none"
                      stroke="rgb(var(--border) / 0.1)"
                      strokeWidth={1}
                      strokeDasharray={g === 10 ? "0" : "2 5"}
                    />
                  );
                })}

                {/* outer tick ring with fine graduations */}
                {Array.from({ length: 60 }).map((_, t) => {
                  const a = (-90 + (360 / 60) * t) * (Math.PI / 180);
                  const major = t % 6 === 0;
                  const rInner = R_OUTER - (major ? 9 : 4);
                  const rOuter = R_OUTER;
                  return (
                    <line
                      key={t}
                      x1={r2(CX + Math.cos(a) * rInner)}
                      y1={r2(CY + Math.sin(a) * rInner)}
                      x2={r2(CX + Math.cos(a) * rOuter)}
                      y2={r2(CY + Math.sin(a) * rOuter)}
                      stroke="rgb(var(--border) / 0.18)"
                      strokeWidth={major ? 1.4 : 0.8}
                    />
                  );
                })}

                {/* spokes (axes) to each dimension */}
                {DIMENSIONS.map((d, i) => {
                  const [x, y] = pointAt(i, R_MAX);
                  const [xh, yh] = pointAt(i, R_MIN);
                  const isActive = shown === i;
                  return (
                    <line
                      key={d.key}
                      x1={xh}
                      y1={yh}
                      x2={x}
                      y2={y}
                      stroke={
                        isActive
                          ? "rgb(var(--accent-soft) / 0.5)"
                          : "rgb(var(--border) / 0.12)"
                      }
                      strokeWidth={isActive ? 1.4 : 1}
                    />
                  );
                })}

                {/* the measured polygon, called the "reading" */}
                <polygon
                  points={polyPoints}
                  fill="rgb(var(--accent-soft) / 0.1)"
                  stroke="var(--accent)"
                  strokeOpacity={0.55}
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                />

                {/* hub glow + zero ring */}
                <circle cx={CX} cy={CY} r={R_MIN + 30} fill={`url(#hub-${uid})`} />
                <circle
                  cx={CX}
                  cy={CY}
                  r={R_MIN}
                  fill="var(--bg-deep)"
                  stroke="rgb(var(--accent-soft) / 0.35)"
                  strokeWidth={1}
                />

                {/* value nodes at each measured point */}
                {DIMENSIONS.map((d, i) => {
                  const r = radiusForValue(d.value * progress);
                  const [x, y] = pointAt(i, r);
                  const isActive = shown === i;
                  return (
                    <g key={d.key}>
                      {isActive && (
                        <circle
                          cx={x}
                          cy={y}
                          r={9}
                          fill="rgb(var(--accent-soft) / 0.18)"
                        />
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isActive ? 4.5 : 3}
                        fill="var(--accent)"
                        stroke="var(--bg-deep)"
                        strokeWidth={1.5}
                      />
                    </g>
                  );
                })}

                {/* invisible hit-areas along each spoke for hover/focus */}
                {DIMENSIONS.map((d, i) => {
                  const [x, y] = pointAt(i, R_MAX + 14);
                  return (
                    <circle
                      key={`hit-${d.key}`}
                      cx={x}
                      cy={y}
                      r={26}
                      fill="transparent"
                      style={{ cursor: "pointer" }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${d.label}: ${d.value.toFixed(
                        1,
                      )} out of 10, ${bandFor(d.value)}`}
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => undefined}
                      onFocus={() => setActive(i)}
                      onBlur={() => undefined}
                    />
                  );
                })}
              </svg>

              {/* centre readout with composite score, overlaid in HTML for
                  crisp mono type */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="figure-label text-[0.6rem] text-text-tertiary">
                  Composite
                </span>
                <span className="numeral mt-0.5 text-[2.9rem] font-medium leading-none text-text">
                  {composite.toFixed(1)}
                </span>
                <span className="numeral text-[0.7rem] text-text-tertiary">
                  / 10.0
                </span>
                <span className="mt-1.5 rounded-full border border-[rgb(var(--accent-soft)/0.4)] bg-[rgb(var(--accent-soft)/0.12)] px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-accent-text">
                  {bandFor(COMPOSITE)}
                </span>
              </div>
            </div>
          </Reveal>

          {/* ---- The inspector + legend ---- */}
          <Reveal delay={0.1}>
            <div className="flex flex-col">
              {/* live inspector updates on spoke hover/focus */}
              <div className="relative min-h-[228px] overflow-hidden rounded-[1.25rem] border border-[rgb(var(--accent-soft)/0.18)] acrylic-card p-7">
                <div className="flex items-center justify-between">
                  <span className="figure-label">
                    Dimension reading
                  </span>
                  <span className="numeral text-[0.72rem] text-text-tertiary">
                    {`${String(shown + 1).padStart(2, "0")} / ${N}`}
                  </span>
                </div>

                {activeDim && (
                  <motion.div
                    key={activeDim.key}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mt-5 flex items-start justify-between gap-5">
                      <h3 className="display-sm max-w-[16rem] text-[1.45rem] text-text">
                        {activeDim.label}
                      </h3>
                      <span className="numeral shrink-0 text-[2.35rem] font-medium leading-none text-accent-text">
                        {activeDim.value.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
                        {bandFor(activeDim.value)}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-text-tertiary/40" />
                      <span className="font-mono text-[0.68rem] text-text-tertiary">
                        observed criterion
                      </span>
                    </div>
                    <div className="mt-5 rounded-xl border border-[rgb(var(--border)/0.08)] bg-bg/35 p-4">
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.13em] text-text-tertiary">Evidence observed</span>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-text-secondary">
                      {activeDim.criterion}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* dimension legend, a measured list with mono values */}
              <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-0.5">
                {DIMENSIONS.map((d, i) => {
                  const isActive = shown === i;
                  return (
                    <li key={d.key}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onMouseLeave={() => undefined}
                        onFocus={() => setActive(i)}
                        onBlur={() => undefined}
                        className="group flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[rgb(var(--surface-highlight)/0.035)]"
                      >
                        <span
                          className={`numeral text-[0.66rem] tabular-nums transition-colors ${
                            isActive ? "text-accent-text" : "text-text-tertiary/70"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`flex-1 truncate text-[0.8rem] transition-colors ${
                            isActive
                              ? "text-text"
                              : "text-text-secondary group-hover:text-text"
                          }`}
                        >
                          {d.short}
                        </span>
                        <span
                          className={`numeral text-[0.75rem] tabular-nums transition-colors ${
                            isActive ? "text-accent-text" : "text-text-tertiary"
                          }`}
                        >
                          {d.value.toFixed(1)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
