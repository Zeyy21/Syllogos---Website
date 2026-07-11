import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { IconArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Syllogos democratizes research assessment by bringing expert evaluation logic into collaboration with human scholarly judgment.",
};

const STORY = [
  {
    eyebrow: "The problem",
    title: "Expert evaluation remains difficult to access.",
    body: "The rigorous standards used by leading Q1 journals are usually learned through years of peer review, critical reading, and academic practice inside specialized circles. Many capable researchers have not yet had access to that accumulated evaluative experience, even when they need to judge methodology, evidence, originality, coherence, sources, and bias with the same seriousness.",
  },
  {
    eyebrow: "The solution",
    title: "Make expert assessment accessible",
    body: "Syllogos makes the logic of experienced research evaluation faster, more structured, and easier to interpret. Through CRAF 4.0, it examines a study across ten connected dimensions and presents the evidence, strengths, weaknesses, limitations, quality band, and questions a researcher needs for a more informed scholarly decision.",
  },
  {
    eyebrow: "Our stance",
    title: "Collaboration over replacement",
    body: "Syllogos does not automate scholarship or replace reviewers. Artificial intelligence organizes, analyzes, and presents evidence; the researcher brings context, interpretation, and final judgment. Five dialogic paradigms keep the assessment open to different epistemic assumptions, methodological choices, and traditions of knowledge.",
  },
];

const FOUNDERS = [
  {
    initials: "ZS",
    name: "Zeyyad Saleh",
    role: "Co-founder & Chief Executive Officer",
    body: "Product, engineering, and company execution. Zeyyad designed and built the Syllogos platform end to end, from the desktop overlay and CRAF implementation to the data and sharing infrastructure. He previously served as CTO of an AI sales-enablement startup.",
    place: "Montreal",
  },
  {
    initials: "WS",
    name: "Dr. Wael Saleh",
    role: "Co-founder & Chief Scientific Officer",
    body: "Scientific validity, framework calibration, and academic relationships. Dr. Saleh brings more than twenty years of scholarship, twenty-plus peer-reviewed publications, and a doctorate centered on the epistemology of knowledge production.",
    place: "Abu Dhabi region",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="pb-2 pt-36">
        <div className="container-x">
          <SectionHeading
            eyebrow="About"
            title={
              <>
                Democratizing Research. <em>Keeping judgment human.</em>
              </>
            }
            subtitle="Our mission is to make the evaluative logic of experienced Q1 reviewers available to a wider research community—clearly, transparently, and without taking final scholarly authority away from the researcher."
          />
        </div>
      </section>

      <section className="section-pad border-y border-[rgb(var(--border)/0.07)] bg-bg-deep">
        <div className="container-x">
          <SectionHeading
            eyebrow="The people behind the platform"
            index="04"
            align="left"
            title={<>Technology and scholarship, <em>in dialogue</em></>}
            subtitle="Syllogos brings product development and academic expertise together so the platform can be continuously tested, calibrated, questioned, and improved by researchers."
          />
          <div className="mt-11 grid gap-4 lg:grid-cols-2">
            {FOUNDERS.map((founder, i) => (
              <Reveal key={founder.name} delay={i * 0.08}>
                <article className="group h-full rounded-[1.35rem] acrylic card-hover p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-[rgb(var(--accent-soft)/0.25)] bg-accent/10 font-mono text-[0.78rem] tracking-[0.12em] text-accent-text">
                      {founder.initials}
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-text-tertiary">{founder.place}</span>
                  </div>
                  <h3 className="mt-7 display-sm text-[1.45rem] text-text">{founder.name}</h3>
                  <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-accent-text">{founder.role}</p>
                  <p className="mt-5 text-[0.9rem] leading-relaxed text-text-secondary">{founder.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story sections */}
      <section className="section-pad">
        <div className="container-x flex flex-col gap-14">
          {STORY.map((block, i) => (
            <div key={block.eyebrow}>
              <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                <Reveal>
                  <span className="readout">
                    <span className="readout-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-text-tertiary/50">/</span>
                    {block.eyebrow}
                  </span>
                  <h3 className="mt-4 display-sm text-[clamp(1.5rem,2.8vw,2.1rem)] text-text">
                    {block.title}
                  </h3>
                </Reveal>
                <Reveal delay={0.08}>
                  <p
                    className={`text-[0.975rem] leading-relaxed text-text-secondary lg:pt-9 ${
                      i === 0 ? "dropcap" : ""
                    }`}
                  >
                    {block.body}
                  </p>
                </Reveal>
              </div>
              {i < STORY.length - 1 && <div className="mt-14 hairline" />}
            </div>
          ))}
        </div>
      </section>

      {/* The Name, a quiet design detail */}
      <section className="pb-20">
        <div className="container-x">
          <Reveal>
            <div className="relative mx-auto flex max-w-2xl flex-col items-center overflow-hidden rounded-[1.5rem] acrylic px-8 py-14 text-center ruler-rule">
              <span className="readout">
                <span className="readout-index">σ</span>
                <span className="text-text-tertiary/50">/</span>
                the name
              </span>
              <p className="mt-5 font-serif text-[clamp(1.8rem,3.6vw,2.6rem)] font-medium tracking-[-0.02em] text-text">
                Syllogos{" "}
                <span className="font-normal italic text-accent-text">
                  σύλλογος
                </span>
              </p>
              <p className="pullquote mx-auto mt-4 max-w-md text-[clamp(1.05rem,1.8vw,1.25rem)] text-text-secondary">
                &ldquo;A gathering&rdquo; where artificial intelligence and human
                academic expertise evaluate research together.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <div className="grid items-center gap-7 rounded-[1.5rem] acrylic-elevated px-7 py-10 sm:px-10 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <span className="eyebrow">Get in touch</span>
                <h3 className="mt-4 display-sm text-[clamp(1.4rem,2.8vw,2rem)] text-text">
                  Research partnerships, beta participation, and precise feedback
                </h3>
                <p className="mt-3.5 max-w-md text-[0.925rem] leading-relaxed text-text-tertiary">
                  Tell us where an assessment works, where it needs adjustment,
                  and which cases expose the limits of the framework. Researcher
                  feedback is part of how Syllogos is calibrated and developed.
                </p>
              </div>
              <div className="lg:justify-self-end">
                <a
                  href="mailto:hello@syllogos.app"
                  className="group inline-flex cursor-pointer items-center gap-1.5 rounded-xl btn-primary px-5 py-2.5 font-mono text-[0.85rem]"
                >
                  hello@syllogos.app
                  <IconArrowRight
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
