import Reveal from "../Reveal";

const ACTIONS = [
  {
    name: "Summarize Context",
    desc: "Neutral overview of the main points.",
    tier: "Fast",
  },
  {
    name: "Extract Key Points",
    desc: "Bulleted list of core findings.",
    tier: "Fast",
  },
  {
    name: "Methods & Validity",
    desc: "Methodological rigor and scientific validity.",
    tier: "Deep",
  },
  {
    name: "Novelty & Scholarship",
    desc: "Originality and literature mastery.",
    tier: "Deep",
  },
  {
    name: "Coherence & Clarity",
    desc: "Theoretical consistency and writing quality.",
    tier: "Deep",
  },
  {
    name: "Sources & Review",
    desc: "Source credibility and peer evaluation.",
    tier: "Deep",
  },
  {
    name: "Bias & Legitimacy",
    desc: "Objectivity, reflexivity and implicit legitimacy.",
    tier: "Deep",
  },
  {
    name: "Full Assessment",
    desc: "All 10 CRAF 4.0 dimensions at once.",
    tier: "Deep",
  },
];

export default function ActionsGrid() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {ACTIONS.map((a, i) => (
        <Reveal key={a.name} delay={i * 0.04}>
          <div className="flex h-full flex-col rounded-xl acrylic card-hover p-3.5">
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span
                className={`font-mono text-[0.58rem] font-medium uppercase tracking-[0.14em] ${
                  a.tier === "Fast"
                    ? "text-accent-text"
                    : "text-text-tertiary"
                }`}
              >
                {a.tier}
              </span>
            </div>
            <span className="mt-2.5 block display-sm text-[0.95rem] leading-tight text-text">
              {a.name}
            </span>
            <p className="mt-1 text-[0.74rem] leading-snug text-text-tertiary">
              {a.desc}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
