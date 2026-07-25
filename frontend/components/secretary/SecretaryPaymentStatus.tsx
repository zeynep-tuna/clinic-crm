import { secretaryPaymentStatus } from "@/data/secretaryDashboard";

function formatCurrency(amount: number) {
  return `₺${amount.toLocaleString("tr-TR")}`;
}

export default function SecretaryPaymentStatus() {
  const total = secretaryPaymentStatus.reduce((sum, item) => sum + item.amount, 0);
  const radius = 60;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * radius;

  const segments = secretaryPaymentStatus.reduce<
    { label: string; color: string; dash: number; offset: number }[]
  >((accumulated, item) => {
    const previous = accumulated[accumulated.length - 1];
    const offset = previous ? previous.offset + previous.dash : 0;
    const dash = (item.amount / total) * circumference;
    return [...accumulated, { label: item.label, color: item.color, dash, offset }];
  }, []);

  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Ödeme Durumu Özeti</h2>

      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-40 w-40 shrink-0">
          <svg viewBox="0 0 160 160" className="h-40 w-40 -rotate-90">
            <circle cx="80" cy="80" r={radius} fill="none" stroke="#F1F2F6" strokeWidth={strokeWidth} />
            {segments.map((segment) => (
              <circle
                key={segment.label}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segment.dash} ${circumference - segment.dash}`}
                strokeDashoffset={-segment.offset}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-[#667085]">Toplam</p>
            <p className="text-base font-bold text-[#0B1F55]">{formatCurrency(total)}</p>
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col gap-2.5">
          {secretaryPaymentStatus.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[#667085]">{item.label}</span>
              </div>
              <span className="font-semibold text-[#0B1F55]">{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
