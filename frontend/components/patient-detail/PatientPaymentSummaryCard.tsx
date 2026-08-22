import type { Payment } from "@/lib/payments-api";

function formatTRY(amount: number) {
  return `₺${amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function sumAmount(payments: Payment[]) {
  return payments.reduce((total, payment) => {
    const value = Number(payment.amount);
    return total + (Number.isFinite(value) ? value : 0);
  }, 0);
}

interface PatientPaymentSummaryCardProps {
  payments: Payment[];
}

export default function PatientPaymentSummaryCard({ payments }: PatientPaymentSummaryCardProps) {
  const activePayments = payments.filter((payment) => payment.isActive);
  const total = sumAmount(activePayments);
  const cash = sumAmount(activePayments.filter((payment) => payment.paymentMethod === "CASH"));
  const card = sumAmount(activePayments.filter((payment) => payment.paymentMethod === "CARD"));
  const bankTransfer = sumAmount(
    activePayments.filter((payment) => payment.paymentMethod === "BANK_TRANSFER")
  );

  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-7 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#5B4DE3]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <circle cx="12" cy="12" r="2.5" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-[#0B1F55]">Ödeme Özeti</h3>
      </div>

      {activePayments.length === 0 ? (
        <p className="mt-5 flex-1 py-6 text-center text-sm text-[#667085]">
          Bu hastaya ait ödeme kaydı bulunmuyor.
        </p>
      ) : (
        <>
          <div className="mt-5 rounded-2xl border border-[#EAF0F8] p-4">
            <p className="text-xs text-[#667085]">Toplam Tahsilat</p>
            <p className="mt-2 text-lg font-bold text-[#0B1F55]">{formatTRY(total)}</p>
          </div>

          <div className="mt-4 grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#EAF0F8] p-4">
              <p className="text-xs text-[#667085]">Nakit</p>
              <p className="mt-2 text-lg font-bold text-[#0B1F55]">{formatTRY(cash)}</p>
            </div>

            <div className="rounded-2xl border border-[#EAF0F8] p-4">
              <p className="text-xs text-[#667085]">Kart</p>
              <p className="mt-2 text-lg font-bold text-[#0B1F55]">{formatTRY(card)}</p>
            </div>

            <div className="rounded-2xl border border-[#EAF0F8] p-4">
              <p className="text-xs text-[#667085]">Havale</p>
              <p className="mt-2 text-lg font-bold text-[#0B1F55]">{formatTRY(bankTransfer)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
