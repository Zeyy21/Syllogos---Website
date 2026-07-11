import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import { IconWindows, IconApple, IconArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Syllogos for Windows and macOS. Start on the free plan with no credit card required.",
};

const PLATFORMS = [
  {
    name: "Windows",
    Icon: IconWindows,
    cta: "Download for Windows",
    meta: "v2.0.0 · Windows 10 or later · 64-bit · ~85 MB",
  },
  {
    name: "macOS",
    Icon: IconApple,
    cta: "Download for macOS",
    meta: "v2.0.0 · macOS 12 Monterey or later · Apple Silicon & Intel · ~92 MB",
  },
];

const CHANGELOG = [
  {
    q: "What's new in v2.0.0",
    a: "CRAF 4.0 credibility framework with 10 weighted governance dimensions and auto-detected discipline grounding. Eight analysis actions split into fast and deep tiers. Real-time streaming results with progressive blur-to-sharp card reveals. Labs (beta) brings conversational Q&A to your loaded research context. A redesigned Insights Dashboard adds field distribution and keyword trends. Automatic detection now covers 18+ academic platforms.",
  },
  {
    q: "v1.6.2 | Stability & detection",
    a: "Improved OCR accuracy for window-title matching, faster full-text fetch through CrossRef and Unpaywall, and a more reliable 3-second dwell timer. Various fixes to the notification toast and PDF auto-import.",
  },
  {
    q: "v1.5.0 | Saved Research",
    a: "Introduced bookmarking for analysis results, color-coded library cards by action type, and cloud sync to keep saved research persistent across sessions and devices.",
  },
];

export default function DownloadPage() {
  return (
    <PageTransition>
      <section className="pb-2 pt-36">
        <div className="container-x">
          <SectionHeading
            eyebrow="Download"
            title={
              <>
                Put the credibility layer <em>beside you</em>
              </>
            }
            subtitle="Install the desktop companion, open a source, and run your first evidence-anchored assessment in minutes. The free plan needs no credit card."
          />
        </div>
      </section>

      {/* Download cards */}
      <section className="pb-10 pt-12">
        <div className="container-x">
          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            {PLATFORMS.map(({ name, Icon, cta, meta }, i) => (
              <Reveal key={name} delay={i * 0.08}>
                <article className="flex h-full flex-col items-center rounded-[1.25rem] acrylic card-hover p-7 text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-[12px] bg-accent/12 text-accent-text">
                    <Icon width={26} height={26} />
                  </div>
                  <h3 className="mt-4 display-sm text-[1.3rem] text-text">
                    {name}
                  </h3>
                  <a
                    href="#"
                    className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl btn-primary px-4 py-2.5 text-[0.875rem]"
                  >
                    {cta}
                    <IconArrowRight width={15} height={15} />
                  </a>
                  <p className="mt-3.5 font-mono text-[0.68rem] leading-relaxed tracking-[0.02em] text-text-tertiary">
                    {meta}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16}>
            <p className="mt-7 text-center text-[0.875rem] text-text-tertiary">
              Your free plan includes five deep assessments every month.{" "}
              <a
                href="#"
                className="cursor-pointer font-medium text-accent-text underline-offset-4 transition-colors hover:underline"
              >
                See what counts as a deep analysis
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-[rgb(var(--border)/0.07)] bg-bg-deep">
        <div className="container-x">
          <SectionHeading
            eyebrow="First assessment"
            title={<>From install to evidence in <em>three moves</em></>}
          />
          <div className="mx-auto mt-11 grid max-w-4xl gap-3 md:grid-cols-3">
            {[
              ["01", "Open a source", "Use a browser, PDF reader, DOI, file, screenshot, or pasted text."],
              ["02", "Choose the question", "Start fast, inspect methods, audit sources, surface bias, or run all ten dimensions."],
              ["03", "Follow the evidence", "Inspect the score, confidence, limitations, and the quoted passages behind the judgment."],
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

      {/* Changelog */}
      <section className="section-pad border-t border-[rgb(var(--border)/0.07)]">
        <div className="container-x">
          <SectionHeading eyebrow="Changelog" title="What's new" />
          <div className="mx-auto mt-10 max-w-2xl">
            <Accordion items={CHANGELOG} />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
