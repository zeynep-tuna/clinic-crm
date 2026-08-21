import Link from "next/link";
import type { Payment } from "@/lib/payments-api";

function formatCurrency(amount: number) {
  return `₺${amount.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function sumAmount(payments: Payment[]) {
  return payments.reduce((total, payment) => {
    const value = Number(payment.amount);
    return total + (Number.isFinite(value) ? value : 0);
  }, 0);
}

interface PaymentSummaryProps {
  payments: Payment[];
}

export default function PaymentSummary({ payments }: PaymentSummaryProps) {
  const activePayments = payments.filter((payment) => payment.isActive);

  const cash = sumAmount(activePayments.filter((payment) => payment.paymentMethod === "CASH"));
  const card = sumAmount(activePayments.filter((payment) => payment.paymentMethod === "CARD"));
  const bankTransfer = sumAmount(activePayments.filter((payment) => payment.paymentMethod === "BANK_TRANSFER"));
  const total = cash + card + bankTransfer;

  const legend = [
    { label: "Nakit", amount: cash, dotClass: "bg-[#5B4DE3]" },
    { label: "Kart", amount: card, dotClass: "bg-[#16A34A]" },
    { label: "Havale / Banka Transferi", amount: bankTransfer, dotClass: "bg-[#F59E0B]" },
  ];

  const cashEnd = total > 0 ? (cash / total) * 100 : 0;
  const cardEnd = cashEnd + (total > 0 ? (card / total) * 100 : 0);

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#0B1F55]">Ödeme Özeti</h3>
        <Link
          href="/payments"
          className="flex items-center gap-1.5 rounded-xl border border-[#EAF0F8] px-3 py-1.5 text-sm font-medium text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </Link>
      </div>

      {total === 0 ? (
        <p className="mt-5 py-6 text-center text-sm text-[#667085]">Henüz aktif ödeme kaydı bulunmuyor.</p>
      ) : (
        <div className="mt-5 flex items-center gap-5">
          <div
            className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(#5B4DE3 0% ${cashEnd}%, #16A34A ${cashEnd}% ${cardEnd}%, #F59E0B ${cardEnd}% 100%)`,
            }}
          >
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white text-center">
              <p className="text-sm font-bold text-[#0B1F55]">{formatCurrency(total)}</p>
              <p className="mt-0.5 text-[10px] text-[#667085]">Toplam Tahsilat</p>
            </div>
          </div>

          <ul className="flex-1 space-y-3">
            {legend.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-[#0B1F55]">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.dotClass}`} />
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-[#0B1F55]">{formatCurrency(item.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
