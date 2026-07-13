import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const PRINCIPLES = [
  {
    n: "01",
    label: "Evidence before conclusion",
    body: "Each finding stays connected to what in the study supports it, so the reasoning can be examined rather than accepted uncritically.",
  },
  {
    n: "02",
    label: "Context shapes evaluation",
    body: "Methods and claims are read in relation to the field, epistemic assumptions, and traditions of knowledge in which they operate.",
  },
  {
    n: "03",
    label: "Limits remain visible",
    body: "Possible bias, missing evidence, methodological limits, and unresolved questions remain part of the report instead of disappearing behind a score.",
  },
];

export default function TrustProtocol() {
  return (
    <section className="section-pad section-tone-exit section-seam-quiet">
      <div className="container-x">
        <SectionHeading
          eyebrow="The trust standard"
          index="04"
          align="left"
          title={
            <>
              Transparent assessment. <em>No automatic conclusions.</em>
            </>
          }
          subtitle="Syllogos organizes evidence and explains how an assessment was formed. Every finding remains open to review, disagreement, and disciplinary judgment."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch lg:gap-16">
          <Reveal>
            <figure className="trust-figure relative flex min-h-[470px] flex-col overflow-hidden border-y border-[rgb(var(--accent-soft)/0.25)] py-8 sm:py-10">
              <div className="trust-figure-glow" aria-hidden="true" />
              <figcaption className="figure-label relative">
                Representative assessment / Methods &amp; validity
              </figcaption>
              <blockquote className="relative mt-auto max-w-2xl font-serif text-[clamp(1.75rem,4vw,3.15rem)] font-medium leading-[1.1] tracking-[-0.025em] text-text">
                “The authors report a pre-registered protocol and justify the
                sample size through an a priori power analysis.”
              </blockquote>

              <dl className="relative mt-9 grid grid-cols-3 border-t border-[rgb(var(--border)/0.1)] pt-5">
                {[
                  ["Score", "8.6"],
                  ["Band", "Strong"],
                  ["Confidence", "High"],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={index > 0 ? "border-l border-[rgb(var(--border)/0.1)] pl-5" : ""}
                  >
                    <dt className="font-mono text-[0.56rem] uppercase tracking-[0.15em] text-text-tertiary">
                      {label}
                    </dt>
                    <dd className="numeral mt-2 text-[0.95rem] font-medium text-text sm:text-[1.05rem]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </figure>
          </Reveal>

          <div className="border-t border-[rgb(var(--border)/0.11)]">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.n} delay={index * 0.07}>
                <article className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[rgb(var(--border)/0.11)] py-7 sm:py-8">
                  <span className="numeral mt-1 text-[0.68rem] text-accent-text">
                    {principle.n}
                  </span>
                  <div>
                    <h3 className="display-sm text-[1.25rem] text-text">
                      {principle.label}
                    </h3>
                    <p className="mt-3 text-[0.88rem] leading-[1.7] text-text-tertiary">
                      {principle.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal delay={0.22}>
              <p className="marginalia mt-7 text-[0.8rem]">
                The example above demonstrates output structure. Researchers
                remain responsible for checking the source and interpreting the
                assessment in context.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
