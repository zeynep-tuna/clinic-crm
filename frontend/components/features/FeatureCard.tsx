import type { ComponentType } from "react";

type FeatureCardProps = {
  Icon: ComponentType;
  title: string;
  description: string;
};

export default function FeatureCard({ Icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_12px_rgba(16,24,40,0.06)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#5B4DE3]">
        <Icon />
      </div>

      <h3 className="mt-4 text-lg font-bold text-[#0B1F55]">{title}</h3>
      <p className="mt-1.5 text-sm text-[#667085]">{description}</p>

      <a
        href="#"
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#5B4DE3] hover:text-[#4c3fd1]"
      >
        İncele
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
