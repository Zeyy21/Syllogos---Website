import Link from "next/link";

/**
 * Syllogos node-graph mark: five connected nodes forming a constellation,
 * matching the desktop app's brand logo ("a gathering of thought").
 * Rendered in currentColor so it adapts to theme; no accent tint.
 */
export function LogoMark({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={`brand-mark ${className}`}
      aria-hidden="true"
    >
      <g className="brand-mark-lines" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <line x1="30" y1="38" x2="30" y2="74" />
        <line x1="30" y1="38" x2="52" y2="56" />
        <line x1="30" y1="38" x2="70" y2="26" />
        <line x1="52" y1="56" x2="70" y2="26" />
        <line x1="52" y1="56" x2="30" y2="74" />
        <line x1="52" y1="56" x2="76" y2="74" />
      </g>
      <g className="brand-mark-nodes" fill="currentColor">
        <circle cx="70" cy="26" r="10.5" />
        <circle cx="30" cy="38" r="10.5" />
        <circle cx="52" cy="56" r="10.5" />
        <circle cx="30" cy="74" r="10.5" />
        <circle cx="76" cy="74" r="10.5" />
      </g>
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex min-w-0 items-center gap-2 sm:gap-2.5 ${className}`}
      aria-label="Syllogos home"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px] border border-[rgb(var(--border)/0.09)] bg-surface/70 text-text shadow-[var(--shadow-sm)] transition-colors duration-200 group-hover:text-accent-text sm:h-8 sm:w-8 sm:rounded-[10px] sm:bg-transparent sm:shadow-none">
        <LogoMark size={18} />
      </span>
      <span className="truncate font-mono text-[0.82rem] font-semibold tracking-[0.16em] text-text sm:text-[0.92rem] sm:font-medium sm:tracking-[0.2em]">
        SYLLOGOS
      </span>
    </Link>
  );
}
