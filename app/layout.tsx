import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* Fraunces is the editorial display serif. Optical sizing + a touch of
   softness gives Syllogos a scholarly, human warmth no sans can. Used
   for headlines and pull quotes only; Inter still carries body text. */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

/* Geist Mono is the instrument face. Every score, tick, dimension index,
   and readout label is set in mono so numbers read as measured, not
   decorative. This is the "A: The Instrument" half of the identity. */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

/* Absolute base URL for SEO metadata (Open Graph / Twitter images).
   Prefer an explicit site URL (set NEXT_PUBLIC_SITE_URL to a custom
   domain later), then the URL Vercel injects per-deployment, then
   localhost for dev. Without metadataBase, Next.js warns on every
   build and social-preview image URLs resolve incorrectly. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Syllogos | Democratizing Research",
    template: "%s · Syllogos",
  },
  description:
    "Syllogos supports structured assessment of research quality through CRAF 4.0, evidence-linked analysis, and researcher-led interpretation.",
  keywords: [
    "research tool",
    "academic AI",
    "research quality assessment",
    "CRAF",
    "desktop research",
  ],
  openGraph: {
    title: "Syllogos | Democratizing Research",
    description:
      "Structured, evidence-linked research assessment informed by established peer-review criteria.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0c18" },
    { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
  ],
};

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('syllogos-theme');
    if (t !== 'light' && t !== 'dark') t = 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e){
    document.documentElement.setAttribute('data-theme','dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
