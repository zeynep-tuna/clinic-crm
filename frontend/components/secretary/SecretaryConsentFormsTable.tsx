"use client";

import { useMemo, useState } from "react";
import {
  secretaryConsentFormRows,
  type SecretaryConsentFormStatus,
  type SecretaryConsentFormType,
} from "@/data/secretaryConsentForms";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import AddSecretaryConsentFormModal from "@/components/secretary/AddSecretaryConsentFormModal";

export type FilterValue = "Tümü" | SecretaryConsentFormStatus;

const filters: FilterValue[] = ["Tümü", "İmzalandı", "Bekliyor", "Eksik"];

const statusBadgeClass: Record<SecretaryConsentFormStatus, string> = {
  İmzalandı: "bg-[#DCFCE7] text-[#16A34A]",
  Bekliyor: "bg-[#FEF3C7] text-[#F59E0B]",
  Eksik: "bg-[#FEE2E2] text-[#EF4444]",
};

const formTypeBadgeClass: Record<SecretaryConsentFormType, string> = {
  Tedavi: "bg-[#EEF0FF] text-[#5B4DE3]",
  İmplant: "bg-[#FEF3C7] text-[#F59E0B]",
  Ortodonti: "bg-[#CCFBF1] text-[#0F766E]",
  Cerrahi: "bg-[#FEE2E2] text-[#EF4444]",
  KVKK: "bg-[#DBEAFE] text-[#2563EB]",
  Muayene: "bg-[#DCFCE7] text-[#16A34A]",
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

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7h15M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2M18 7l-.7 12a1.5 1.5 0 0 1-1.5 1.4H8.2a1.5 1.5 0 0 1-1.5-1.4L6 7" />
    </svg>
  );
}

interface SecretaryConsentFormsTableProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export default function SecretaryConsentFormsTable({
  activeFilter,
  onFilterChange,
}: SecretaryConsentFormsTableProps) {
  const [search, setSearch] = useState("");
  const [formList, setFormList] = useState(secretaryConsentFormRows);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const filteredForms = useMemo(() => {
    const term = search.trim().toLowerCase();

    return formList.filter((form) => {
      const matchesFilter = activeFilter === "Tümü" || form.status === activeFilter;
      const matchesSearch =
        term === "" ||
        form.patientName.toLowerCase().includes(term) ||
        form.formName.toLowerCase().includes(term) ||
        form.formType.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter, formList]);

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
        {formList.length === 0 && (
          <EmptyState
            variant="empty"
            title="Henüz onam formu bulunmuyor"
            description="Diş tedavileri için dijital onam formları oluşturulduğunda burada takip edebilirsiniz."
            action={<AddSecretaryConsentFormModal />}
          />
        )}

        {formList.length > 0 && filteredForms.length === 0 && (
          <EmptyState
            variant="search"
            title="Eşleşen onam formu bulunamadı"
            description="Hasta adı, form türü veya imza durumunu değiştirerek tekrar deneyin."
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
        <table className="w-full min-w-230 text-left">
          <thead>
            <tr className="border-b border-[#EAF0F8] text-xs font-semibold tracking-wide text-[#667085] uppercase">
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
                  <span className="inline-block rounded-full border border-[#EAF0F8] bg-[#F7F8FF] px-3 py-1 text-xs font-medium text-[#667085]">
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
                  <div className="flex items-center gap-3 text-[#667085]">
                    <button
                      type="button"
                      aria-label="İndir"
                      onClick={(event) => event.stopPropagation()}
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                    >
                      <DownloadIcon />
                    </button>
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
                    <button
                      type="button"
                      aria-label="Onam formunu sil"
                      onClick={(event) => {
                        event.stopPropagation();
                        setPendingDeleteId(form.id);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#FEE2E2] hover:text-[#EF4444]"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Onam formunu silmek istiyor musunuz?"
        description="Seçili dijital onam formu listeden kaldırılacak. İmzalı formlar için gerçek sistemlerde ayrıca yetki kontrolü gerekir."
        confirmLabel="Onam Formunu Sil"
        variant="danger"
        onConfirm={() => {
          setFormList((prev) => prev.filter((form) => form.id !== pendingDeleteId));
          setPendingDeleteId(null);
        }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
