import { doctorTreatmentPlanSummary } from "@/data/doctorTreatmentPlans";
import type { FilterValue } from "@/components/doctor/DoctorTreatmentPlansTable";

type SummaryIcon = "active" | "completed" | "pending-review" | "updated-this-week";

const iconByCardId: Record<string, SummaryIcon> = {
  active: "active",
  completed: "completed",
  "pending-review": "pending-review",
  "updated-this-week": "updated-this-week",
};

const colorByCardId: Record<string, string> = {
  active: "bg-[#EEF0FF] text-[#5B4DE3]",
  completed: "bg-[#DCFCE7] text-[#16A34A]",
  "pending-review": "bg-[#FEF3C7] text-[#F59E0B]",
  "updated-this-week": "bg-[#DBEAFE] text-[#2563EB]",
};

const filterByCardId: Record<string, FilterValue> = {
  active: "Aktif",
  completed: "Tamamlandı",
  "pending-review": "Kontrol Bekliyor",
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
    case "updated-this-week":
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
}

export default function DoctorTreatmentPlanSummaryCards({
  activeFilter,
  onFilterChange,
}: DoctorTreatmentPlanSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EEF2F8]">
      {doctorTreatmentPlanSummary.map((card) => {
        const filterValue = filterByCardId[card.id];
        const isSelected = filterValue !== undefined && activeFilter === filterValue;

        const content = (
          <>
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colorByCardId[card.id] ?? "bg-[#EEF0FF] text-[#5B4DE3]"}`}
            >
              <SummaryIconGlyph icon={iconByCardId[card.id] ?? "active"} />
            </span>
            <div>
              <p className="text-xl font-bold text-[#0B1F55]">{card.value}</p>
              <p className="text-xs text-[#667085]">{card.title}</p>
            </div>
          </>
        );

        if (filterValue === undefined) {
          return (
            <div key={card.id} className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-left sm:px-5">
              {content}
            </div>
          );
        }

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onFilterChange(filterValue)}
            className={`flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors sm:px-5 ${
              isSelected ? "bg-[#F7F8FF]" : "hover:bg-[#F7F8FF]"
            }`}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
