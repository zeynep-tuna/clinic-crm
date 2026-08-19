import type { Patient } from "@/lib/patients-api";
import type { FilterValue } from "@/components/doctor/DoctorPatientsTable";

type SummaryIcon = "total" | "active" | "inactive";

interface SummaryCard {
  id: string;
  icon: SummaryIcon;
  title: string;
  value: number;
}

const colorByCardId: Record<string, string> = {
  total: "bg-[#EEF0FF] text-[#5B4DE3]",
  active: "bg-[#DCFCE7] text-[#16A34A]",
  inactive: "bg-[#F3F4F6] text-[#667085]",
};

const filterByCardId: Record<string, FilterValue> = {
  total: "Tümü",
  active: "Aktif",
  inactive: "Pasif",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "total":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="9" cy="8" r="3" />
          <path strokeLinecap="round" d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
          <path strokeLinecap="round" d="M15.5 5.5a3 3 0 0 1 0 5.8M18 19c-.4-2.3-1.5-4-3.2-4.8" />
        </svg>
      );
    case "active":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
        </svg>
      );
    case "inactive":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" d="M10 9.5v5M14 9.5v5" />
        </svg>
      );
    default:
      return null;
  }
}

interface DoctorPatientSummaryCardsProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  patients: Patient[];
}

export default function DoctorPatientSummaryCards({
  activeFilter,
  onFilterChange,
  patients,
}: DoctorPatientSummaryCardsProps) {
  const total = patients.length;
  const active = patients.filter((patient) => patient.isActive).length;
  const inactive = patients.filter((patient) => !patient.isActive).length;

  const cards: SummaryCard[] = [
    { id: "total", icon: "total", title: "Toplam Hasta", value: total },
    { id: "active", icon: "active", title: "Aktif Hasta", value: active },
    { id: "inactive", icon: "inactive", title: "Pasif Hasta", value: inactive },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:gap-0 sm:divide-x sm:divide-[#EEF2F8]">
      {cards.map((card) => {
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
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colorByCardId[card.id]}`}
            >
              <SummaryIconGlyph icon={card.icon} />
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
