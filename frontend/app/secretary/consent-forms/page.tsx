"use client";

import { useCallback, useEffect, useState } from "react";
import SecretaryConsentFormSummaryCards from "@/components/secretary/SecretaryConsentFormSummaryCards";
import SecretaryConsentFormsTable, { type FilterValue } from "@/components/secretary/SecretaryConsentFormsTable";
import AddSecretaryConsentFormModal from "@/components/secretary/AddSecretaryConsentFormModal";
import { listConsentForms, type ConsentForm } from "@/lib/consent-forms-api";

export default function SecretaryConsentFormsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [consentForms, setConsentForms] = useState<ConsentForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadConsentForms = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await listConsentForms({ includeInactive: true });
      setConsentForms(data);
    } catch {
      setError("Onam formları yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConsentForms();
  }, [loadConsentForms]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F55]">Onam Formları</h1>
          <p className="mt-1 text-sm text-[#667085]">
            Hasta onam formlarını görüntüleyin, takip edin ve yönetin.
          </p>
        </div>

        <AddSecretaryConsentFormModal onCreated={loadConsentForms} />
      </div>

      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Onam formları yükleniyor...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">{error}</p>
          <button
            type="button"
            onClick={loadConsentForms}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <SecretaryConsentFormSummaryCards
            consentForms={consentForms}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <SecretaryConsentFormsTable
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            consentForms={consentForms}
            onRefresh={loadConsentForms}
          />
        </>
      )}
    </div>
  );
}
