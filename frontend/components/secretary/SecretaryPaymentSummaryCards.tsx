import { secretaryPaymentSummary } from "@/data/secretaryPayments";
import type { FilterValue } from "@/components/secretary/SecretaryPaymentsTable";

type SummaryIcon = "total-revenue" | "pending" | "completed" | "refunded";

const iconByCardId: Record<string, SummaryIcon> = {
  "total-revenue": "total-revenue",
  pending: "pending",
  completed: "completed",
  refunded: "refunded",
};

const colorByCardId: Record<string, string> = {
  "total-revenue": "bg-[#EEF0FF] text-[#5B4DE3]",
  completed: "bg-[#DCFCE7] text-[#16A34A]",
  pending: "bg-[#FEF3C7] text-[#F59E0B]",
  refunded: "bg-[#FEE2E2] text-[#EF4444]",
};

const filterByCardId: Record<string, FilterValue> = {
  "total-revenue": "Tümü",
  completed: "Ödendi",
  pending: "Bekliyor",
  refunded: "İade",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "total-revenue":
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
    case "completed":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
        </svg>
      );
    case "refunded":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 0 1 13.66-5.66M20 12a8 8 0 0 1-13.66 5.66" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 3v3.5h-3.5M7 21v-3.5h3.5" />
        </svg>
      );
    default:
      return null;
  }
}

interface SecretaryPaymentSummaryCardsProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export default function SecretaryPaymentSummaryCards({
  activeFilter,
  onFilterChange,
}: SecretaryPaymentSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#E3E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#E3E8F0]/60">
      {secretaryPaymentSummary.map((card) => {
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
              <SummaryIconGlyph icon={iconByCardId[card.id] ?? "total-revenue"} />
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
