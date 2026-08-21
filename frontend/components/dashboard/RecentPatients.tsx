import Link from "next/link";
import type { Patient } from "@/lib/patients-api";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function getFullName(patient: Patient) {
  return `${patient.firstName} ${patient.lastName}`.trim();
}

interface RecentPatientsProps {
  patients: Patient[];
}

export default function RecentPatients({ patients }: RecentPatientsProps) {
  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#0B1F55]">Son Eklenen Hastalar</h3>
        <Link href="/patients" className="text-sm font-medium text-[#5B4DE3] hover:underline">
          Tümünü Gör
        </Link>
      </div>

      {patients.length === 0 ? (
        <p className="mt-4 py-4 text-center text-sm text-[#667085]">Henüz hasta kaydı bulunmuyor.</p>
      ) : (
        <ul className="mt-4 space-y-3.5">
          {patients.map((patient) => (
            <li key={patient.id} className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
                {getFullName(patient).charAt(0)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#0B1F55]">{getFullName(patient)}</p>
                <p className="text-xs text-[#667085]">{patient.gender ?? "—"}</p>
              </div>

              <p className="shrink-0 text-xs text-[#667085]">{dateFormatter.format(new Date(patient.createdAt))}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
