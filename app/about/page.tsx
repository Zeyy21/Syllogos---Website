import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { IconArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Syllogos makes research credibility legible through evidence-anchored assessment, scientific validation, and human-led judgment.",
};

const STORY = [
  {
    eyebrow: "The problem",
    title: "The literature grew. Human attention did not.",
    body: "Millions of new papers arrive each year while retractions, reproducibility failures, predatory venues, and fabricated citations make the scholarly record harder to trust. Search engines can find a source. Chatbots can summarize it. Citation managers can file it. None of them answer the question that comes before every serious use of evidence: how much should I trust this, and why?",
  },
  {
    eyebrow: "The solution",
    title: "Make credibility legible",
    body: "Syllogos is the credibility layer for academic research: a desktop companion that reads the source in front of you and returns a structured, evidence-anchored assessment across ten dimensions. It works inside the reading workflow because judgment is most useful at the exact moment a researcher decides whether a claim belongs in the work.",
  },
  {
    eyebrow: "Our stance",
    title: "Augmentation over automation",
    body: "A credibility tool should never ask the researcher to surrender judgment. CRAF 4.0 was reformulated through more than twenty researcher surveys and is continuously tested against expert review. Every score must show evidence. Every discipline is judged on appropriate terms. Where evidence is insufficient, the system says Indeterminate. The human remains the final authority by design.",
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
                Trust is the product. <em>Rigor is how we earn it.</em>
              </>
            }
            subtitle="Our mission is to make rigorous source judgment accessible to everyone. Every student, researcher, educator, and curious reader should be able to understand what deserves trust, why it deserves trust, and where uncertainty remains."
          />
        </div>
      </section>

      <section className="section-pad border-y border-[rgb(var(--border)/0.07)] bg-bg-deep">
        <div className="container-x">
          <SectionHeading
            eyebrow="The people behind the judgment"
            index="04"
            align="left"
            title={<>The build-and-trust <em>axis</em></>}
            subtitle="Syllogos pairs product execution with independent scientific authority. The platform and the framework sharpen each other through a continuous human validation loop."
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
                &ldquo;A gathering&rdquo; where evidence, method, and human
                judgment come together.
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
                  Research partnerships, team access, and honest feedback
                </h3>
                <p className="mt-3.5 max-w-md text-[0.925rem] leading-relaxed text-text-tertiary">
                  Whether you are testing the beta, leading a research lab,
                  studying research integrity, or exploring institutional
                  adoption, we would like to hear how credibility is handled in
                  your world.
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
