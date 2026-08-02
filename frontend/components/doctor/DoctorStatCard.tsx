import type { DoctorStatCardData, DoctorStatIcon } from "@/data/doctorDashboard";

const iconColorByType: Record<DoctorStatIcon, string> = {
  appointments: "bg-[#EEF0FF] text-[#5B4DE3]",
  patients: "bg-[#DBEAFE] text-[#2563EB]",
  notes: "bg-[#FFEDD5] text-[#C2410C]",
  completed: "bg-[#DCFCE7] text-[#16A34A]",
};

const linkColorByType: Record<DoctorStatIcon, string> = {
  appointments: "text-[#5B4DE3]",
  patients: "text-[#2563EB]",
  notes: "text-[#C2410C]",
  completed: "text-[#16A34A]",
};

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
          <circle cx="9" cy="8" r="3" />
          <path strokeLinecap="round" d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
          <path strokeLinecap="round" d="M15.5 5.5a3 3 0 0 1 0 5.8M18 19c-.4-2.3-1.5-4-3.2-4.8" />
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
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#667085]">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-[#0B1F55]">{value}</p>
        </div>

        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconColorByType[icon]}`}>
          <StatIconGlyph icon={icon} />
        </div>
      </div>

      <p className={`mt-3 text-xs font-medium ${linkColorByType[icon]}`}>{linkLabel}</p>
    </div>
  );
}
