import PageTransition from "@/components/PageTransition";
import Hero from "@/components/home/Hero";
import VideoShowcase from "@/components/home/VideoShowcase";
import CrafInstrument from "@/components/home/CrafInstrument";
import ValueProps from "@/components/home/ValueProps";
import HowItWorks from "@/components/home/HowItWorks";
import TrustProtocol from "@/components/home/TrustProtocol";
import LiveAssessment from "@/components/home/LiveAssessment";
import CtaBanner from "@/components/CtaBanner";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <VideoShowcase />
      <ValueProps />
      <CrafInstrument />
      <LiveAssessment />
      <TrustProtocol />
      <HowItWorks />
      <CtaBanner
        eyebrow="Democratizing Research"
        title="Bring a study. Leave with a clearer view of what it supports."
        note="Free to start. No credit card required. Windows & macOS."
      />
    </PageTransition>
  );
}
