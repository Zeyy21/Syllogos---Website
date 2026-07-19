import Reveal from "../Reveal";
import Marquee from "../Marquee";

const PLATFORMS = [
  "JSTOR",
  "arXiv",
  "PubMed",
  "Springer",
  "IEEE",
  "ScienceDirect",
  "Scopus",
  "Web of Science",
  "ResearchGate",
];

export default function TrustStrip() {
  return (
    <section className="section-seam-quiet py-10">
      <div className="container-x">
        <Reveal>
          <p className="mb-7 text-center font-mono text-[0.72rem] uppercase tracking-[0.18em] text-text-tertiary">
            Works where the literature already lives
          </p>
        </Reveal>
      </div>
      <Reveal>
        <Marquee>
          {PLATFORMS.map((name) => (
            <span
              key={name}
              className="text-[1.05rem] font-medium tracking-tight text-text-tertiary transition-colors duration-200 hover:text-text"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
