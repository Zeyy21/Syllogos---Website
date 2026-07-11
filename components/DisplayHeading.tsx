"use client";

import { createElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, ElementType } from "react";

type Props = {
  children: ReactNode;
  /** semantic + visual level: h1 (hero) or h2 (section) */
  as?: ElementType;
  size?: "hero" | "section" | "sub";
  className?: string;
  delay?: number;
  /** disable the per-line entrance (use for already-animated contexts) */
  static?: boolean;
};

const SIZES: Record<NonNullable<Props["size"]>, string> = {
  hero: "display text-[clamp(2.7rem,6.2vw,5rem)]",
  section: "display text-[clamp(2rem,4.4vw,3.25rem)]",
  sub: "display-sm text-[clamp(1.4rem,2.8vw,2.05rem)]",
};

/**
 * The editorial display heading uses Fraunces serif at optical size.
 *
 * Reveals with a soft mask-rise so the serif "settles" onto the page
 * rather than popping in. Accent words can be wrapped in <em> by the
 * caller and inherit the italic gold treatment from the .display rule.
 *
 * The tag is dynamic (h1/h2/…), so we build it with createElement to
 * keep clean JSX children typing across the polymorphic `as` prop.
 */
export default function DisplayHeading({
  children,
  as = "h2",
  size = "section",
  className = "",
  delay = 0,
  static: isStatic = false,
}: Props) {
  const reduce = useReducedMotion();
  const cls = `${SIZES[size]} text-text ${className}`;

  const inner = isStatic ? (
    children
  ) : (
    <motion.span
      className="inline-block"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.4em" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );

  return createElement(as, { className: cls }, inner);
}
