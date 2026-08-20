import type { TreatmentPlan } from "@/lib/treatment-plans-api";
import type { FilterValue } from "@/components/doctor/DoctorTreatmentPlansTable";

type SummaryIcon = "active" | "completed" | "pending-review" | "postponed";

interface SummaryCard {
  id: string;
  icon: SummaryIcon;
  title: string;
  value: number;
}

const colorByCardId: Record<string, string> = {
  active: "bg-[#EEF0FF] text-[#5B4DE3]",
  completed: "bg-[#DCFCE7] text-[#16A34A]",
  "pending-review": "bg-[#FEF3C7] text-[#F59E0B]",
  postponed: "bg-[#FEE2E2] text-[#EF4444]",
};

const filterByCardId: Record<string, FilterValue> = {
  active: "Aktif",
  completed: "Tamamlandı",
  "pending-review": "Kontrol Bekliyor",
  postponed: "Ertelendi",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "active":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
        </svg>
      );
    case "pending-review":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
        </svg>
      );
    case "postponed":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 12a8 8 0 0 1 13.66-5.66M20 12a8 8 0 0 1-13.66 5.66"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 3v3.5h-3.5M7 21v-3.5h3.5" />
        </svg>
      );
    default:
      return null;
  }
}

interface DoctorTreatmentPlanSummaryCardsProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  treatmentPlans: TreatmentPlan[];
}

export default function DoctorTreatmentPlanSummaryCards({
  activeFilter,
  onFilterChange,
  treatmentPlans,
}: DoctorTreatmentPlanSummaryCardsProps) {
  const activePlans = treatmentPlans.filter((plan) => plan.isActive);

  const activeCount = activePlans.filter((plan) => plan.status === "ACTIVE").length;
  const completedCount = activePlans.filter((plan) => plan.status === "COMPLETED").length;
  const pendingReviewCount = activePlans.filter((plan) => plan.status === "REVIEW_PENDING").length;
  const postponedCount = activePlans.filter((plan) => plan.status === "POSTPONED").length;

  const cards: SummaryCard[] = [
    { id: "active", icon: "active", title: "Aktif Plan", value: activeCount },
    { id: "completed", icon: "completed", title: "Tamamlanan", value: completedCount },
    { id: "pending-review", icon: "pending-review", title: "Kontrol Bekleyen", value: pendingReviewCount },
    { id: "postponed", icon: "postponed", title: "Ertelenen", value: postponedCount },
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
