import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import FeatureRow from "@/components/features/FeatureRow";
import ActionsGrid from "@/components/features/ActionsGrid";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import AppShot from "@/components/AppShot";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Evidence-anchored credibility assessment, discipline-aware CRAF scoring, automatic source detection, and eight reviewer-grade research actions.",
};

const overlay = (screen: string, alt: string, priority = false) => (
  <AppShot
    screen={screen}
    variant="overlay"
    alt={alt}
    priority={priority}
    className="mx-auto max-w-[400px]"
  />
);

const fullscreen = (screen: string, alt: string) => (
  <AppShot screen={screen} variant="fullscreen" alt={alt} />
);

const FEATURES = [
  {
    eyebrow: "Detection",
    title: "The source finds Syllogos",
    body: "A quiet background watcher recognizes academic work across your desktop and offers to load it at the moment you begin reading. You stay in control: fetch, snooze, or dismiss without leaving the page.",
    points: [
      "18+ academic platforms recognized out of the box",
      "OCR and window-title detection across applications",
      "Deliberate fetch, snooze, and dismiss controls",
    ],
    visual: overlay(
      "idle",
      "Syllogos overlay detecting a captured research paper",
      true,
    ),
  },
  {
    eyebrow: "Retrieval",
    title: "Judge the paper, not the screenshot",
    body: "Syllogos resolves the strongest available source through CrossRef, Unpaywall, and OpenAlex, then falls back to structured extraction when needed. Newly downloaded PDFs can enter the same pipeline automatically.",
    points: [
      "CrossRef, Unpaywall, and OpenAlex retrieval",
      "Structured OCR fallback for difficult sources",
      "Automatic PDF import from your Downloads folder",
    ],
    visual: fullscreen(
      "idle",
      "Syllogos new-analysis view with DOI lookup and file upload",
    ),
  },
  {
    eyebrow: "CRAF 4.0",
    title: "Ten dimensions. Every score accountable.",
    body: "CRAF 4.0 judges methodological rigor, validity, originality, theory, literature, sources, writing, peer evaluation, objectivity, and implicit legitimacy. Observable criteria select the band; quoted evidence justifies the score; disqualifiers prevent polished weakness from passing as rigor.",
    points: [
      "Ten calibrated credibility dimensions",
      "Mandatory quoted evidence for every score",
      "Discipline-adaptive composite weighting",
      "Indeterminate when evidence is insufficient",
    ],
    visual: fullscreen(
      "actionmenu",
      "Syllogos CRAF 4.0 action menu over a captured paper",
    ),
  },
  {
    eyebrow: "Labs · Beta",
    title: "Question the paper from more than one angle",
    body: "Labs is a grounded conversation with the loaded source, shaped through multiple reviewer perspectives. Clarify an argument, stress-test a claim, or ask what a skeptical methodologist would notice.",
    points: [
      "Answers grounded in the loaded source",
      "Multiple reviewer perspectives",
      "Currently in open beta",
    ],
    visual: fullscreen(
      "labs",
      "Syllogos Labs, a conversational Q&A panel over a loaded research paper",
    ),
  },
  {
    eyebrow: "Dashboard",
    title: "Your reading becomes a research graph",
    body: "Every assessment contributes to a private picture of the fields, credibility bands, confidence levels, and ideas shaping your work. Over time, the library becomes context, not just storage.",
    points: [
      "Field distribution and credibility patterns",
      "Confidence breakdown and keyword trends",
      "Filter by time period and discipline",
    ],
    visual: fullscreen(
      "insights",
      "Syllogos Insights dashboard with research profile and trends",
    ),
  },
  {
    eyebrow: "Power users",
    title: "Keyboard Shortcuts",
    body: "A full shortcut system for power users. Global shortcuts toggle auto-detection, show or hide the Syllogos window, and capture a manual screenshot. In-app shortcuts handle bookmarking, dismissing, and rerunning. Number keys trigger analysis actions directly.",
    points: [
      "Global shortcuts for detection, visibility, capture",
      "In-app shortcuts for bookmark, dismiss, rerun",
      "Number keys for direct action triggers",
    ],
    visual: fullscreen(
      "settings",
      "Syllogos settings showing the keyboard shortcuts panel",
    ),
  },
  {
    eyebrow: "Library",
    title: "Keep the judgment with the source",
    body: "Bookmark any result with its action, confidence, date, and credibility profile intact. Export to Markdown, text, PDF, clipboard, or a branded public report when the analysis needs to travel.",
    points: [
      "One-click bookmarking on any result",
      "Color-coded cards by action type",
      "Markdown, PDF, clipboard, and share-link exports",
    ],
    visual: fullscreen(
      "bookmarks",
      "Syllogos Saved Research library with bookmarked analyses",
    ),
  },
];

