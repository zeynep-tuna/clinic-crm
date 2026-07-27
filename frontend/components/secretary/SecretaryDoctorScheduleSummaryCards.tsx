import { secretaryDoctorScheduleSummary } from "@/data/secretaryDoctorSchedule";

type SummaryIcon = "active-doctors" | "today-appointments" | "free-slots" | "busy-doctors";

const iconByCardId: Record<string, SummaryIcon> = {
  "active-doctors": "active-doctors",
  "today-appointments": "today-appointments",
  "free-slots": "free-slots",
  "busy-doctors": "busy-doctors",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "active-doctors":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <circle cx="9" cy="8" r="3" />
          <path strokeLinecap="round" d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
          <path strokeLinecap="round" d="M15.5 5.5a3 3 0 0 1 0 5.8M18 19c-.4-2.3-1.5-4-3.2-4.8" />
        </svg>
      );
    case "today-appointments":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "free-slots":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
        </svg>
      );
    case "busy-doctors":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <path strokeLinecap="round" d="M4 20V10M10 20V4M16 20v-7M4 20h16" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SecretaryDoctorScheduleSummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {secretaryDoctorScheduleSummary.map((card) => (
        <div
          key={card.id}
          className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#667085]">{card.title}</p>
              <p className="mt-2 text-2xl font-bold text-[#0B1F55]">{card.value}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#5B4DE3]">
              <SummaryIconGlyph icon={iconByCardId[card.id] ?? "active-doctors"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
