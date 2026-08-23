import type { Appointment } from "@/lib/appointments-api";
import type { FilterValue } from "@/components/doctor/DoctorAppointmentsTable";

type SummaryIcon = "total" | "confirmed" | "pending" | "completed";

interface SummaryCard {
  id: string;
  icon: SummaryIcon;
  title: string;
  value: number;
}

const STATUS_LABELS: Record<Appointment["status"], string> = {
  SCHEDULED: "Bekliyor",
  CONFIRMED: "Onaylandı",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
  NO_SHOW: "Gelmedi",
};

const colorByCardId: Record<string, string> = {
  total: "bg-[#EEF0FF] text-[#5B4DE3]",
  confirmed: "bg-[#DCFCE7] text-[#16A34A]",
  pending: "bg-[#FEF3C7] text-[#F59E0B]",
  completed: "bg-[#F3F4F6] text-[#667085]",
};

const filterByCardId: Record<string, FilterValue> = {
  total: "Tümü",
  confirmed: "Onaylandı",
  pending: "Bekliyor",
  completed: "Kapanan",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "total":
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
          <rect x="3.5" y="4" width="17" height="5" rx="1.5" />
          <path strokeLinecap="round" d="M4.5 9v9a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V9" />
          <path strokeLinecap="round" d="M10 13h4" />
        </svg>
      );
    default:
      return null;
  }
}

interface DoctorAppointmentSummaryCardsProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  appointments: Appointment[];
}

export default function DoctorAppointmentSummaryCards({
  activeFilter,
  onFilterChange,
  appointments,
}: DoctorAppointmentSummaryCardsProps) {
  const total = appointments.length;
  const confirmed = appointments.filter((appointment) => STATUS_LABELS[appointment.status] === "Onaylandı").length;
  const pending = appointments.filter((appointment) => STATUS_LABELS[appointment.status] === "Bekliyor").length;
  const completedOrCancelled = appointments.filter((appointment) => {
    const status = STATUS_LABELS[appointment.status];
    return status === "Tamamlandı" || status === "İptal" || status === "Gelmedi";
  }).length;

  const cards: SummaryCard[] = [
    { id: "total", icon: "total", title: "Toplam Randevu", value: total },
    { id: "confirmed", icon: "confirmed", title: "Onaylandı", value: confirmed },
    { id: "pending", icon: "pending", title: "Bekliyor", value: pending },
    { id: "completed", icon: "completed", title: "Tamamlandı / İptal", value: completedOrCancelled },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EEF2F8]">
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
