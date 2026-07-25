import { secretaryUpcomingTasks } from "@/data/secretaryDashboard";

function TaskIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}

export default function SecretaryUpcomingTasks() {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Yaklaşan İşlemler / Hatırlatmalar</h2>

      <div className="mt-4 space-y-3">
        {secretaryUpcomingTasks.map((task) => (
          <div key={task.id} className="flex items-start gap-3 rounded-xl border border-[#E3E8F0] p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FF] text-[#5B4DE3]">
              <TaskIcon />
            </span>
            <p className="text-sm text-[#0B1F55]">{task.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
