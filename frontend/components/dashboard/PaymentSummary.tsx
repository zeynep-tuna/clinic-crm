import { paymentSummary } from "@/data/dashboard";

function formatCurrency(amount: number) {
  return `₺${amount.toLocaleString("en-US")}`;
}

export default function PaymentSummary() {
  const { collected, pending, refunded } = paymentSummary;
  const total = collected + pending + refunded;

  const collectedEnd = (collected / total) * 100;
  const pendingEnd = collectedEnd + (pending / total) * 100;

  const legend = [
    { label: "Tahsil Edilen", amount: collected, dotClass: "bg-[#5B4DE3]" },
    { label: "Bekleyen", amount: pending, dotClass: "bg-[#16A34A]" },
    { label: "İade Edilen", amount: refunded, dotClass: "bg-[#F59E0B]" },
  ];

  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#0B1F55]">Ödeme Özeti</h3>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl border border-[#E3E8F0] px-3 py-1.5 text-sm font-medium text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
        >
          Bu Ay
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      <div className="mt-5 flex items-center gap-5">
        <div
          className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(#5B4DE3 0% ${collectedEnd}%, #16A34A ${collectedEnd}% ${pendingEnd}%, #F59E0B ${pendingEnd}% 100%)`,
          }}
        >
          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white text-center">
            <p className="text-sm font-bold text-[#0B1F55]">{formatCurrency(total)}</p>
            <p className="mt-0.5 text-[10px] text-[#667085]">Toplam Gelir</p>
          </div>
        </div>

        <ul className="flex-1 space-y-3">
          {legend.map((item) => (
            <li key={item.label} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm text-[#0B1F55]">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.dotClass}`} />
                {item.label}
              </span>
              <span className="text-sm font-semibold text-[#0B1F55]">
                {formatCurrency(item.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
