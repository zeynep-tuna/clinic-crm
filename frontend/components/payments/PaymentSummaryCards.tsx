import { paymentOverview } from "@/data/payments";

function formatCurrency(amount: number) {
  return `₺${amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v11a2 2 0 0 0 2 2h12a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-4a2 2 0 1 0 0 4h5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3L15.5 9.5" />
    </svg>
  );
}

function RefundIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 1 1 2.5 5.8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v-4h4" />
    </svg>
  );
}

function TrendSparkline({ colorClass }: { colorClass: string }) {
  return (
    <svg viewBox="0 0 60 24" fill="none" stroke="currentColor" strokeWidth={2} className={`h-6 w-14 ${colorClass}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 18l12-4 10 6 12-12 10 4 12-10" />
    </svg>
  );
}

const cards = [
  {
    id: "total-revenue",
    title: "Toplam Gelir",
    value: paymentOverview.totalRevenue,
    icon: <WalletIcon />,
    colorClass: "text-[#5B4DE3]",
    valueColorClass: "text-[#0B1F55]",
    bgClass: "bg-[#EEF0FF]",
  },
  {
    id: "pending-amount",
    title: "Bekleyen Ödeme",
    value: paymentOverview.pendingAmount,
    icon: <ClockIcon />,
    colorClass: "text-[#F59E0B]",
    valueColorClass: "text-[#F59E0B]",
    bgClass: "bg-[#FEF3C7]",
  },
  {
    id: "completed-amount",
    title: "Tamamlanan",
    value: paymentOverview.completedAmount,
    icon: <CheckCircleIcon />,
    colorClass: "text-[#16A34A]",
    valueColorClass: "text-[#16A34A]",
    bgClass: "bg-[#DCFCE7]",
  },
  {
    id: "refunded-amount",
    title: "İade Edilen",
    value: paymentOverview.refundedAmount,
    icon: <RefundIcon />,
    colorClass: "text-[#EF4444]",
    valueColorClass: "text-[#EF4444]",
    bgClass: "bg-[#FEE2E2]",
  },
];

export default function PaymentSummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex items-center justify-between gap-4 rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]"
        >
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.bgClass} ${card.colorClass}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-[#667085]">{card.title}</p>
              <p className={`mt-1 text-xl font-bold ${card.valueColorClass}`}>{formatCurrency(card.value)}</p>
            </div>
          </div>

          <TrendSparkline colorClass={card.colorClass} />
        </div>
      ))}
    </div>
  );
}
