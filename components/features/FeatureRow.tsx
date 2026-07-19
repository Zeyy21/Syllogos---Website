import type { ReactNode } from "react";
import Reveal from "../Reveal";
import { IconCheck } from "../Icons";

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
  flip?: boolean;
  visualLabel?: string;
  visual?: ReactNode;
};

/**
 * FeatureWindow stages each feature inside a mini Syllogos window.
 *
 * The outer frame uses the app's own acrylic-shell surface treatment
 * (translucent, blurred, with window chrome). The left column reads as
 * the sidebar position (text content with a vertical rail); the right
 * column is the main pane (the screenshot or visual). When `flip` is
 * true, the columns swap, mirroring the app's own flexible layout.
 *
 * This is the single biggest move away from "generic SaaS landing page"
 * toward "the website IS a Syllogos surface."
 */
export default function FeatureRow({
  eyebrow,
  title,
  body,
  points,
  flip = false,
  visualLabel,
  visual,
}: Props) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-[1.5rem] acrylic-shell-surface">
        {/* Window chrome with traffic lights + section label */}
        <div className="flex items-center gap-1.5 border-b border-[rgb(var(--border)/0.07)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--surface-highlight)/0.14)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--surface-highlight)/0.14)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent-soft)/0.5)]" />
          <span className="ml-2 font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-text-tertiary">
            {eyebrow}
          </span>
        </div>

        {/* Two-column body: sidebar rail + main pane */}
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          {/* Sidebar position for text content */}
          <div
            className={`relative acrylic-sidebar-surface p-7 lg:p-9 ${
              flip ? "lg:order-2" : ""
            }`}
          >
            <span className="eyebrow">{eyebrow}</span>
            <h3 className="mt-4 display-sm text-[clamp(1.5rem,2.8vw,2.1rem)] text-text">
              {title}
            </h3>
            <p className="mt-3.5 text-[0.925rem] leading-relaxed text-text-tertiary">
              {body}
            </p>
            {points && (
              <ul className="mt-6 flex flex-col gap-2.5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md bg-[rgb(var(--accent-soft)/0.14)] text-accent-text">
                      <IconCheck width={11} height={11} strokeWidth={2.6} />
                    </span>
                    <span className="text-[0.875rem] leading-relaxed text-text-secondary">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Main pane for the visual */}
          <div
            className={`relative p-5 lg:p-7 ${flip ? "lg:order-1" : ""}`}
          >
            {visual ?? (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1rem] acrylic-card">
                <div className="absolute inset-2.5 rounded-[0.85rem] border border-dashed border-[rgb(var(--border)/0.16)]" />
                <div className="relative flex h-full w-full items-center justify-center p-6">
                  <span className="text-center text-[0.72rem] font-medium uppercase tracking-[0.14em] text-text-tertiary">
                    {visualLabel ?? "Feature visual"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
