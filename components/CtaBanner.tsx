import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { IconArrowRight } from "./Icons";

type Props = {
  eyebrow?: string;
  title: string;
  note?: string;
};

export default function CtaBanner({
  eyebrow = "Democratizing Research",
  title,
  note = "Free to start. No credit card required. Windows & macOS.",
}: Props) {
  return (
    <section className="section-pad section-seam-quiet">
      <div className="container-x">
        <Reveal>
          <div className="cta-premium relative overflow-hidden rounded-[1.65rem] px-6 py-16 text-center sm:px-12 sm:py-24">
            <div className="cta-premium-glow" aria-hidden="true" />
            <div className="relative flex flex-col items-center">
              <span className="readout">{eyebrow}</span>
              <h2 className="mx-auto mt-5 max-w-3xl display text-[clamp(2.2rem,5vw,4.25rem)] text-text">
                {title}
              </h2>
              <div className="mt-9 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
                <MagneticButton href="/download">
                  Start your first assessment
                  <IconArrowRight width={16} height={16} />
                </MagneticButton>
                <MagneticButton href="/features" variant="secondary">
                  Explore the framework
                </MagneticButton>
              </div>
              <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-text-tertiary">
                {note}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
