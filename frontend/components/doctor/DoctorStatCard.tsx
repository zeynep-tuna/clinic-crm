import type { DoctorStatCardData, DoctorStatIcon } from "@/data/doctorDashboard";

function StatIconGlyph({ icon }: { icon: DoctorStatIcon }) {
  switch (icon) {
    case "appointments":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "patients":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 14a4 4 0 1 0-8 0M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM4 20c.5-3 3.5-5 8-5s7.5 2 8 5" />
        </svg>
      );
    case "notes":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
          />
          <path strokeLinecap="round" d="M9 11h6M9 15h6" />
        </svg>
      );
    case "completed":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
        </svg>
      );
    default:
      return null;
  }
}

export default function DoctorStatCard({ title, value, icon, linkLabel }: DoctorStatCardData) {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#667085]">{title}</p>
          <p className="mt-2 text-2xl font-bold text-[#0B1F55]">{value}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#5B4DE3]">
          <StatIconGlyph icon={icon} />
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-[#5B4DE3]">{linkLabel}</p>
    </div>
  );
}
