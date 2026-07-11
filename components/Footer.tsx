import Link from "next/link";
import Logo from "./Logo";
import { IconTwitter, IconGithub, IconLinkedin } from "./Icons";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Download", href: "/download" },
];

const SOCIALS = [
  { label: "X / Twitter", href: "#", Icon: IconTwitter },
  { label: "GitHub", href: "#", Icon: IconGithub },
  { label: "LinkedIn", href: "#", Icon: IconLinkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border)/0.07)] bg-bg-deep">
      <div className="container-x py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 max-w-[16rem] font-serif text-[0.95rem] italic leading-relaxed text-text-tertiary">
              Democratizing Research. The evaluative logic of experienced Q1
              reviewers, made structured, transparent, and accessible.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg acrylic text-text-tertiary transition-colors duration-200 hover:text-text"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-14">
            <nav className="flex flex-col gap-2.5">
              <span className="mb-1 font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-text-tertiary">
                Navigate
              </span>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[0.875rem] text-text-secondary transition-colors duration-200 hover:text-text"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-2.5">
              <span className="mb-1 font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-text-tertiary">
                Legal
              </span>
              <Link
                href="#"
                className="text-[0.875rem] text-text-secondary transition-colors duration-200 hover:text-text"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-[0.875rem] text-text-secondary transition-colors duration-200 hover:text-text"
              >
                Terms of Service
              </Link>
              <Link
                href="/about"
                className="text-[0.875rem] text-text-secondary transition-colors duration-200 hover:text-text"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[rgb(var(--border)/0.07)] pt-6 font-mono text-[0.72rem] tracking-[0.02em] text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Syllogos · σύλλογος · all rights reserved</p>
          <p>
            Built by the{" "}
            <span className="text-text-secondary">Syllogos team</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
