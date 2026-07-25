import { secretaryRecentPatients } from "@/data/secretaryDashboard";

export default function SecretaryRecentPatients() {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#0B1F55]">Son Eklenen Hastalar</h2>
        <button
          type="button"
          className="rounded-lg border border-[#E3E8F0] px-3 py-1.5 text-xs font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {secretaryRecentPatients.map((patient) => (
          <div key={patient.id} className="flex items-center gap-3 rounded-xl border border-[#E3E8F0] p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
              {patient.name.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-medium text-[#0B1F55]">{patient.name}</p>
              <p className="text-xs text-[#667085]">{patient.addedLabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
