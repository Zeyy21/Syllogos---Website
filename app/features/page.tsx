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
    "Q1-style research evaluation through CRAF 4.0, eight assessment workflows, source comparison, and five dialogic paradigms.",
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
    title: "Bring research in without breaking your workflow",
    body: "Analyze what is already in front of you through screen capture, a file, pasted text, or a DOI. Syllogos fits the way researchers read instead of asking them to restructure the document or leave the page.",
    points: [
      "Screen, PDF, DOI, file, and pasted-text inputs",
      "Academic content recognized across applications",
      "Researcher-controlled fetch, capture, and dismissal",
    ],
    visual: overlay(
      "idle",
      "Syllogos overlay detecting a captured research paper",
      true,
    ),
  },
  {
    eyebrow: "Retrieval",
    title: "Assess the study in its strongest available form",
    body: "Syllogos resolves published metadata and available full text, then uses structured extraction when needed. The goal is not merely to read what is visible, but to assemble enough of the source for a responsible evaluation.",
    points: [
      "DOI and published-source retrieval",
      "Structured extraction for difficult documents",
      "Direct support for full papers and reports",
    ],
    visual: fullscreen(
      "idle",
      "Syllogos new-analysis view with DOI lookup and file upload",
    ),
  },
  {
    eyebrow: "CRAF 4.0",
    title: "Ten dimensions. Five bands. One integrated assessment.",
    body: "CRAF 4.0 evaluates methodological rigor, scientific validity, originality, theory, literature, sources, writing, peer status, reflexivity, and scholarly legitimacy. The score is only the surface; explanations, evidence, strengths, weaknesses, and limitations make the evaluation useful.",
    points: [
      "Ten connected research-quality dimensions",
      "Five quality bands across a 0–10 scale",
      "Explanations, evidence, strengths, and limitations",
      "Questions that deepen scholarly reading",
    ],
    visual: fullscreen(
      "actionmenu",
      "Syllogos CRAF 4.0 action menu over a captured paper",
    ),
  },
  {
    eyebrow: "Labs · Beta",
    title: "Question the assessment from five perspectives",
    body: "The dialogic window recognizes that research cannot be evaluated from one final viewpoint. Engage through Positivist, Post-Positivist, Constructivist, Critical, and Pragmatist approaches.",
    points: [
      "Five fundamental research paradigms",
      "Questions grounded in the source and assessment",
      "A dialogic rather than mechanical evaluation",
    ],
    visual: fullscreen(
      "labs",
      "Syllogos Labs, a conversational Q&A panel over a loaded research paper",
    ),
  },
  {
    eyebrow: "Dashboard",
    title: "See patterns across the knowledge you evaluate",
    body: "Each assessment contributes to a broader view of fields, quality bands, confidence levels, and recurring ideas. Over time, separate readings become a more coherent picture of your research landscape.",
    points: [
      "Field distribution and quality-band patterns",
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
    title: "Open, capture, and assess without interruption",
    body: "Global shortcuts show or hide Syllogos, capture the source in front of you, and control background detection. The interface stays available without taking the researcher away from the material being evaluated.",
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
    title: "Keep the assessment open to return and review",
    body: "Save each result with its action, confidence, date, quality profile, and reasoning intact. Export the report when the evaluation needs to be discussed, compared, or carried into later research.",
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
                Read. Assess. Compare. <em>Then decide.</em>
              </>
            }
            subtitle="Move from quick orientation to Q1-style evaluation, dialogic questioning, and source comparison—while keeping final scholarly judgment in human hands."
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
      <section className="section-pad section-seam">
        <div className="container-x">
          <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <span className="eyebrow">Analysis</span>
              <h3 className="mt-4 display-sm text-[clamp(1.5rem,2.8vw,2.1rem)] text-text">
                From quick orientation to full committee-style evaluation.
              </h3>
              <p className="mt-3.5 text-[0.925rem] leading-relaxed text-text-tertiary">
                Context and key points orient the reading. Focused workflows
                examine methods, contribution, coherence, sources, and bias;
                Full Assessment integrates all ten CRAF dimensions into one
                explained report for the researcher to review.
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

      <section className="section-pad section-tone-island">
        <div className="container-x">
          <SectionHeading
            eyebrow="Principles of assessment"
            title={<>Four commitments that keep <em>judgment scholarly</em></>}
            subtitle="The platform supports research evaluation; it does not claim authority over the researcher."
          />
          <div className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Evidence", "Reasoning is organized so every conclusion can be inspected."],
              ["02", "Transparency", "Strengths, weaknesses, limitations, and possible bias remain visible."],
              ["03", "Plurality", "Five paradigms reveal how perspective shapes scholarly evaluation."],
              ["04", "Human authority", "The final interpretation and decision always belong to the researcher."],
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
        eyebrow="Democratizing Research"
        title="Bring a study. Examine it with the logic of experienced reviewers."
        note="Free to start. No credit card required."
      />
    </PageTransition>
  );
}
