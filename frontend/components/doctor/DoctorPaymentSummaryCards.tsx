import { doctorPaymentSummary } from "@/data/doctorPayments";
import type { FilterValue } from "@/components/doctor/DoctorPaymentsTable";

type SummaryIcon = "total-collected" | "pending" | "partial" | "completed";

const iconByCardId: Record<string, SummaryIcon> = {
  "total-collected": "total-collected",
  pending: "pending",
  partial: "partial",
  completed: "completed",
};

const colorByCardId: Record<string, string> = {
  "total-collected": "bg-[#EEF0FF] text-[#5B4DE3]",
  pending: "bg-[#FEF3C7] text-[#F59E0B]",
  partial: "bg-[#DBEAFE] text-[#2563EB]",
  completed: "bg-[#DCFCE7] text-[#16A34A]",
};

const filterByCardId: Record<string, FilterValue> = {
  "total-collected": "Tümü",
  pending: "Bekliyor",
  partial: "Kısmi Ödeme",
  completed: "Ödendi",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "total-collected":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "pending":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
        </svg>
      );
    case "partial":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <path d="M12 3.5a8.5 8.5 0 1 0 0 17V3.5Z" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="8.5" />
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

interface DoctorPaymentSummaryCardsProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export default function DoctorPaymentSummaryCards({
  activeFilter,
  onFilterChange,
}: DoctorPaymentSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EEF2F8]">
      {doctorPaymentSummary.map((card) => {
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
              <SummaryIconGlyph icon={iconByCardId[card.id] ?? "total-collected"} />
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
