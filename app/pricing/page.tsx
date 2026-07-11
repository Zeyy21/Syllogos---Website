import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import PricingCard from "@/components/pricing/PricingCard";
import Accordion from "@/components/Accordion";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for students, researchers, power users, and research teams. Start free, then scale with your work.",
};

const TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "/ forever",
    tagline: "Learn what rigorous assessment feels like.",
    cta: "Start free",
    ctaHref: "/download",
    note: "No credit card required",
    features: [
      "5 deep analyses each month",
      "Unlimited summaries and key points",
      "All ten CRAF dimensions available",
      "Automatic source detection",
      "Limited Labs conversations",
    ],
  },
  {
    name: "Researcher",
    price: "$18",
    period: "/ month",
    tagline: "For active academics and graduate students.",
    cta: "Choose Researcher",
    ctaHref: "/download",
    featured: true,
    note: "$180/year, saving two months",
    features: [
      "25 deep analyses each month",
      "Books and long-form sources",
      "Referee reports and generous Labs",
      "Voice dialogue and read-aloud",
      "Saved research and full history",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    period: "/ month",
    tagline: "For systematic reviews and serious volume.",
    cta: "Choose Pro",
    ctaHref: "/download",
    note: "$499/year, built for power users",
    features: [
      "High soft cap on deep analyses",
      "Batch workflows for books and papers",
      "Unlimited referee reports",
      "Priority deep-model access",
      "Everything in Researcher",
    ],
  },
  {
    name: "Team / Lab",
    price: "$22",
    period: "/ seat / month",
    tagline: "One credibility standard for the whole group.",
    cta: "Talk to us",
    ctaHref: "/about",
    note: "From $22 per seat · pooled usage",
    features: [
      "Pooled deep-analysis allowance",
      "Shared research feed and reports",
      "Workspace administration",
      "Centralized billing",
      "Institutional pathway available",
    ],
  },
];

const FAQ = [
  {
    q: "What counts as a deep analysis?",
    a: "Methods & Validity, Novelty & Scholarship, Coherence & Clarity, Sources & Review, Bias & Legitimacy, and Full Assessment use the deep model tier. Summaries and key-point extraction are light actions and remain generous across every plan.",
  },
  {
    q: "What happens when I reach my allowance?",
    a: "Syllogos uses soft limits. You can add deep-analysis credits for $0.45 each or move to the next plan. Your history and access never disappear because you had an unusually research-heavy month.",
  },
  {
    q: "Is my research data private?",
    a: "Your individual history and bookmarks stay on your device. Shared team workspaces only contain analyses you deliberately publish to the group. Syllogos never sells your research data.",
  },
  {
    q: "What platforms does Syllogos support?",
    a: "Syllogos runs on Windows 10+ and macOS 12+. It detects academic content across 18+ platforms out of the box, including JSTOR, arXiv, PubMed, Springer, IEEE, and ScienceDirect. It also works system-wide with browsers and PDF readers.",
  },
  {
    q: "Why not offer unlimited deep analysis?",
    a: "Deep assessments have a real per-use inference cost. Soft allowances keep the entry price fair for ordinary researchers while preventing a small number of extreme workloads from raising prices for everyone.",
  },
];

export default function PricingPage() {
  return (
    <PageTransition>
      <section className="pb-2 pt-36">
        <div className="container-x">
          <SectionHeading
            eyebrow="Pricing"
            title={
              <>
                Priced for the way <em>research actually moves</em>
              </>
            }
            subtitle="Start at zero, pay for deeper volume when Syllogos has earned a place in your workflow, and scale from one researcher to a whole lab."
          />
        </div>
      </section>

      <section className="pb-6 pt-10">
        <div className="container-x">
          <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
            {TIERS.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} delay={i * 0.08} />
            ))}
          </div>
          <Reveal delay={0.16}>
            <p className="mt-6 text-center text-[0.75rem] text-text-tertiary">
              Deep-analysis overage is $0.45 per assessment. Allowances are
              soft, not punitive; light actions remain generous on every plan.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-y border-[rgb(var(--border)/0.07)] bg-bg-deep">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <SectionHeading
              eyebrow="Why measured pricing"
              align="left"
              title={<>Fair to the reader. <em>Honest about the compute.</em></>}
              subtitle="A full paper assessment costs cents to run, but usage varies dramatically between a student checking a few sources and a systematic reviewer processing hundreds. Soft limits preserve both access and sustainability."
            />
            <Reveal delay={0.08}>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  ["PAPER", "~$0.15", "typical full assessment"],
                  ["BOOK", "~$0.34", "300–500 pages"],
                  ["REFEREE", "~$0.10", "structured report"],
                ].map(([label, value, note]) => (
                  <div key={label} className="rounded-[1rem] acrylic p-4 sm:p-5">
                    <div className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-text-tertiary">{label}</div>
                    <div className="numeral mt-3 text-[clamp(1.25rem,3vw,2rem)] text-text">{value}</div>
                    <div className="mt-1 text-[0.72rem] leading-relaxed text-text-tertiary">{note}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-[rgb(var(--border)/0.07)]">
        <div className="container-x">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <div className="mx-auto mt-10 max-w-2xl">
            <Accordion items={FAQ} />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
