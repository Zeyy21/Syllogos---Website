"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = { q: string; a: string };

export default function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
              isOpen
                ? "acrylic border-[rgb(var(--border)/0.14)]"
                : "acrylic"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="display-sm text-[1.05rem] text-text">
                {item.q}
              </span>
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border border-[rgb(var(--border)/0.12)] text-text-tertiary transition-transform duration-300 ${
                  isOpen ? "rotate-45 text-accent-text" : ""
                }`}
              >
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-4.5 text-[0.875rem] leading-relaxed text-text-tertiary">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
