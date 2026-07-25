import LandingNavbar from "@/components/landing/LandingNavbar";
import FeaturesHero from "@/components/features/FeaturesHero";
import FeaturesGrid from "@/components/features/FeaturesGrid";
import FeaturesCTA from "@/components/features/FeaturesCTA";

export default function FeaturesPage() {
  return (
    <main>
      <LandingNavbar activeHref="/features" />

      <div className="relative overflow-hidden bg-[#F7F8FF]">
        <div className="pointer-events-none absolute -left-40 top-32 z-0 h-105 w-105 rounded-full bg-[#DCD8FF] opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 z-0 h-120 w-120 rounded-full bg-[#DCD8FF] opacity-40 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
          <FeaturesHero />
          <FeaturesGrid />
          <FeaturesCTA />
        </div>
      </div>
    </main>
  );
}
