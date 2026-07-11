import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import DepthField from "./three/DepthField";
import { IconArrowRight } from "./Icons";

type Props = {
  eyebrow?: string;
  title: string;
  note?: string;
};

export default function CtaBanner({
  eyebrow = "Get started",
  title,
  note = "Free to start. No credit card required. Windows & macOS.",
}: Props) {
  return (
    <section className="section-pad">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] acrylic-elevated px-6 py-16 text-center sm:px-12 sm:py-20">
            {/* woven 3D depth field */}
            <DepthField className="opacity-70" />

            {/* top accent hairline */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgb(216 182 90 / 0.6), transparent)",
              }}
            />

            <div className="relative flex flex-col items-center">
              <span className="readout">{eyebrow}</span>
              <h2 className="mx-auto mt-4 max-w-xl display text-[clamp(1.9rem,4vw,3rem)] text-text">
                {title}
              </h2>
              <div className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
                <MagneticButton href="/download">
                  Start free
                  <IconArrowRight width={16} height={16} />
                </MagneticButton>
                <MagneticButton href="/features" variant="secondary">
                  Explore Features
                </MagneticButton>
              </div>
              <p className="mt-5 text-[0.825rem] text-text-tertiary">{note}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
