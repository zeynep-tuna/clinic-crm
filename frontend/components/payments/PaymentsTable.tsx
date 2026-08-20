"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { listPayments, type Payment, type PaymentMethod } from "@/lib/payments-api";
import EmptyState from "@/components/common/EmptyState";
import AddPaymentModal from "@/components/payments/AddPaymentModal";

type FilterValue = "Tümü" | PaymentMethod;

const filters: FilterValue[] = ["Tümü", "CASH", "CARD", "BANK_TRANSFER"];

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  CASH: "Nakit",
  CARD: "Kart",
  BANK_TRANSFER: "Havale / Banka Transferi",
};

type RecordStatus = "Aktif" | "Pasif";

const RECORD_STATUS_BADGE_CLASS: Record<RecordStatus, string> = {
  Aktif: "bg-[#DCFCE7] text-[#16A34A]",
  Pasif: "bg-[#F3F4F6] text-[#667085]",
};

const avatarPalette = [
  "bg-[#EEF0FF] text-[#5B4DE3]",
  "bg-[#DBEAFE] text-[#2563EB]",
  "bg-[#CCFBF1] text-[#0F766E]",
  "bg-[#FFEDD5] text-[#C2410C]",
  "bg-[#F3F4F6] text-[#475467]",
];

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function getAvatarColor(id: string) {
  const sum = id.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return avatarPalette[sum % avatarPalette.length];
}

function getPatientName(payment: Payment) {
  return `${payment.patient.firstName} ${payment.patient.lastName}`.trim();
}

function getPaymentMethodLabel(payment: Payment) {
  return PAYMENT_METHOD_LABELS[payment.paymentMethod];
}

function getRecordStatusLabel(payment: Payment): RecordStatus {
  return payment.isActive ? "Aktif" : "Pasif";
}

function toAmountNumber(payment: Payment): number | null {
  const value = Number(payment.amount);
  return Number.isFinite(value) ? value : null;
}

