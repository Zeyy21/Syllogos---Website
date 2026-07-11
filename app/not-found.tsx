import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[78vh] items-center">
      <div className="container-x flex flex-col items-center text-center">
        <span className="readout">
          <span className="readout-index">ERR</span>
          <span className="text-text-tertiary/50">/</span>
          not found
        </span>
        <p className="numeral mt-5 text-[clamp(4rem,11vw,7rem)] font-medium leading-none text-accent">
          404
        </p>
        <h1 className="mt-3 display-sm text-[1.6rem] text-text">
          This page wandered off.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-[0.925rem] leading-relaxed text-text-tertiary">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or it has moved
          somewhere new.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex cursor-pointer items-center rounded-xl btn-primary px-5 py-2.5 text-[0.9rem]"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
