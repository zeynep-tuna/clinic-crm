import type { ConsentForm } from "@/lib/consent-forms-api";
import type { FilterValue } from "@/components/doctor/DoctorConsentFormsTable";

type SummaryIcon = "total" | "signed" | "pending" | "missing";

interface SummaryCard {
  id: string;
  icon: SummaryIcon;
  title: string;
  value: number;
}

const colorByCardId: Record<string, string> = {
  total: "bg-[#EEF0FF] text-[#5B4DE3]",
  signed: "bg-[#DCFCE7] text-[#16A34A]",
  pending: "bg-[#FEF3C7] text-[#F59E0B]",
  missing: "bg-[#FEE2E2] text-[#EF4444]",
};

const filterByCardId: Record<string, FilterValue> = {
  total: "Tümü",
  signed: "İmzalandı",
  pending: "Bekliyor",
  missing: "Eksik",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "total":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
          />
          <path strokeLinecap="round" d="M9 11h6M9 15h6" />
        </svg>
      );
    case "signed":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
        </svg>
      );
    case "pending":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
        </svg>
      );
    case "missing":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5 21 19.5H3L12 3.5Z" />
          <path strokeLinecap="round" d="M12 10v3.5" />
          <circle cx="12" cy="16.3" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

interface DoctorConsentFormSummaryCardsProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  consentForms: ConsentForm[];
}

export default function DoctorConsentFormSummaryCards({
  activeFilter,
  onFilterChange,
  consentForms,
}: DoctorConsentFormSummaryCardsProps) {
  const activeForms = consentForms.filter((form) => form.isActive);

  const totalCount = activeForms.length;
  const signedCount = activeForms.filter((form) => form.status === "SIGNED").length;
  const pendingCount = activeForms.filter((form) => form.status === "PENDING").length;
  const missingCount = activeForms.filter((form) => form.status === "MISSING").length;

  const cards: SummaryCard[] = [
    { id: "total", icon: "total", title: "Toplam Form", value: totalCount },
    { id: "signed", icon: "signed", title: "İmzalanan", value: signedCount },
    { id: "pending", icon: "pending", title: "Bekleyen", value: pendingCount },
    { id: "missing", icon: "missing", title: "Eksik", value: missingCount },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EEF2F8]">
      {cards.map((card) => {
        const filterValue = filterByCardId[card.id] ?? "Tümü";
        const isSelected = activeFilter === filterValue;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onFilterChange(filterValue)}
            className={`flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors sm:px-5 ${
              isSelected ? "bg-[#F7F8FF]" : "hover:bg-[#F7F8FF]"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colorByCardId[card.id]}`}
            >
              <SummaryIconGlyph icon={card.icon} />
            </span>
            <div>
              <p className="text-xl font-bold text-[#0B1F55]">{card.value}</p>
              <p className="text-xs text-[#667085]">{card.title}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
