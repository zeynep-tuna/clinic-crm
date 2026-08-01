import { doctorPatients } from "@/data/doctorPatients";
import type { FilterValue } from "@/components/doctor/DoctorPatientsTable";

type SummaryIcon = "total" | "active" | "pending" | "inTreatment";

interface SummaryCard {
  id: string;
  icon: SummaryIcon;
  title: string;
  value: number;
}

const colorByCardId: Record<string, string> = {
  total: "bg-[#EEF0FF] text-[#5B4DE3]",
  active: "bg-[#DCFCE7] text-[#16A34A]",
  pending: "bg-[#FEF3C7] text-[#F59E0B]",
  inTreatment: "bg-[#DBEAFE] text-[#2563EB]",
};

const filterByCardId: Record<string, FilterValue> = {
  total: "Tümü",
  active: "Aktif",
  pending: "Kontrol Bekliyor",
  inTreatment: "Tedavi Devam Ediyor",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "total":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 14a4 4 0 1 0-8 0M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM4 20c.5-3 3.5-5 8-5s7.5 2 8 5"
          />
        </svg>
      );
    case "active":
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
    case "inTreatment":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v6M9 6h6" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 11h10l-1.2 8.4a2 2 0 0 1-2 1.6H10.2a2 2 0 0 1-2-1.6L7 11Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

interface DoctorPatientSummaryCardsProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export default function DoctorPatientSummaryCards({
  activeFilter,
  onFilterChange,
}: DoctorPatientSummaryCardsProps) {
  const total = doctorPatients.length;
  const active = doctorPatients.filter((patient) => patient.status === "Aktif").length;
  const pendingCheck = doctorPatients.filter((patient) => patient.status === "Kontrol Bekliyor").length;
  const inTreatment = doctorPatients.filter((patient) => patient.status === "Tedavi Devam Ediyor").length;

  const cards: SummaryCard[] = [
    { id: "total", icon: "total", title: "Toplam Hasta", value: total },
    { id: "active", icon: "active", title: "Aktif Hasta", value: active },
    { id: "pending", icon: "pending", title: "Kontrol Bekliyor", value: pendingCheck },
    { id: "inTreatment", icon: "inTreatment", title: "Tedavisi Devam Eden", value: inTreatment },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#E3E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EEF2F8]">
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
