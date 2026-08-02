import type { StatCardData } from "@/data/dashboard";

function StatIconGlyph({ icon }: { icon: StatCardData["icon"] }) {
  switch (icon) {
    case "patients":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <circle cx="9" cy="8" r="3" />
          <path strokeLinecap="round" d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
          <path strokeLinecap="round" d="M15.5 5.5a3 3 0 0 1 0 5.8M18 19c-.4-2.3-1.5-4-3.2-4.8" />
        </svg>
      );
    case "appointments":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "payments":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "doctors":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5v5.5a3.5 3.5 0 0 0 7 0V3.5" />
          <path strokeLinecap="round" d="M7 3.5H5.7M14 3.5h1.3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12v2.5a4.5 4.5 0 0 0 9 0v-1" />
          <circle cx="19.5" cy="13.5" r="1.5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function StatCard({
  title,
  value,
  trendDirection,
  trendLabel,
  icon,
  iconVariant = "primary",
}: StatCardData) {
  const isUp = trendDirection === "up";

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#667085]">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-[#0B1F55]">{value}</p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
            iconVariant === "warning"
              ? "bg-[#FEF3C7] text-[#F59E0B]"
              : "bg-[#EEF0FF] text-[#5B4DE3]"
          }`}
        >
          <StatIconGlyph icon={icon} />
        </div>
      </div>

      <p
        className={`mt-3 flex items-center gap-1 text-xs font-medium ${
          isUp ? "text-[#16A34A]" : "text-[#EF4444]"
        }`}
      >
        <span>{isUp ? "↑" : "↓"}</span>
        <span>{trendLabel}</span>
      </p>
    </div>
  );
}
