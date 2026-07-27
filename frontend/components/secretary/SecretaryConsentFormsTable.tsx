"use client";

import { useMemo, useState } from "react";
import {
  secretaryConsentFormRows,
  type SecretaryConsentFormStatus,
  type SecretaryConsentFormType,
} from "@/data/secretaryConsentForms";

type FilterValue = "Tümü" | SecretaryConsentFormStatus;

const filters: FilterValue[] = ["Tümü", "İmzalandı", "Bekliyor", "Eksik"];

const statusBadgeClass: Record<SecretaryConsentFormStatus, string> = {
  İmzalandı: "bg-[#DCFCE7] text-[#16A34A]",
  Bekliyor: "bg-[#FEF3C7] text-[#F59E0B]",
  Eksik: "bg-[#FEE2E2] text-[#EF4444]",
};

const formTypeBadgeClass: Record<SecretaryConsentFormType, string> = {
  Tedavi: "bg-[#EEF0FF] text-[#5B4DE3]",
  KVKK: "bg-[#DBEAFE] text-[#2563EB]",
  Cerrahi: "bg-[#FEE2E2] text-[#EF4444]",
  Görüntüleme: "bg-[#FEF3C7] text-[#F59E0B]",
  Muayene: "bg-[#DCFCE7] text-[#16A34A]",
};

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0 4-4m-4 4-4-4" />
      <path strokeLinecap="round" d="M4 18.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
    </svg>
  );
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

export default function SecretaryConsentFormsTable() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");

  const filteredForms = useMemo(() => {
    const term = search.trim().toLowerCase();

    return secretaryConsentFormRows.filter((form) => {
      const matchesFilter = activeFilter === "Tümü" || form.status === activeFilter;
      const matchesSearch =
        term === "" ||
        form.patientName.toLowerCase().includes(term) ||
        form.formName.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
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
            placeholder="Hasta veya form ara..."
            className="w-full rounded-xl border border-[#E3E8F0] bg-white py-2 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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
                    ? "border-[#EEF0FF] bg-[#EEF0FF] text-[#5B4DE3]"
                    : "border-[#E3E8F0] text-[#0B1F55] hover:bg-[#F7F8FF]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[920px] text-left">
          <thead>
            <tr className="border-b border-[#E3E8F0] text-sm text-[#667085]">
              <th className="pb-2.5 font-medium">Hasta</th>
              <th className="pb-2.5 font-medium">Form Adı</th>
              <th className="pb-2.5 font-medium">Form Türü</th>
              <th className="pb-2.5 font-medium">Tarih</th>
              <th className="pb-2.5 font-medium">Dosya</th>
              <th className="pb-2.5 font-medium">Durum</th>
              <th className="pb-2.5 font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filteredForms.map((form) => (
              <tr key={form.id} className="border-b border-[#E3E8F0]/60 last:border-0">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
                      {form.patientName.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-[#0B1F55]">{form.patientName}</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-[#0B1F55]">{form.formName}</td>
                <td className="py-4">
                  <span
                    className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold ${formTypeBadgeClass[form.formType]}`}
                  >
                    {form.formType}
                  </span>
                </td>
                <td className="py-4 text-sm text-[#0B1F55]">{form.date}</td>
                <td className="py-4">
                  <span className="inline-block rounded-full border border-[#E3E8F0] bg-[#F7F8FF] px-3 py-1 text-xs font-medium text-[#667085]">
                    {form.fileType}
                  </span>
                </td>
                <td className="py-4">
                  <span
                    className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusBadgeClass[form.status]}`}
                  >
                    {form.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2 text-[#667085]">
                    <button
                      type="button"
                      aria-label="Görüntüle"
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                    >
                      <EyeIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="İndir"
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                    >
                      <DownloadIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="Düzenle"
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                    >
                      <EditIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="Diğer işlemler"
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                    >
                      <MoreIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredForms.length === 0 && (
          <p className="py-10 text-center text-sm text-[#667085]">
            Aramanızla eşleşen onam formu bulunamadı.
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#E3E8F0] pt-5">
        <p className="text-sm text-[#667085]">Toplam {filteredForms.length} kayıt</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Önceki sayfa"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E3E8F0] text-[#667085] hover:bg-[#F7F8FF]"
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
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E3E8F0] text-[#667085] hover:bg-[#F7F8FF]"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
