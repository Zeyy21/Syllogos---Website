import PageTransition from "@/components/PageTransition";
import Hero from "@/components/home/Hero";
import Showcase from "@/components/home/Showcase";
import VideoShowcase from "@/components/home/VideoShowcase";
import CrafInstrument from "@/components/home/CrafInstrument";
import ShowcaseGallery from "@/components/home/ShowcaseGallery";
import TrustStrip from "@/components/home/TrustStrip";
import ValueProps from "@/components/home/ValueProps";
import HowItWorks from "@/components/home/HowItWorks";
import TrustProtocol from "@/components/home/TrustProtocol";
import LiveAssessment from "@/components/home/LiveAssessment";
import AccessManifesto from "@/components/home/AccessManifesto";
import CtaBanner from "@/components/CtaBanner";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Showcase />
      <VideoShowcase />
      <ValueProps />
      <AccessManifesto />
      <CrafInstrument />
      <LiveAssessment />
      <TrustProtocol />
      <ShowcaseGallery />
      <TrustStrip />
      <HowItWorks />
      <CtaBanner
        eyebrow="Democratizing Research"
        title="Rigorous research assessment should be accessible throughout the research community."
        note="Free to start. No credit card required. Windows & macOS."
      />
    </PageTransition>
  );
}
