import { doctorAppointmentSummary } from "@/data/doctorAppointments";
import type { FilterValue } from "@/components/doctor/DoctorAppointmentsTable";

type SummaryIcon = "today" | "confirmed" | "pending" | "completed";

const iconByCardId: Record<string, SummaryIcon> = {
  today: "today",
  confirmed: "confirmed",
  pending: "pending",
  completed: "completed",
};

const colorByCardId: Record<string, string> = {
  today: "bg-[#EEF0FF] text-[#5B4DE3]",
  confirmed: "bg-[#DCFCE7] text-[#16A34A]",
  pending: "bg-[#FEF3C7] text-[#F59E0B]",
  completed: "bg-[#DBEAFE] text-[#2563EB]",
};

const filterByCardId: Record<string, FilterValue> = {
  today: "Tümü",
  confirmed: "Onaylandı",
  pending: "Bekliyor",
  completed: "Tamamlandı",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "today":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "confirmed":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
        </svg>
      );
    case "pending":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
        </svg>
      );
    case "completed":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12.5l4.5 4.5L20 6" />
        </svg>
      );
    default:
      return null;
  }
}

interface DoctorAppointmentSummaryCardsProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export default function DoctorAppointmentSummaryCards({
  activeFilter,
  onFilterChange,
}: DoctorAppointmentSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EEF2F8]">
      {doctorAppointmentSummary.map((card) => {
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
              <SummaryIconGlyph icon={iconByCardId[card.id] ?? "today"} />
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
