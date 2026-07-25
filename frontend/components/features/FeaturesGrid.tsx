import FeatureCard from "@/components/features/FeatureCard";
import { featuresData } from "@/components/features/featuresData";

export default function FeaturesGrid() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {featuresData.map((feature) => (
        <FeatureCard
          key={feature.title}
          Icon={feature.Icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}
