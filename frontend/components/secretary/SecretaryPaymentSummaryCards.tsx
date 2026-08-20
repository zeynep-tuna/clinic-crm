import type { Payment } from "@/lib/payments-api";
import type { FilterValue } from "@/components/secretary/SecretaryPaymentsTable";

type SummaryIcon = "total" | "cash" | "card" | "bank-transfer";

interface SummaryCard {
  id: string;
  icon: SummaryIcon;
  title: string;
  value: number;
}

const colorByCardId: Record<string, string> = {
  total: "bg-[#EEF0FF] text-[#5B4DE3]",
  cash: "bg-[#DCFCE7] text-[#16A34A]",
  card: "bg-[#FEF3C7] text-[#F59E0B]",
  "bank-transfer": "bg-[#FEE2E2] text-[#EF4444]",
};

const filterByCardId: Record<string, FilterValue> = {
  total: "Tümü",
  cash: "CASH",
  card: "CARD",
  "bank-transfer": "BANK_TRANSFER",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "total":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "cash":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
        </svg>
      );
    case "card":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
        </svg>
      );
    case "bank-transfer":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 0 1 13.66-5.66M20 12a8 8 0 0 1-13.66 5.66" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 3v3.5h-3.5M7 21v-3.5h3.5" />
        </svg>
      );
    default:
      return null;
  }
}

interface SecretaryPaymentSummaryCardsProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  payments: Payment[];
}

export default function SecretaryPaymentSummaryCards({
  activeFilter,
  onFilterChange,
  payments,
}: SecretaryPaymentSummaryCardsProps) {
  const activePayments = payments.filter((payment) => payment.isActive);

  const sumAmount = (list: Payment[]) =>
    list.reduce((total, payment) => {
      const value = Number(payment.amount);
      return total + (Number.isFinite(value) ? value : 0);
    }, 0);

  const totalAmount = sumAmount(activePayments);
  const cashAmount = sumAmount(activePayments.filter((payment) => payment.paymentMethod === "CASH"));
  const cardAmount = sumAmount(activePayments.filter((payment) => payment.paymentMethod === "CARD"));
  const bankTransferAmount = sumAmount(
    activePayments.filter((payment) => payment.paymentMethod === "BANK_TRANSFER")
  );

  const cards: SummaryCard[] = [
    { id: "total", icon: "total", title: "Toplam Tahsilat", value: totalAmount },
    { id: "cash", icon: "cash", title: "Nakit Toplamı", value: cashAmount },
    { id: "card", icon: "card", title: "Kart Toplamı", value: cardAmount },
    { id: "bank-transfer", icon: "bank-transfer", title: "Havale Toplamı", value: bankTransferAmount },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EAF0F8]/60">
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
              <p className="text-xl font-bold text-[#0B1F55]">
                {`₺${card.value.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
              <p className="text-xs text-[#667085]">{card.title}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
