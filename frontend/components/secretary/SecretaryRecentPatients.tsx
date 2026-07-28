import { secretaryRecentPatients } from "@/data/secretaryDashboard";

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4 shrink-0 text-[#98A2B3]">
      <circle cx="12" cy="8" r="3.5" />
      <path strokeLinecap="round" d="M5 20c.7-3.8 3.4-6 7-6s6.3 2.2 7 6" />
    </svg>
  );
}

export default function SecretaryRecentPatients() {
  return (
    <div className="flex flex-col rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#0B1F55]">Son Eklenen Hastalar</h2>
        <button
          type="button"
          className="rounded-lg border border-[#E3E8F0] px-3 py-1.5 text-xs font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </button>
      </div>

      <div className="mt-2 divide-y divide-[#E3E8F0]">
        {secretaryRecentPatients.map((patient) => (
          <div key={patient.id} className="flex items-center gap-3 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-sm font-semibold text-[#16A34A]">
              {patient.name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#0B1F55]">{patient.name}</p>
              <p className="text-xs text-[#667085]">{patient.addedLabel}</p>
            </div>
            <UserIcon />
          </div>
        ))}
      </div>
    </div>
  );
}
