import type { SecretaryTaskCategory } from "@/data/secretaryDashboard";
import { secretaryUpcomingTasks } from "@/data/secretaryDashboard";

const categoryStyle: Record<SecretaryTaskCategory, string> = {
  appointment: "bg-[#EEF0FF] text-[#5B4DE3]",
  payment: "bg-[#FEF3C7] text-[#F59E0B]",
  consent: "bg-[#DBEAFE] text-[#2563EB]",
  schedule: "bg-[#DCFCE7] text-[#16A34A]",
};

function CategoryIcon({ category }: { category: SecretaryTaskCategory }) {
  switch (category) {
    case "appointment":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "payment":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "consent":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
          />
          <path strokeLinecap="round" d="M9 12.5l2 2 4-4.5" />
        </svg>
      );
    case "schedule":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <circle cx="12" cy="8" r="3.5" />
          <path strokeLinecap="round" d="M5 20c.7-3.8 3.4-6 7-6s6.3 2.2 7 6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SecretaryUpcomingTasks() {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Yaklaşan İşlemler / Hatırlatmalar</h2>

      <div className="mt-2 flex-1 divide-y divide-[#EAF0F8]">
        {secretaryUpcomingTasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 py-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${categoryStyle[task.category]}`}
            >
              <CategoryIcon category={task.category} />
            </span>
            <p className="flex-1 text-sm text-[#0B1F55]">{task.text}</p>
            <span className="shrink-0 text-xs font-medium text-[#667085]">{task.timeLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