export default function FeaturesPage() {
  return (
    <PageTransition>
      <section className="pb-2 pt-36">
        <div className="container-x">
          <SectionHeading
            eyebrow="Features"
            align="left"
            title={
              <>
                One source. <em>Eight ways to question it.</em>
              </>
            }
            subtitle="From the moment a paper appears on screen to the moment its credibility is understood, Syllogos keeps the evidence, the method, and the researcher in one continuous loop."
          />
        </div>
      </section>

      {/* Feature 1: Detection */}
      <section className="section-pad">
        <div className="container-x">
          <FeatureRow {...FEATURES[0]} />
        </div>
      </section>

      {/* Feature 2: Fetch */}
      <section className="pb-20">
        <div className="container-x">
          <FeatureRow {...FEATURES[1]} flip />
        </div>
      </section>

      {/* Eight Analysis Actions, dedicated section */}
      <section className="section-pad border-y border-[rgb(var(--border)/0.07)]">
        <div className="container-x">
          <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <span className="eyebrow">Analysis</span>
              <h3 className="mt-4 display-sm text-[clamp(1.5rem,2.8vw,2.1rem)] text-text">
                A fast read when you need speed. A deep read when it matters.
              </h3>
              <p className="mt-3.5 text-[0.925rem] leading-relaxed text-text-tertiary">
                Summarize and Key Points orient you quickly. Six deep actions
                interrogate methods, novelty, coherence, sources, bias, and the
                complete ten-dimension CRAF profile. Each returns a structured,
                evidence-linked result, not a wall of generated prose.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <ActionsGrid />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features 3–6 (CRAF, Labs, Dashboard, Shortcuts, Saved) */}
      {FEATURES.slice(2).map((feature, i) => (
        <section key={i} className={i % 3 === 0 ? "section-pad" : "pb-20"}>
          <div className="container-x">
            <FeatureRow {...feature} flip={i % 2 === 1} />
          </div>
        </section>
      ))}

      <section className="section-pad border-y border-[rgb(var(--border)/0.07)] bg-bg-deep">
        <div className="container-x">
          <SectionHeading
            eyebrow="Engineered for trust"
            title={<>Four rules the model <em>cannot negotiate</em></>}
            subtitle="These are product constraints, not marketing promises."
          />
          <div className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Evidence", "No quoted passage, no valid score."],
              ["02", "Determinism", "The same source and action return the same assessment."],
              ["03", "Discipline", "The rubric adapts to the kind of knowledge being evaluated."],
              ["04", "Uncertainty", "Missing evidence returns Indeterminate, never a fabricated midpoint."],
            ].map(([n, title, body], i) => (
              <Reveal key={n} delay={i * 0.06}>
                <article className="h-full rounded-[1.15rem] acrylic p-6">
                  <span className="numeral text-[0.68rem] text-accent-text">{n}</span>
                  <h3 className="mt-5 display-sm text-[1.15rem] text-text">{title}</h3>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-text-tertiary">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="See it in action"
        title="Bring a difficult source. Leave with a defensible reading."
        note="Free to start. No credit card required."
      />
    </PageTransition>
  );
}
