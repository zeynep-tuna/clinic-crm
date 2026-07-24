import { monthlyRevenue } from "@/data/reports";

function formatCurrency(amount: number) {
  return `₺${amount.toLocaleString("tr-TR")}`;
}

export default function MonthlyRevenueChart() {
  const maxAmount = Math.max(...monthlyRevenue.map((point) => point.amount));

  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#E3E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h3 className="text-base font-bold text-[#0B1F55]">Aylık Gelir Raporu</h3>

      <div className="mt-8 flex h-56 flex-1 items-end justify-between gap-3">
        {monthlyRevenue.map((point) => (
          <div key={point.month} className="flex h-full flex-1 flex-col items-center justify-end">
            <span className="mb-2 text-xs font-semibold text-[#0B1F55]">
              {formatCurrency(point.amount)}
            </span>
            <div
              className="w-full max-w-10 rounded-t-md bg-[#5B4DE3]"
              style={{ height: `${(point.amount / maxAmount) * 100}%` }}
            />
            <span className="mt-2 text-xs text-[#667085]">{point.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
