"use client";

import { useState } from "react";
import SecretaryPaymentSummaryCards from "@/components/secretary/SecretaryPaymentSummaryCards";
import SecretaryPaymentsTable, { type FilterValue } from "@/components/secretary/SecretaryPaymentsTable";

export default function SecretaryPaymentsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F55]">Ödemeler</h1>
          <p className="mt-1 text-sm text-[#667085]">
            Klinik ödeme kayıtlarını görüntüleyin ve ödeme durumlarını takip edin.
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-colors hover:bg-[#4c3fd1]"
        >
          + Yeni Ödeme Ekle
        </button>
      </div>

      <SecretaryPaymentSummaryCards activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <SecretaryPaymentsTable activeFilter={activeFilter} onFilterChange={setActiveFilter} />
    </div>
  );
}
