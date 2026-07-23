"use client";

import { useMemo, useState } from "react";
import { consentForms, type ConsentFormStatus, type ConsentFormType } from "@/data/consent-forms";

type FilterValue = "Tümü" | ConsentFormStatus;

const filters: FilterValue[] = ["Tümü", "İmzalandı", "Bekliyor", "Eksik"];

const statusBadgeClass: Record<ConsentFormStatus, string> = {
  İmzalandı: "bg-[#DCFCE7] text-[#16A34A]",
  Bekliyor: "bg-[#FEF3C7] text-[#F59E0B]",
  Eksik: "bg-[#FEE2E2] text-[#EF4444]",
};

const formTypeBadgeClass: Record<ConsentFormType, string> = {
  Tedavi: "bg-[#EEF0FF] text-[#5B4DE3]",
  KVKK: "bg-[#DBEAFE] text-[#2563EB]",
  Cerrahi: "bg-[#FEE2E2] text-[#EF4444]",
  Görüntüleme: "bg-[#FEF3C7] text-[#F59E0B]",
  Muayene: "bg-[#DCFCE7] text-[#16A34A]",
};

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
      <circle cx="12" cy="12" r="2.75" />
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

export default function ConsentFormsTable() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");

  const filteredForms = useMemo(() => {
    const term = search.trim().toLowerCase();

    return consentForms.filter((form) => {
      const matchesFilter = activeFilter === "Tümü" || form.status === activeFilter;
      const matchesSearch =
        term === "" ||
        form.patientName.toLowerCase().includes(term) ||
        form.formTitle.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
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
            placeholder="Form ara..."
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
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-[#EEF0FF] bg-[#EEF0FF] text-[#5B4DE3]"
                    : "border-[#E3E8F0] text-[#0B1F55] hover:bg-[#F7F8FF]"
                }`}
              >
                {filter}
              </button>
            );
          })}

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-[#E3E8F0] px-4 py-2 text-sm font-medium text-[#0B1F55] hover:bg-[#F7F8FF]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16l-6 7.5V19l-4 2v-8.5Z" />
            </svg>
            Filtrele
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[960px] table-fixed text-left">
          <thead>
            <tr className="border-b border-[#E3E8F0] text-sm text-[#667085]">
              <th className="w-52 pb-3 pr-4 font-medium">Hasta Adı</th>
              <th className="w-56 pb-3 pr-4 font-medium">Form Adı</th>
              <th className="w-32 pb-3 pr-4 font-medium">Form Türü</th>
              <th className="w-28 pb-3 pr-4 font-medium">Tarih</th>
              <th className="w-32 pb-3 pr-4 font-medium">Durum</th>
              <th className="w-24 pb-3 pr-4 font-medium">Dosya</th>
              <th className="w-28 pb-3 font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filteredForms.map((form) => (
              <tr key={form.id} className="border-b border-[#E3E8F0]/60 last:border-0">
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
                      {form.patientName.charAt(0)}
                    </div>
                    <span className="truncate text-sm font-medium text-[#0B1F55]">
                      {form.patientName}
                    </span>
                  </div>
                </td>
                <td className="truncate py-5 pr-4 text-sm text-[#0B1F55]">{form.formTitle}</td>
                <td className="py-5 pr-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${formTypeBadgeClass[form.formType]}`}
                  >
                    {form.formType}
                  </span>
                </td>
                <td className="py-5 pr-4 text-sm text-[#0B1F55]">{form.date}</td>
                <td className="py-5 pr-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusBadgeClass[form.status]}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {form.status}
                  </span>
                </td>
                <td className="py-5 pr-4">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-[#FEE2E2] px-2.5 py-1 text-xs font-semibold text-[#EF4444]">
                    <PdfIcon />
                    PDF
                  </span>
                </td>
                <td className="py-5">
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
            Aramanızla eşleşen form bulunamadı.
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#E3E8F0] pt-6">
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
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E3E8F0] text-sm font-medium text-[#0B1F55] hover:bg-[#F7F8FF]"
          >
            2
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E3E8F0] text-sm font-medium text-[#0B1F55] hover:bg-[#F7F8FF]"
          >
            3
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
