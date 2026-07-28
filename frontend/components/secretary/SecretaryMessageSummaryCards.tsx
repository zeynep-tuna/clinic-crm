import { secretaryMessageSummary } from "@/data/secretaryMessages";

type SummaryIcon = "total" | "unread" | "today" | "urgent";

const iconByCardId: Record<string, SummaryIcon> = {
  total: "total",
  unread: "unread",
  today: "today",
  urgent: "urgent",
};

const iconColorByCardId: Record<string, string> = {
  total: "bg-[#DBEAFE] text-[#2563EB]",
  unread: "bg-[#EEF0FF] text-[#5B4DE3]",
  today: "bg-[#DCFCE7] text-[#16A34A]",
  urgent: "bg-[#FEE2E2] text-[#EF4444]",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "total":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4 3.5V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"
          />
        </svg>
      );
    case "unread":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "today":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "urgent":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5 21 19.5H3L12 3.5Z" />
          <path strokeLinecap="round" d="M12 10v3.5" />
          <circle cx="12" cy="16.3" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SecretaryMessageSummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {secretaryMessageSummary.map((card) => (
        <div
          key={card.id}
          className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#667085]">{card.title}</p>
              <p className="mt-2 text-2xl font-bold text-[#0B1F55]">{card.value}</p>
            </div>

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconColorByCardId[card.id] ?? "bg-[#EEF0FF] text-[#5B4DE3]"}`}
            >
              <SummaryIconGlyph icon={iconByCardId[card.id] ?? "total"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
