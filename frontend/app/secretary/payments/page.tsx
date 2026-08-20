"use client";

import { useCallback, useEffect, useState } from "react";
import SecretaryPaymentSummaryCards from "@/components/secretary/SecretaryPaymentSummaryCards";
import SecretaryPaymentsTable, { type FilterValue } from "@/components/secretary/SecretaryPaymentsTable";
import AddSecretaryPaymentModal from "@/components/secretary/AddSecretaryPaymentModal";
import { listPayments, type Payment } from "@/lib/payments-api";

export default function SecretaryPaymentsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPayments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await listPayments({ includeInactive: true });
      setPayments(data);
    } catch {
      setError("Ödemeler yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F55]">Ödemeler</h1>
          <p className="mt-1 text-sm text-[#667085]">
            Klinik ödeme kayıtlarını görüntüleyin ve ödeme durumlarını takip edin.
          </p>
        </div>

        <AddSecretaryPaymentModal onCreated={loadPayments} />
      </div>

      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Ödemeler yükleniyor...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">{error}</p>
          <button
            type="button"
            onClick={loadPayments}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <SecretaryPaymentSummaryCards
            payments={payments}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <SecretaryPaymentsTable
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            payments={payments}
            onRefresh={loadPayments}
          />
        </>
      )}
    </div>
  );
}
