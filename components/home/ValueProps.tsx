import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const CAPABILITIES = [
  {
    n: "01",
    label: "Bring in the source",
    title: "Begin where the reading already happens.",
    body: "Use the screen, a PDF or file, a DOI, or pasted text. Syllogos assembles the source for assessment without making you rebuild your workflow around another tool.",
    facts: ["Screen capture", "PDF & file", "DOI lookup", "Pasted text"],
  },
  {
    n: "02",
    label: "Make quality explicit",
    title: "Move from impression to observable criteria.",
    body: "CRAF 4.0 examines ten connected dimensions across five calibrated bands. Every result pairs its score with evidence, strengths, weaknesses, limitations, and questions for deeper reading.",
    facts: ["10 dimensions", "5 quality bands", "0–10 calibration", "Evidence linked"],
  },
  {
    n: "03",
    label: "Keep judgment human",
    title: "Interrogate the assessment, not just the paper.",
    body: "Question the result through five research paradigms, compare conflicting sources, and apply disciplinary context. AI organizes the evidence; the researcher remains responsible for interpretation.",
    facts: ["5 paradigms", "Source comparison", "Visible limits", "Researcher-led"],
  },
];

export default function ValueProps() {
  return (
    <section className="section-pad section-seam-quiet" id="capabilities">
      <div className="container-x">
        <SectionHeading
          eyebrow="The assessment workflow"
          index="01"
          align="left"
          title={
            <>
              Less interface. More clarity about <em>what the research supports.</em>
            </>
          }
          subtitle="Syllogos turns a fragmented appraisal process into one continuous path—from the source in front of you to an assessment you can inspect, question, and interpret."
        />

        <div className="mt-14 border-t border-[rgb(var(--border)/0.11)] sm:mt-16">
          {CAPABILITIES.map((capability, index) => (
            <Reveal key={capability.n} delay={index * 0.06}>
              <article className="capability-row grid gap-5 border-b border-[rgb(var(--border)/0.11)] py-9 sm:py-11 lg:grid-cols-[0.62fr_1.08fr_1.15fr] lg:gap-12">
                <div>
                  <span className="numeral text-[0.68rem] text-accent-text">
                    {capability.n}
                  </span>
                  <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-text-tertiary">
                    {capability.label}
                  </p>
                </div>

                <h3 className="display-sm max-w-md text-[clamp(1.45rem,2.6vw,2.05rem)] text-text">
                  {capability.title}
                </h3>

                <div>
                  <p className="max-w-lg text-[0.92rem] leading-[1.72] text-text-secondary">
                    {capability.body}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2" aria-label={`${capability.label} details`}>
                    {capability.facts.map((fact) => (
                      <li
                        key={fact}
                        className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-text-tertiary"
                      >
                        <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
