"use client";

import { motion, useReducedMotion } from "framer-motion";

const EDGES = [
  [30, 38, 30, 74],
  [30, 38, 52, 56],
  [30, 38, 70, 26],
  [52, 56, 70, 26],
  [52, 56, 30, 74],
  [52, 56, 76, 74],
];

const NODES = [
  [70, 26],
  [30, 38],
  [52, 56],
  [30, 74],
  [76, 74],
];

export default function BrandConstellation({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`relative aspect-square w-full ${compact ? "max-w-[300px]" : "max-w-[560px]"}`}
      aria-hidden="true"
    >
      <div className="absolute inset-[8%] rounded-full border border-[rgb(var(--accent-soft)/0.16)]" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-[rgb(var(--border)/0.12)]" />
      <div className="absolute inset-[29%] rounded-full border border-[rgb(var(--accent-soft)/0.1)]" />

      <div className="absolute inset-[7%] rounded-full bg-accent/[0.07] blur-[80px]" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <filter id="constellation-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx="52"
          cy="53"
          r="37"
          fill="none"
          stroke="rgb(var(--border) / 0.09)"
          strokeWidth="0.25"
          strokeDasharray="1.2 3"
        />

        {EDGES.map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--accent)"
            strokeWidth="1.15"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.72 }}
            transition={{ duration: 0.75, delay: 0.48 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {NODES.map(([cx, cy], i) => (
          <g key={i} filter="url(#constellation-glow)">
            <motion.circle
              cx={cx}
              cy={cy}
              r="3.35"
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth="0.8"
              initial={{ scale: reduce ? 1 : 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
            <circle
              cx={cx}
              cy={cy}
              r="1.35"
              fill="var(--accent)"
            />
          </g>
        ))}
      </svg>

      {[
        ["left-[2%] top-[21%]", "METHOD", "8.6 / STRONG", 1.75],
        ["right-[-2%] top-[36%]", "SOURCE", "9.2 / EXEMPLARY", 1.92],
        ["left-[8%] bottom-[23%]", "CONFIDENCE", "HIGH", 2.08],
      ].map(([position, label, value, delay]) => (
        <motion.div
          key={String(label)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: Number(delay) }}
          className={`absolute ${position} hidden rounded-lg border border-[rgb(var(--border)/0.1)] bg-bg/70 px-3 py-2 backdrop-blur-xl xl:block`}
        >
          <div className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-text-tertiary">{label}</div>
          <div className="numeral mt-1 text-[0.62rem] text-accent-text">{value}</div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className={`absolute left-1/2 flex -translate-x-1/2 items-center whitespace-nowrap rounded-full border border-[rgb(var(--border)/0.1)] bg-bg/80 backdrop-blur-xl ${
          compact
            ? "bottom-[5%] gap-2 px-3 py-1.5"
            : "bottom-[9%] gap-3 px-4 py-2"
        }`}
      >
        <span className={`${compact ? "h-1.5 w-1.5" : "h-2 w-2"} rounded-full bg-accent`} />
        <span className={`font-mono uppercase text-text-secondary ${compact ? "text-[0.5rem] tracking-[0.13em]" : "text-[0.6rem] tracking-[0.18em]"}`}>
          {compact
            ? "CRAF 4.0 · researcher-led"
            : "evidence organized · interpretation researcher-led"}
        </span>
      </motion.div>
    </div>
  );
}
