import Link from "next/link";
import Reveal from "../Reveal";
import { IconCheck } from "../Icons";

type Tier = {
  name: string;
  price: string;
  period?: string;
  tagline: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
  note?: string;
};

export default function PricingCard({
  tier,
  delay = 0,
}: {
  tier: Tier;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={`relative flex h-full flex-col rounded-[1.25rem] p-6 ${
          tier.featured
            ? "acrylic-elevated glow-accent"
            : "acrylic card-hover"
        }`}
      >
        {tier.featured && (
          <>
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[1.25rem]"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgb(216 182 90 / 0.6), transparent)",
              }}
            />
            <span className="mb-4 inline-flex w-fit items-center rounded-md bg-accent/12 px-2.5 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-accent-text">
              Recommended
            </span>
          </>
        )}

        <h3 className="display-sm text-[1.3rem] text-text">{tier.name}</h3>
        <p className="mt-1.5 text-[0.85rem] text-text-tertiary">
          {tier.tagline}
        </p>

        <div className="mt-5 flex items-end gap-1.5">
          <span className="numeral text-[2.4rem] font-medium leading-none text-text">
            {tier.price}
          </span>
          {tier.period && (
            <span className="numeral pb-1 text-[0.85rem] text-text-tertiary">
              {tier.period}
            </span>
          )}
        </div>

        <Link
          href={tier.ctaHref}
          className={`mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-xl px-4 py-2.5 text-[0.875rem] ${
            tier.featured ? "btn-primary" : "btn-secondary"
          }`}
        >
          {tier.cta}
        </Link>
        {tier.note && (
          <p className="mt-2.5 text-center text-[0.75rem] text-text-tertiary">
            {tier.note}
          </p>
        )}

        <div className="my-6 hairline" />

        <ul className="flex flex-col gap-3">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md bg-accent/12 text-accent-text">
                <IconCheck width={11} height={11} strokeWidth={2.6} />
              </span>
              <span className="text-[0.875rem] leading-relaxed text-text-secondary">
                {f}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}
