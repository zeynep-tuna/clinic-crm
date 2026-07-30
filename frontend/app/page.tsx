import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingHero from "@/components/landing/LandingHero";

export default function Home() {
  return (
    <main>
      <LandingNavbar activeHref="/" />
      <LandingHero />
    </main>
  );
}
