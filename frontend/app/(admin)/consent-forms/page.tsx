"use client";

import { useState } from "react";
import ConsentFormsTable from "@/components/consent-forms/ConsentFormsTable";
import AddConsentFormModal from "@/components/consent-forms/AddConsentFormModal";

export default function ConsentFormsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F55]">Onam Formları</h2>
          <p className="mt-2 text-sm text-[#667085]">
            Diş kliniğinizdeki dijital onam formlarını ve imza durumlarını takip edin.
          </p>
        </div>

        <AddConsentFormModal onCreated={() => setRefreshKey((key) => key + 1)} />
      </div>

      <ConsentFormsTable refreshKey={refreshKey} />
    </div>
  );
}
