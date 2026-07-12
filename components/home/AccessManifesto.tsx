import Reveal from "../Reveal";

const PROMISES = [
  ["01", "Review-informed criteria", "The questions used in rigorous peer review become explicit and learnable."],
  ["02", "Structured evidence", "Every assessment connects its reasoning to the study in front of you."],
  ["03", "Multiple perspectives", "Five research paradigms open each assessment to dialogue and challenge."],
  ["04", "Researcher responsibility", "Interpretation and research decisions remain with the researcher."],
];

export default function AccessManifesto() {
  return (
    <section className="section-pad section-seam relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(var(--accent-soft)/0.08)]" />
      <div className="container-x relative">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <span className="readout">Democratizing Research</span>
            <h2 className="mt-6 display text-[clamp(2.3rem,5.4vw,4.35rem)] text-text">
              Rigorous assessment should be <em>accessible to more researchers.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[1rem] leading-relaxed text-text-secondary sm:text-[1.08rem]">
              Critical appraisal develops through sustained peer review,
              methodological training, and disciplinary practice. Syllogos makes
              those evaluative criteria more explicit and easier to apply while
              preserving the researcher&rsquo;s responsibility for interpretation.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.3rem] border border-[rgb(var(--border)/0.08)] bg-[rgb(var(--border)/0.08)] sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(([n, title, body], i) => (
            <Reveal key={n} delay={i * 0.06} className="h-full">
              <article className="h-full bg-bg p-6 sm:p-7">
                <span className="numeral text-[0.65rem] text-accent-text">{n}</span>
                <h3 className="mt-6 display-sm text-[1.18rem] text-text">{title}</h3>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-text-tertiary">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
