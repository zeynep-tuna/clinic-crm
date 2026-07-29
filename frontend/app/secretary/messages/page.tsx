"use client";

import { useState } from "react";
import SecretaryMessageSummaryCards from "@/components/secretary/SecretaryMessageSummaryCards";
import SecretaryMessagesPanel, { type FilterValue } from "@/components/secretary/SecretaryMessagesPanel";

export default function SecretaryMessagesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[20px] border border-[#E3E8F0] bg-white px-6 py-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
        <div className="flex items-center gap-1.5 text-xs text-[#98A2B3]">
          <span>ClinicCRM</span>
          <span className="text-[#D0D5DD]">&gt;</span>
          <span className="font-medium text-[#0B1F55]">Mesajlar</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F55]">Mesajlar</h1>
            <p className="mt-1 text-sm text-[#667085]">
              Hasta, doktor ve klinik içi iletişimi tek ekrandan yönetin.
            </p>
            <p className="mt-0.5 text-xs text-[#667085]">
              Öncelikli konuşmaları takip edin ve hızlı yanıt verin.
            </p>
          </div>

          <button
            type="button"
            className="flex h-11 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.06)] transition-colors hover:bg-[#4c3fd1]"
          >
            + Yeni Mesaj
          </button>
        </div>
      </div>

      <SecretaryMessageSummaryCards activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <SecretaryMessagesPanel activeFilter={activeFilter} onFilterChange={setActiveFilter} />
    </div>
  );
}
