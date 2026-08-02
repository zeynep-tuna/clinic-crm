import { monthlyRevenue } from "@/data/reports";

function formatCurrency(amount: number) {
  return `₺${amount.toLocaleString("tr-TR")}`;
}

export default function MonthlyRevenueChart() {
  const maxAmount = Math.max(...monthlyRevenue.map((point) => point.amount));

  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#0B1F55]">Aylık Gelir Raporu</h3>
        <span className="inline-flex items-center rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-semibold text-[#5B4DE3]">
          Son 6 ay
        </span>
      </div>

      <div className="relative mt-6 flex h-48 flex-1 items-end justify-between gap-3">
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-full flex-col justify-between">
          <span className="border-t border-[#EEF2F8]" />
          <span className="border-t border-[#EEF2F8]" />
          <span className="border-t border-[#EEF2F8]" />
          <span className="border-t border-[#EEF2F8]" />
        </div>

        {monthlyRevenue.map((point) => (
          <div key={point.month} className="relative z-10 flex h-full flex-1 flex-col items-center justify-end">
            <span className="mb-2 text-xs font-semibold text-[#0B1F55]">
              {formatCurrency(point.amount)}
            </span>
            <div
              className="w-full max-w-10 rounded-t-lg bg-[#5B4DE3]"
              style={{ height: `${(point.amount / maxAmount) * 100}%` }}
            />
            <span className="mt-2 text-xs text-[#667085]">{point.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
