"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { IconMenu, IconClose } from "./Icons";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Download", href: "/download" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-2.5 pt-2.5 sm:px-4 sm:pt-4">
      <nav
        className={`flex w-full max-w-[1180px] items-center justify-between rounded-2xl px-2.5 py-2 transition-[background-color,border-color,box-shadow] duration-300 sm:px-4 sm:py-2.5 ${
          scrolled
            ? "acrylic-blur shadow-[var(--shadow-md)]"
            : "border border-transparent"
        }`}
      >
        <Logo />

        <div className="hidden items-center md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3 py-1.5 text-[0.875rem] transition-colors duration-200 ${
                  active
                    ? "text-text"
                    : "text-text-tertiary hover:text-text"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2.5 -bottom-px h-0.5 rounded-full bg-accent"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/download"
            className="hidden cursor-pointer rounded-lg btn-primary px-3.5 py-1.5 text-[0.875rem] sm:inline-flex"
          >
            Start free
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl acrylic text-text-tertiary transition-colors hover:text-text sm:h-9 sm:w-9 sm:rounded-lg md:hidden"
          >
            {open ? (
              <IconClose width={17} height={17} />
            ) : (
              <IconMenu width={17} height={17} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-2.5 top-[4.75rem] rounded-2xl acrylic-elevated p-2.5 sm:inset-x-3 sm:top-[4.25rem] md:hidden"
          >
            <div className="flex flex-col gap-0.5">
              {NAV.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-xl px-3.5 py-3 text-[0.9rem] transition-colors duration-200 ${
                      active
                        ? "bg-accent/10 text-accent-text"
                        : "text-text-tertiary hover:bg-text/[0.04] hover:text-text"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/download"
                className="mt-1.5 cursor-pointer rounded-xl btn-primary px-3.5 py-2.5 text-center text-[0.9rem]"
              >
                Start free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
