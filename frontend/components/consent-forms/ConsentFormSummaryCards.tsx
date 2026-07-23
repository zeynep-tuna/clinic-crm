import { consentFormOverview } from "@/data/consent-forms";

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path strokeLinecap="round" d="M8.5 10h7M8.5 13.5h7M8.5 17h4" />
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

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" d="M12 8v5" />
      <circle cx="12" cy="16" r="0.5" fill="currentColor" />
    </svg>
  );
}

const cards = [
  {
    id: "total",
    title: "Toplam Form",
    value: consentFormOverview.total,
    icon: <DocumentIcon />,
    colorClass: "text-[#5B4DE3]",
    bgClass: "bg-[#EEF0FF]",
  },
  {
    id: "signed",
    title: "İmzalanan",
    value: consentFormOverview.signed,
    icon: <CheckCircleIcon />,
    colorClass: "text-[#16A34A]",
    bgClass: "bg-[#DCFCE7]",
  },
  {
    id: "pending",
    title: "Bekleyen",
    value: consentFormOverview.pending,
    icon: <ClockIcon />,
    colorClass: "text-[#F59E0B]",
    bgClass: "bg-[#FEF3C7]",
  },
  {
    id: "missing",
    title: "Eksik",
    value: consentFormOverview.missing,
    icon: <AlertIcon />,
    colorClass: "text-[#EF4444]",
    bgClass: "bg-[#FEE2E2]",
  },
];

export default function ConsentFormSummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex items-center gap-4 rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]"
        >
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.bgClass} ${card.colorClass}`}>
            {card.icon}
          </div>
          <div>
            <p className="text-sm text-[#667085]">{card.title}</p>
            <p className="mt-1 text-2xl font-bold text-[#0B1F55]">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
