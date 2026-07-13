import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "Bring in the research",
    body: "Use the screen, a PDF or file, a DOI, or pasted text without leaving your reading workflow.",
  },
  {
    n: "02",
    title: "Choose the assessment",
    body: "Orient quickly, examine one dimension, run the complete CRAF report, or compare sources.",
  },
  {
    n: "03",
    title: "Inspect the reasoning",
    body: "Review the quality band, source evidence, strengths, weaknesses, limitations, and open questions.",
  },
  {
    n: "04",
    title: "Interpret with context",
    body: "Question the result through five paradigms and apply the disciplinary judgment only you can supply.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-pad section-seam-quiet">
      <div className="container-x">
        <SectionHeading
          eyebrow="From source to judgment"
          index="05"
          align="left"
          title={
            <>
              Four moves. One continuous <em>scholarly workflow.</em>
            </>
          }
          subtitle="The interface recedes so the intellectual sequence remains clear: gather the source, evaluate it, inspect the reasoning, and decide what the evidence means in context."
        />

        <ol className="mt-14 grid border-t border-[rgb(var(--border)/0.11)] md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal key={step.n} delay={index * 0.06} className="h-full">
              <li className="workflow-step relative h-full border-b border-[rgb(var(--border)/0.11)] px-0 py-8 md:px-6 lg:border-b-0 lg:border-r lg:px-7 lg:py-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-[rgb(var(--accent-soft)/0.32)] font-mono text-[0.63rem] text-accent-text">
                    {step.n}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[rgb(var(--accent-soft)/0.24)] to-transparent" />
                </div>
                <h3 className="mt-7 display-sm text-[1.25rem] text-text">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.86rem] leading-[1.68] text-text-tertiary">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
