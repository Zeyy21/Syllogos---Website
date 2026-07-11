import Reveal from "./Reveal";
import DisplayHeading from "./DisplayHeading";

type Props = {
  eyebrow?: string;
  /** optional instrument-style index, e.g. "02" → renders 02 / EYEBROW */
  index?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
};

/**
 * Section heading in the redesign identity: a mono "readout" eyebrow
 * (optionally indexed like a spec sheet) above a Fraunces serif title.
 */
export default function SectionHeading({
  eyebrow,
  index,
  title,
  subtitle,
  align = "center",
}: Props) {
  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignCls}`}>
      {eyebrow && (
        <Reveal>
          <span className="readout">
            {index && <span className="readout-index">{index}</span>}
            {index && <span className="text-text-tertiary/50">/</span>}
            {eyebrow}
          </span>
        </Reveal>
      )}
      <DisplayHeading
        as="h2"
        size="section"
        delay={0.05}
        className="mt-5 max-w-3xl"
      >
        {title}
      </DisplayHeading>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={`mt-5 max-w-xl text-balance text-[0.975rem] leading-relaxed text-text-secondary ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
