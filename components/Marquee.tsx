"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Seamless infinite marquee that pauses on hover. Used for the platform
 * strip so it feels alive rather than a static logo grid.
 */
export default function Marquee({
  children,
  speed = 32,
}: {
  children: ReactNode;
  speed?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {children}
      </div>
    );
  }

  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {[0, 1].map((dup) => (
        <motion.div
          key={dup}
          className="flex shrink-0 items-center gap-10 pr-10"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
}
