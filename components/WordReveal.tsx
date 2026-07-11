"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  /** indices of words to render in the accent color */
  accentWords?: number[];
  className?: string;
  delay?: number;
};

/**
 * Heading that reveals word-by-word with a hand-crafted entrance that
 * avoids the flat "whole block fades in" look.
 */
export default function WordReveal({
  text,
  accentWords = [],
  className = "",
  delay = 0,
}: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${
              accentWords.includes(i) ? "text-accent" : ""
            }`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.5em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
