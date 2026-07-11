"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

/**
 * Button that subtly leans toward the cursor, a small craft detail
 * that reads as deliberate, not templated. Disabled for reduced-motion.
 */
export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.24);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.24);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    variant === "primary"
      ? "btn-primary"
      : "btn-secondary";

  return (
    <motion.span style={{ x: sx, y: sy }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-[0.9rem] ${base} ${className}`}
      >
        {children}
      </Link>
    </motion.span>
  );
}
