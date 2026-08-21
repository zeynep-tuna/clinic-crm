"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { listPatients, type Patient } from "@/lib/patients-api";
import DoctorPatientSummaryCards from "@/components/doctor/DoctorPatientSummaryCards";
import EmptyState from "@/components/common/EmptyState";

type UiStatus = "Aktif" | "Pasif";

export type FilterValue = "Tümü" | UiStatus;

const filters: FilterValue[] = ["Tümü", "Aktif", "Pasif"];

const statusBadgeClass: Record<UiStatus, string> = {
  Aktif: "bg-[#DCFCE7] text-[#16A34A]",
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

function getFullName(patient: Patient) {
  return `${patient.firstName} ${patient.lastName}`.trim();
}

function getStatusLabel(patient: Patient): UiStatus {
  return patient.isActive ? "Aktif" : "Pasif";
}

function formatNullable(value: string | null) {
  return value ?? "—";
}

export default function DoctorPatientsTable() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [patientList, setPatientList] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPatients = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await listPatients({ includeInactive: true });
      setPatientList(data);
    } catch {
      setError("Hastalar yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  const filteredPatients = useMemo(() => {
    const term = search.trim().toLowerCase();

    return patientList.filter((patient) => {
      const status = getStatusLabel(patient);
      const matchesFilter = activeFilter === "Tümü" || status === activeFilter;
      const matchesSearch = term === "" || getFullName(patient).toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter, patientList]);

  return (
    <div className="flex flex-col gap-5">
      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Hastalar yükleniyor...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">{error}</p>
          <button
            type="button"
            onClick={loadPatients}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <DoctorPatientSummaryCards
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            patients={patientList}
          />

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
                      onClick={() => setActiveFilter(filter)}
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
              {patientList.length === 0 && (
                <EmptyState
                  variant="empty"
                  title="Henüz size atanmış hasta yok"
                  description="Size atanmış diş kliniği hastaları olduğunda tedavi ve takip bilgileri burada görüntülenir."
                />
              )}

              {patientList.length > 0 && filteredPatients.length === 0 && (
                <EmptyState
                  variant="search"
                  title="Eşleşen hasta bulunamadı"
                  description="Hasta adı veya seçili filtreyi değiştirerek tekrar deneyin."
                  action={
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setActiveFilter("Tümü");
                      }}
                      className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
                    >
                      Filtreleri temizle
                    </button>
                  }
                />
              )}

              {filteredPatients.length > 0 && (
              <table className="w-full min-w-220 text-left">
                <thead>
                  <tr className="border-b border-[#EEF2F8] text-xs font-semibold tracking-wide text-[#667085] uppercase">
                    <th className="pb-2.5 font-medium">Hasta Adı</th>
                    <th className="pb-2.5 font-medium">Telefon</th>
                    <th className="pb-2.5 font-medium">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => {
                    const fullName = getFullName(patient);
                    const status = getStatusLabel(patient);

                    return (
                    <tr
                      key={patient.id}
                      className="border-b border-[#EEF2F8] transition-colors last:border-0"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarColor(patient.id)}`}
                          >
                            {fullName.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-[#0B1F55]">{fullName}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-[#0B1F55]">{formatNullable(patient.phone)}</td>
                      <td className="py-4">
                        <span
                          className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusBadgeClass[status]}`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#EEF2F8] pt-5">
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
        </>
      )}
    </div>
  );
}
