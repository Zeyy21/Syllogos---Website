import PageTransition from "@/components/PageTransition";
import Hero from "@/components/home/Hero";
import Showcase from "@/components/home/Showcase";
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
      <ValueProps />
      <AccessManifesto />
      <CrafInstrument />
      <LiveAssessment />
      <TrustProtocol />
      <ShowcaseGallery />
      <TrustStrip />
      <HowItWorks />
      <CtaBanner
        eyebrow="Research rigor, within reach"
        title="Better judgment should be available to everyone."
        note="Free to start. No credit card required. Windows & macOS."
      />
    </PageTransition>
  );
}
