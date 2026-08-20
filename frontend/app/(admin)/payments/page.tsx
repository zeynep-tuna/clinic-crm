"use client";

import { useState } from "react";
import PaymentsTable from "@/components/payments/PaymentsTable";
import AddPaymentModal from "@/components/payments/AddPaymentModal";

export default function PaymentsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F55]">Ödemeler</h2>
          <p className="mt-2 text-sm text-[#667085]">
            Diş kliniğinizdeki hasta ödemelerini, tahsilat durumlarını ve iade süreçlerini takip edin.
          </p>
        </div>

        <AddPaymentModal onCreated={() => setRefreshKey((key) => key + 1)} />
      </div>

      <PaymentsTable refreshKey={refreshKey} />
    </div>
  );
}
