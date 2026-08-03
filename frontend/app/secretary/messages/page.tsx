"use client";

import { useState } from "react";
import SecretaryMessageSummaryCards from "@/components/secretary/SecretaryMessageSummaryCards";
import SecretaryMessagesPanel, { type FilterValue } from "@/components/secretary/SecretaryMessagesPanel";
import AddSecretaryMessageModal from "@/components/secretary/AddSecretaryMessageModal";

export default function SecretaryMessagesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[20px] border border-[#EAF0F8] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
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

          <AddSecretaryMessageModal />
        </div>
      </div>

      <SecretaryMessageSummaryCards activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <SecretaryMessagesPanel activeFilter={activeFilter} onFilterChange={setActiveFilter} />
    </div>
  );
}
