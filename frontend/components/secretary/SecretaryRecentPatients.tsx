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

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4 shrink-0 text-[#98A2B3]">
      <circle cx="12" cy="8" r="3.5" />
      <path strokeLinecap="round" d="M5 20c.7-3.8 3.4-6 7-6s6.3 2.2 7 6" />
    </svg>
  );
}

interface SecretaryRecentPatientsProps {
  patients: Patient[];
}

export default function SecretaryRecentPatients({ patients }: SecretaryRecentPatientsProps) {
  return (
    <div className="flex flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#0B1F55]">Son Eklenen Hastalar</h2>
        <Link
          href="/secretary/patients"
          className="rounded-lg border border-[#EAF0F8] px-3 py-1.5 text-xs font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </Link>
      </div>

      {patients.length === 0 ? (
        <p className="mt-4 py-4 text-center text-sm text-[#667085]">Henüz hasta kaydı bulunmuyor.</p>
      ) : (
        <div className="mt-2 divide-y divide-[#EAF0F8]">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center gap-3 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-sm font-semibold text-[#16A34A]">
                {getFullName(patient).charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#0B1F55]">{getFullName(patient)}</p>
                <p className="text-xs text-[#667085]">{dateFormatter.format(new Date(patient.createdAt))} eklendi</p>
              </div>
              <UserIcon />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
