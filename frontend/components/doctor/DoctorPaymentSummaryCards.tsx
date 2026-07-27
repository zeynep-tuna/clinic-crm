import { doctorPaymentSummary } from "@/data/doctorPayments";

type SummaryIcon = "total-collected" | "pending" | "partial" | "completed";

const iconByCardId: Record<string, SummaryIcon> = {
  "total-collected": "total-collected",
  pending: "pending",
  partial: "partial",
  completed: "completed",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "total-collected":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "pending":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
        </svg>
      );
    case "partial":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <path d="M12 3.5a8.5 8.5 0 1 0 0 17V3.5Z" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="8.5" />
        </svg>
      );
    case "completed":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12.5l4.5 4.5L20 6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function DoctorPaymentSummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {doctorPaymentSummary.map((card) => (
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
              <SummaryIconGlyph icon={iconByCardId[card.id] ?? "total-collected"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
