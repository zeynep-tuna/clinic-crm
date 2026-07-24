import { reportSummaryStats, type ReportSummaryStat } from "@/data/reports";

function formatValue(stat: ReportSummaryStat) {
  if (stat.format === "currency") {
    return `₺${stat.value.toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  return stat.value.toLocaleString("tr-TR");
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v11a2 2 0 0 0 2 2h12a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-4a2 2 0 1 0 0 4h5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <circle cx="9" cy="8" r="3" />
      <path strokeLinecap="round" d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
      <path strokeLinecap="round" d="M18 8v5M15.5 10.5h5" />
    </svg>
  );
}

function DoctorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v5a4 4 0 0 0 8 0V3M12 15v2m0 0a4 4 0 1 0 0 4.001" />
    </svg>
  );
}

const icons = {
  "total-revenue": <WalletIcon />,
  "total-appointments": <CalendarIcon />,
  "new-patients": <UserPlusIcon />,
  "active-doctors": <DoctorIcon />,
} as const;

export default function ReportSummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {reportSummaryStats.map((stat) => (
        <div
          key={stat.id}
          className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#667085]">{stat.title}</p>
              <p className="mt-2 text-2xl font-bold text-[#0B1F55]">{formatValue(stat)}</p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#5B4DE3]">
              {icons[stat.id as keyof typeof icons]}
            </div>
          </div>

          <p className="mt-4 flex items-center gap-1 text-xs font-medium text-[#16A34A]">
            <span>↑</span>
            <span>{stat.trendPercent}% geçen aya göre</span>
          </p>
        </div>
      ))}
    </div>
  );
}