function formatCurrency(amount: number) {
  return `₺${amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatPaymentDate(paymentDate: string) {
  return dateFormatter.format(new Date(paymentDate));
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7v11a2 2 0 0 0 2 2h12a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-4a2 2 0 1 0 0 4h5"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}

function RefundIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 1 1 2.5 5.8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v-4h4" />
    </svg>
  );
}

interface PaymentsTableProps {
  refreshKey?: number;
}

export default function PaymentsTable({ refreshKey }: PaymentsTableProps) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPayments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await listPayments({ includeInactive: true });
      setPaymentList(data);
    } catch {
      setError("Ödemeler yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPayments();
  }, [loadPayments, refreshKey]);

  const activePayments = useMemo(
    () => paymentList.filter((payment) => payment.isActive),
    [paymentList]
  );

  const sumAmount = (list: Payment[]) =>
    list.reduce((total, payment) => total + (toAmountNumber(payment) ?? 0), 0);

  const totalAmount = sumAmount(activePayments);
  const cashAmount = sumAmount(activePayments.filter((payment) => payment.paymentMethod === "CASH"));
  const cardAmount = sumAmount(activePayments.filter((payment) => payment.paymentMethod === "CARD"));
  const bankTransferAmount = sumAmount(
    activePayments.filter((payment) => payment.paymentMethod === "BANK_TRANSFER")
  );

  const summaryItems: {
    label: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    filterValue: FilterValue;
  }[] = [
    {
      label: "Toplam Tahsilat",
      value: totalAmount,
      icon: <WalletIcon />,
      color: "bg-[#EEF0FF] text-[#5B4DE3]",
      filterValue: "Tümü",
    },
    {
      label: "Nakit Toplamı",
      value: cashAmount,
      icon: <CheckCircleIcon />,
      color: "bg-[#DCFCE7] text-[#16A34A]",
      filterValue: "CASH",
    },
    {
      label: "Kart Toplamı",
      value: cardAmount,
      icon: <ClockIcon />,
      color: "bg-[#FEF3C7] text-[#F59E0B]",
      filterValue: "CARD",
    },
    {
      label: "Havale Toplamı",
      value: bankTransferAmount,
      icon: <RefundIcon />,
      color: "bg-[#FEE2E2] text-[#EF4444]",
      filterValue: "BANK_TRANSFER",
    },
  ];

  const filteredPayments = useMemo(() => {
    const term = search.trim().toLowerCase();

    return paymentList.filter((payment) => {
      const matchesFilter = activeFilter === "Tümü" || payment.paymentMethod === activeFilter;
      const matchesSearch =
        term === "" ||
        getPatientName(payment).toLowerCase().includes(term) ||
        getPaymentMethodLabel(payment).toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter, paymentList]);

  return (
    <div className="flex flex-col gap-5">
      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Ödemeler yükleniyor...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">{error}</p>
          <button
            type="button"
            onClick={loadPayments}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EAF0F8]/60">
            {summaryItems.map((item) => {
              const isSelected = activeFilter === item.filterValue;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveFilter(item.filterValue)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors sm:px-5 ${
                    isSelected ? "bg-[#F7F8FF]" : "hover:bg-[#F7F8FF]"
                  }`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xl font-bold text-[#0B1F55]">{formatCurrency(item.value)}</p>
                    <p className="text-xs text-[#667085]">{item.label}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-full max-w-xs">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path strokeLinecap="round" d="M20 20l-3.8-3.8" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Bu listede hasta veya ödeme yöntemi ara..."
                  className="w-full rounded-xl border border-[#EAF0F8] bg-white py-2 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter;
                  const label = filter === "Tümü" ? filter : PAYMENT_METHOD_LABELS[filter];

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-xl border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "border-[#5B4DE3] bg-[#5B4DE3] text-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_6px_rgba(91,77,227,0.25)]"
                          : "border-[#EAF0F8] text-[#0B1F55] hover:border-[#DCD8FF] hover:bg-[#F7F8FF]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              {paymentList.length === 0 && (
                <EmptyState
                  variant="empty"
                  title="Henüz ödeme kaydı yok"
                  description="Hasta tedavi ödemeleri oluşturulduğunda tahsilat durumlarını buradan takip edebilirsiniz."
                  action={<AddPaymentModal onCreated={loadPayments} />}
                />
              )}

              {paymentList.length > 0 && filteredPayments.length === 0 && (
                <EmptyState
                  variant="search"
                  title="Eşleşen ödeme kaydı bulunamadı"
                  description="Hasta adı, ödeme yöntemi veya seçili filtreyi değiştirerek tekrar deneyin."
                  action={
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setActiveFilter("Tümü");
                      }}
                      className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
                    >
                      Filtreleri temizle
                    </button>
                  }
                />
              )}

              {filteredPayments.length > 0 && (
              <table className="w-full min-w-190 table-fixed text-left">
                <thead>
                  <tr className="border-b border-[#EAF0F8]/70 text-xs font-semibold tracking-wide text-[#667085] uppercase">
                    <th className="w-52 pb-2.5 pr-4 font-medium">Hasta Adı</th>
                    <th className="w-32 pb-2.5 pr-4 text-right font-medium">Tutar</th>
                    <th className="w-44 pb-2.5 pr-4 font-medium">Ödeme Yöntemi</th>
                    <th className="w-28 pb-2.5 pr-4 font-medium">Tarih</th>
                    <th className="w-28 pb-2.5 font-medium">Kayıt Durumu</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => {
                    const patientName = getPatientName(payment);
                    const amount = toAmountNumber(payment);
                    const recordStatus = getRecordStatusLabel(payment);

                    return (
                    <tr
                      key={payment.id}
                      onClick={() => console.log("Ödeme detayına git:", payment.id)}
                      className="cursor-pointer border-b border-[#EAF0F8]/60 transition-colors last:border-0 hover:bg-[#F8F9FF]"
                    >
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarColor(payment.id)}`}
                          >
                            {patientName.charAt(0)}
                          </div>
                          <span className="truncate text-sm font-medium text-[#0B1F55]">{patientName}</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-right text-sm font-bold text-[#0B1F55]">
                        {amount !== null ? formatCurrency(amount) : "—"}
                      </td>
                      <td className="py-4 pr-4">
                        <span className="inline-block truncate rounded-full border border-[#EAF0F8] bg-[#F7F8FF] px-3 py-1 text-xs font-medium text-[#667085]">
                          {getPaymentMethodLabel(payment)}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-sm text-[#0B1F55]">{formatPaymentDate(payment.paymentDate)}</td>
                      <td className="py-4">
                        <span
                          className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold ${RECORD_STATUS_BADGE_CLASS[recordStatus]}`}
                        >
                          {recordStatus}
                        </span>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#EAF0F8]/70 pt-5">
              <p className="text-sm text-[#667085]">Toplam {filteredPayments.length} kayıt</p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Önceki sayfa"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EAF0F8] text-[#667085] hover:bg-[#F7F8FF]"
                >
                  &lt;
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5B4DE3] text-sm font-semibold text-white"
                >
                  1
                </button>
                <button
                  type="button"
                  aria-label="Sonraki sayfa"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EAF0F8] text-[#667085] hover:bg-[#F7F8FF]"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
