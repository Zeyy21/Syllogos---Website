import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const RULES = [
  {
    n: "01",
    label: "Evidence is mandatory",
    body: "Every score points back to quoted passages in the source. A score without evidence is rejected, not displayed.",
  },
  {
    n: "02",
    label: "Discipline changes the rubric",
    body: "A theoretical humanities paper is not penalized for lacking a control group. CRAF adapts its weighting to the work in front of it.",
  },
  {
    n: "03",
    label: "Uncertainty stays visible",
    body: "When the paper does not support a judgment, Syllogos returns Indeterminate rather than inventing a reassuring midpoint.",
  },
];

export default function TrustProtocol() {
  return (
    <section className="section-pad border-y border-[rgb(var(--border)/0.07)] bg-bg-deep">
      <div className="container-x">
        <SectionHeading
          eyebrow="The trust protocol"
          index="03"
          align="left"
          title={
            <>
              Designed to resist the easy <em>answer</em>
            </>
          }
          subtitle="General AI is optimized to respond. Syllogos is engineered to judge carefully, show its working, and decline when the evidence runs out."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="relative flex h-full min-h-[410px] flex-col overflow-hidden rounded-[1.4rem] border border-[rgb(var(--accent-soft)/0.22)] bg-surface p-7 sm:p-9">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
              <span className="figure-label">Assessment excerpt / Methods &amp; Validity</span>
              <blockquote className="relative mt-auto max-w-lg font-serif text-[clamp(1.45rem,3vw,2.2rem)] font-medium leading-[1.18] tracking-[-0.02em] text-text">
                “The authors report a pre-registered protocol and justify the
                sample size through an a priori power analysis.”
              </blockquote>
              <div className="relative mt-7 grid grid-cols-3 gap-2">
                {[
                  ["SCORE", "8.6"],
                  ["BAND", "Strong"],
                  ["CONFIDENCE", "High"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-[rgb(var(--border)/0.08)] bg-bg/40 p-3">
                    <div className="font-mono text-[0.56rem] uppercase tracking-[0.15em] text-text-tertiary">{k}</div>
                    <div className="numeral mt-1.5 text-[0.9rem] font-medium text-text">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3">
            {RULES.map((rule, i) => (
              <Reveal key={rule.n} delay={i * 0.07} className="h-full">
                <article className="group flex h-full gap-5 rounded-[1.2rem] acrylic card-hover p-6 sm:p-7">
                  <span className="numeral mt-0.5 text-[0.72rem] text-accent-text">{rule.n}</span>
                  <div>
                    <h3 className="display-sm text-[1.2rem] text-text">{rule.label}</h3>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-text-tertiary">{rule.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
