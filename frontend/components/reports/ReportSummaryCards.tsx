export type ReportStatFormat = "currency" | "number";

export interface ReportSummaryStat {
  id: string;
  title: string;
  value: number;
  format: ReportStatFormat;
}

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

function PatientsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <circle cx="9" cy="8" r="3" />
      <path strokeLinecap="round" d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
      <path strokeLinecap="round" d="M15.5 5.5a3 3 0 0 1 0 5.8M18 19c-.4-2.3-1.5-4-3.2-4.8" />
    </svg>
  );
}

function DoctorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5v5.5a3.5 3.5 0 0 0 7 0V3.5" />
      <path strokeLinecap="round" d="M7 3.5H5.7M14 3.5h1.3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12v2.5a4.5 4.5 0 0 0 9 0v-1" />
      <circle cx="19.5" cy="13.5" r="1.5" />
    </svg>
  );
}

const icons = {
  "total-revenue": <WalletIcon />,
  "total-appointments": <CalendarIcon />,
  "active-patients": <PatientsIcon />,
  "active-doctors": <DoctorIcon />,
} as const;

interface ReportSummaryCardsProps {
  stats: ReportSummaryStat[];
}

export default function ReportSummaryCards({ stats }: ReportSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#667085]">{stat.title}</p>
              <p className="mt-1.5 text-2xl font-bold text-[#0B1F55]">{formatValue(stat)}</p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#5B4DE3]">
              {icons[stat.id as keyof typeof icons]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
