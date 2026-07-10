import FeatureCard from "@/components/FeatureCard";
import { features } from "@/data/features";

export default function Home() {
  return (
    <main>
      <h1>ClinicCRM</h1>

      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </main>
  );
}