import { doctorTreatmentPlanSummary } from "@/data/doctorTreatmentPlans";

type SummaryIcon = "active" | "completed" | "pending-review" | "updated-this-week";

const iconByCardId: Record<string, SummaryIcon> = {
  active: "active",
  completed: "completed",
  "pending-review": "pending-review",
  "updated-this-week": "updated-this-week",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "active":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
        </svg>
      );
    case "pending-review":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
        </svg>
      );
    case "updated-this-week":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
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

export default function DoctorTreatmentPlanSummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {doctorTreatmentPlanSummary.map((card) => (
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
              <SummaryIconGlyph icon={iconByCardId[card.id] ?? "active"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
