"use client";

import { useMemo, useState } from "react";
import type { ConsentForm, ConsentFormStatus } from "@/lib/consent-forms-api";
import EmptyState from "@/components/common/EmptyState";
import AddSecretaryConsentFormModal from "@/components/secretary/AddSecretaryConsentFormModal";

type UiStatus = "İmzalandı" | "Bekliyor" | "Eksik";

export type FilterValue = "Tümü" | UiStatus;

const filters: FilterValue[] = ["Tümü", "İmzalandı", "Bekliyor", "Eksik"];

const statusBadgeClass: Record<UiStatus, string> = {
  İmzalandı: "bg-[#DCFCE7] text-[#16A34A]",
  Bekliyor: "bg-[#FEF3C7] text-[#F59E0B]",
  Eksik: "bg-[#FEE2E2] text-[#EF4444]",
};

const STATUS_LABELS: Record<ConsentFormStatus, UiStatus> = {
  SIGNED: "İmzalandı",
  PENDING: "Bekliyor",
  MISSING: "Eksik",
};

type RecordStatus = "Aktif" | "Pasif";

const RECORD_STATUS_BADGE_CLASS: Record<RecordStatus, string> = {
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

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function getAvatarColor(id: string) {
  const sum = id.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return avatarPalette[sum % avatarPalette.length];
}

function getPatientName(form: ConsentForm) {
  return `${form.patient.firstName} ${form.patient.lastName}`.trim();
}

function getStatusLabel(form: ConsentForm): UiStatus {
  return STATUS_LABELS[form.status];
}

function getRecordStatusLabel(form: ConsentForm): RecordStatus {
  return form.isActive ? "Aktif" : "Pasif";
}

function formatCreatedDate(createdAt: string) {
  return dateFormatter.format(new Date(createdAt));
}

interface SecretaryConsentFormsTableProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  consentForms: ConsentForm[];
  onRefresh: () => void | Promise<void>;
}

export default function SecretaryConsentFormsTable({
  activeFilter,
  onFilterChange,
  consentForms,
  onRefresh,
}: SecretaryConsentFormsTableProps) {
  const [search, setSearch] = useState("");

  const filteredForms = useMemo(() => {
    const term = search.trim().toLowerCase();

    return consentForms.filter((form) => {
      const status = getStatusLabel(form);
      const matchesFilter = activeFilter === "Tümü" || status === activeFilter;
      const matchesSearch =
        term === "" ||
        getPatientName(form).toLowerCase().includes(term) ||
        form.title.toLowerCase().includes(term) ||
        form.formType.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter, consentForms]);

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
            placeholder="Bu listede hasta, form veya tür ara..."
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
        {consentForms.length === 0 && (
          <EmptyState
            variant="empty"
            title="Henüz onam formu bulunmuyor"
            description="Diş tedavileri için dijital onam formları oluşturulduğunda burada takip edebilirsiniz."
            action={<AddSecretaryConsentFormModal onCreated={onRefresh} />}
          />
        )}

        {consentForms.length > 0 && filteredForms.length === 0 && (
          <EmptyState
            variant="search"
            title="Eşleşen onam formu bulunamadı"
            description="Hasta adı, form türü veya seçili filtreyi değiştirerek tekrar deneyin."
            action={
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  onFilterChange("Tümü");
                }}
                className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
              >
                Filtreleri temizle
              </button>
            }
          />
        )}

        {filteredForms.length > 0 && (
        <table className="w-full min-w-220 text-left">
          <thead>
            <tr className="border-b border-[#EAF0F8] text-xs font-semibold tracking-wide text-[#667085] uppercase">
              <th className="pb-2.5 font-medium">Hasta</th>
              <th className="pb-2.5 font-medium">Form Adı</th>
              <th className="pb-2.5 font-medium">Form Türü</th>
              <th className="pb-2.5 font-medium">Oluşturulma Tarihi</th>
              <th className="pb-2.5 font-medium">Durum</th>
              <th className="pb-2.5 font-medium">Kayıt Durumu</th>
            </tr>
          </thead>
          <tbody>
            {filteredForms.map((form) => {
              const patientName = getPatientName(form);
              const status = getStatusLabel(form);
              const recordStatus = getRecordStatusLabel(form);

              return (
              <tr
                key={form.id}
                onClick={() => console.log("Onam formu detayına git:", form.id)}
                className="cursor-pointer border-b border-[#EAF0F8]/60 transition-colors last:border-0 hover:bg-[#F8F9FF]"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarColor(form.id)}`}
                    >
                      {patientName.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-[#0B1F55]">{patientName}</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-[#0B1F55]">{form.title}</td>
                <td className="py-4">
                  <span className="inline-block rounded-full border border-[#EAF0F8] bg-[#F7F8FF] px-3 py-1 text-xs font-medium text-[#667085]">
                    {form.formType}
                  </span>
                </td>
                <td className="py-4 text-sm text-[#0B1F55]">{formatCreatedDate(form.createdAt)}</td>
                <td className="py-4">
                  <span
                    className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusBadgeClass[status]}`}
                  >
                    {status}
                  </span>
                </td>
                <td className="py-4">
                  <span
                    className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold ${RECORD_STATUS_BADGE_CLASS[recordStatus]}`}
                  >
                    {recordStatus}
                  </span>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#EAF0F8] pt-5">
        <p className="text-sm text-[#667085]">Toplam {filteredForms.length} kayıt</p>

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
