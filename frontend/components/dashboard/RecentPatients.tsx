import { recentPatients } from "@/data/dashboard";

export default function RecentPatients() {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#0B1F55]">Son Eklenen Hastalar</h3>
        <a href="#" className="text-sm font-medium text-[#5B4DE3] hover:underline">
          Tümünü Gör
        </a>
      </div>

      <ul className="mt-4 space-y-3.5">
        {recentPatients.map((patient) => (
          <li key={patient.id} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
              {patient.name.charAt(0)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#0B1F55]">{patient.name}</p>
              <p className="text-xs text-[#667085]">
                {patient.age} yaş, {patient.gender}
              </p>
            </div>

            <p className="shrink-0 text-xs text-[#667085]">{patient.addedDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
