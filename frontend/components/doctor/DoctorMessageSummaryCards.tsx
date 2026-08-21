import type { Message } from "@/lib/messages-api";
import type { FilterValue } from "@/components/doctor/DoctorMessagesPanel";

type SummaryIcon = "total" | "unread" | "today" | "urgent";

interface SummaryCard {
  id: string;
  icon: SummaryIcon;
  title: string;
  value: number;
}

const colorByCardId: Record<string, string> = {
  total: "bg-[#DBEAFE] text-[#2563EB]",
  unread: "bg-[#EEF0FF] text-[#5B4DE3]",
  today: "bg-[#CCFBF1] text-[#0F766E]",
  urgent: "bg-[#FEE2E2] text-[#EF4444]",
};

const filterByCardId: Record<string, FilterValue> = {
  unread: "Okunmamış",
  urgent: "Acil",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "total":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4 3.5V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"
          />
        </svg>
      );
    case "unread":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "today":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "urgent":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5 21 19.5H3L12 3.5Z" />
          <path strokeLinecap="round" d="M12 10v3.5" />
          <circle cx="12" cy="16.3" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

function isToday(value: string) {
  const date = new Date(value);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

interface DoctorMessageSummaryCardsProps {
  messages: Message[];
  currentUserId: string;
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export default function DoctorMessageSummaryCards({
  messages,
  currentUserId,
  activeFilter,
  onFilterChange,
}: DoctorMessageSummaryCardsProps) {
  const totalCount = messages.length;
  const unreadCount = messages.filter((message) => message.receiverId === currentUserId && !message.isRead).length;
  const todayCount = messages.filter(
    (message) => message.receiverId === currentUserId && isToday(message.createdAt)
  ).length;
  const urgentCount = messages.filter((message) => message.priority === "URGENT").length;

  const cards: SummaryCard[] = [
    { id: "total", icon: "total", title: "Toplam Mesaj", value: totalCount },
    { id: "unread", icon: "unread", title: "Okunmamış", value: unreadCount },
    { id: "today", icon: "today", title: "Bugün Gelen", value: todayCount },
    { id: "urgent", icon: "urgent", title: "Acil", value: urgentCount },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EEF2F8]">
      {cards.map((card) => {
        const filterValue = filterByCardId[card.id];
        const isSelected = filterValue !== undefined && activeFilter === filterValue;

        const content = (
          <>
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colorByCardId[card.id] ?? "bg-[#EEF0FF] text-[#5B4DE3]"}`}
            >
              <SummaryIconGlyph icon={card.icon} />
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
