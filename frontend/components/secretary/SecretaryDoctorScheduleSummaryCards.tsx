import { secretaryDoctorScheduleSummary } from "@/data/secretaryDoctorSchedule";
import type { FilterValue } from "@/components/secretary/SecretaryDoctorScheduleTable";

type SummaryIcon = "active-doctors" | "today-appointments" | "free-slots" | "busy-doctors";

const iconByCardId: Record<string, SummaryIcon> = {
  "active-doctors": "active-doctors",
  "today-appointments": "today-appointments",
  "free-slots": "free-slots",
  "busy-doctors": "busy-doctors",
};

const colorByCardId: Record<string, string> = {
  "active-doctors": "bg-[#DCFCE7] text-[#16A34A]",
  "today-appointments": "bg-[#DBEAFE] text-[#2563EB]",
  "free-slots": "bg-[#CCFBF1] text-[#0F766E]",
  "busy-doctors": "bg-[#FEE2E2] text-[#EF4444]",
};

const filterByCardId: Record<string, FilterValue> = {
  "active-doctors": "Aktif",
  "today-appointments": "Tümü",
  "free-slots": "Müsait",
  "busy-doctors": "Yoğun",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "active-doctors":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="9" cy="8" r="3" />
          <path strokeLinecap="round" d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
          <path strokeLinecap="round" d="M15.5 5.5a3 3 0 0 1 0 5.8M18 19c-.4-2.3-1.5-4-3.2-4.8" />
        </svg>
      );
    case "today-appointments":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "free-slots":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
        </svg>
      );
    case "busy-doctors":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <path strokeLinecap="round" d="M4 20V10M10 20V4M16 20v-7M4 20h16" />
        </svg>
      );
    default:
      return null;
  }
}

interface SecretaryDoctorScheduleSummaryCardsProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export default function SecretaryDoctorScheduleSummaryCards({
  activeFilter,
  onFilterChange,
}: SecretaryDoctorScheduleSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EAF0F8]/60">
      {secretaryDoctorScheduleSummary.map((card) => {
        const filterValue = filterByCardId[card.id] ?? "Tümü";
        const isSelected = activeFilter === filterValue;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onFilterChange(filterValue)}
            className={`flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors sm:px-5 ${
              isSelected ? "bg-[#F7F8FF]" : "hover:bg-[#F7F8FF]"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colorByCardId[card.id] ?? "bg-[#EEF0FF] text-[#5B4DE3]"}`}
            >
              <SummaryIconGlyph icon={iconByCardId[card.id] ?? "active-doctors"} />
            </span>
            <div>
              <p className="text-xl font-bold text-[#0B1F55]">{card.value}</p>
              <p className="text-xs text-[#667085]">{card.title}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
