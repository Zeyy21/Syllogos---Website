"use client";

import { useEffect, useState } from "react";
import { IconSun, IconMoon } from "./Icons";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem("syllogos-theme") as
      | "dark"
      | "light"
      | null) ?? "dark";
    setTheme(stored);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("syllogos-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg acrylic text-text-tertiary transition-colors duration-200 hover:text-text"
    >
      {mounted && theme === "dark" ? (
        <IconMoon width={16} height={16} />
      ) : (
        <IconSun width={16} height={16} />
      )}
    </button>
  );
}
