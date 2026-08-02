"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { secretaryPatientRows, type SecretaryPatientStatus } from "@/data/secretaryPatients";

export type FilterValue = "Tümü" | SecretaryPatientStatus;

const filters: FilterValue[] = ["Tümü", "Aktif", "Kontrol Bekliyor", "Pasif"];

const statusBadgeClass: Record<SecretaryPatientStatus, string> = {
  Aktif: "bg-[#DCFCE7] text-[#16A34A]",
  "Kontrol Bekliyor": "bg-[#FEF3C7] text-[#F59E0B]",
  Pasif: "bg-[#F3F4F6] text-[#667085]",
};

const avatarPalette = [
  "bg-[#EEF0FF] text-[#5B4DE3]",
  "bg-[#DBEAFE] text-[#2563EB]",
  "bg-[#CCFBF1] text-[#0F766E]",
  "bg-[#FFEDD5] text-[#C2410C]",
  "bg-[#F3F4F6] text-[#475467]",
];

function getAvatarColor(id: string) {
  const sum = id.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return avatarPalette[sum % avatarPalette.length];
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5a2.1 2.1 0 0 1 3 3L7 20l-4 1 1-4Z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

interface SecretaryPatientsTableProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export default function SecretaryPatientsTable({ activeFilter, onFilterChange }: SecretaryPatientsTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredPatients = useMemo(() => {
    const term = search.trim().toLowerCase();

    return secretaryPatientRows.filter((patient) => {
      const matchesFilter = activeFilter === "Tümü" || patient.status === activeFilter;
      const matchesSearch = term === "" || patient.fullName.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-xs">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path strokeLinecap="round" d="M20 20l-3.8-3.8" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Bu listede hasta ara..."
            className="w-full rounded-xl border border-[#EAF0F8] bg-white py-2 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => onFilterChange(filter)}
                className={`rounded-xl border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-[#5B4DE3] bg-[#5B4DE3] text-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_6px_rgba(91,77,227,0.25)]"
                    : "border-[#EAF0F8] text-[#0B1F55] hover:border-[#DCD8FF] hover:bg-[#F7F8FF]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[880px] text-left">
          <thead>
            <tr className="border-b border-[#EAF0F8] text-xs font-semibold tracking-wide text-[#667085] uppercase">
              <th className="pb-2.5 font-medium">Hasta</th>
              <th className="pb-2.5 font-medium">Telefon</th>
              <th className="pb-2.5 font-medium">E-posta</th>
              <th className="pb-2.5 font-medium">Son Ziyaret</th>
              <th className="pb-2.5 font-medium">Kayıt Tarihi</th>
              <th className="pb-2.5 font-medium">Durum</th>
              <th className="pb-2.5 font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr
                key={patient.id}
                onClick={() => router.push(`/patients/${patient.id}`)}
                className="cursor-pointer border-b border-[#EAF0F8]/60 transition-colors last:border-0 hover:bg-[#F8F9FF]"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarColor(patient.id)}`}
                    >
                      {patient.fullName.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-[#0B1F55]">{patient.fullName}</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-[#0B1F55]">{patient.phone}</td>
                <td className="py-4 text-sm text-[#667085]">{patient.email}</td>
                <td className="py-4 text-sm text-[#0B1F55]">{patient.lastVisit}</td>
                <td className="py-4 text-sm text-[#0B1F55]">{patient.registeredDate}</td>
                <td className="py-4">
                  <span
                    className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusBadgeClass[patient.status]}`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3 text-[#667085]">
                    <button
                      type="button"
                      aria-label="Düzenle"
                      onClick={(event) => event.stopPropagation()}
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                    >
                      <EditIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="Diğer işlemler"
                      onClick={(event) => event.stopPropagation()}
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                    >
                      <MoreIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPatients.length === 0 && (
          <p className="py-10 text-center text-sm text-[#667085]">
            Aramanızla eşleşen hasta bulunamadı.
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#EAF0F8] pt-5">
        <p className="text-sm text-[#667085]">Toplam {filteredPatients.length} kayıt</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Önceki sayfa"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EAF0F8] text-[#667085] hover:bg-[#F7F8FF]"
          >
            &lt;
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5B4DE3] text-sm font-semibold text-white"
          >
            1
          </button>
          <button
            type="button"
            aria-label="Sonraki sayfa"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EAF0F8] text-[#667085] hover:bg-[#F7F8FF]"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
