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
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label="Syllogos home"
    >
      <span className="grid h-8 w-8 place-items-center rounded-[10px] acrylic text-text transition-colors duration-200 group-hover:text-accent-text">
        <LogoMark size={17} />
      </span>
      <span className="font-mono text-[0.92rem] font-medium tracking-[0.2em] text-text">
        SYLLOGOS
      </span>
    </Link>
  );
}
