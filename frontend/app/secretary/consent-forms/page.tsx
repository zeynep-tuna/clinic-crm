"use client";

import { useState } from "react";
import SecretaryConsentFormSummaryCards from "@/components/secretary/SecretaryConsentFormSummaryCards";
import SecretaryConsentFormsTable, { type FilterValue } from "@/components/secretary/SecretaryConsentFormsTable";

export default function SecretaryConsentFormsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F55]">Onam Formları</h1>
          <p className="mt-1 text-sm text-[#667085]">
            Hasta onam formlarını görüntüleyin, takip edin ve yönetin.
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
        >
          + Yeni Onam Formu Ekle
        </button>
      </div>

      <SecretaryConsentFormSummaryCards activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <SecretaryConsentFormsTable activeFilter={activeFilter} onFilterChange={setActiveFilter} />
    </div>
  );
}
