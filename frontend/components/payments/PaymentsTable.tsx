"use client";

import { useMemo, useState } from "react";
import { payments, paymentOverview, type PaymentStatus } from "@/data/payments";

type FilterValue = "Tümü" | PaymentStatus;

const filters: FilterValue[] = ["Tümü", "Ödendi", "Bekliyor", "Kısmi Ödeme", "İade"];

const statusBadgeClass: Record<PaymentStatus, string> = {
  Ödendi: "bg-[#DCFCE7] text-[#16A34A]",
  Bekliyor: "bg-[#FEF3C7] text-[#F59E0B]",
  "Kısmi Ödeme": "bg-[#EEF0FF] text-[#5B4DE3]",
  İade: "bg-[#FEE2E2] text-[#EF4444]",
};

const avatarPalette = [
  "bg-[#EEF0FF] text-[#5B4DE3]",
  "bg-[#DBEAFE] text-[#2563EB]",
  "bg-[#CCFBF1] text-[#0F766E]",
  "bg-[#FFEDD5] text-[#C2410C]",
  "bg-[#F3F4F6] text-[#475467]",
];

function getAvatarColor(id: string) {
  const sum = id.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return avatarPalette[sum % avatarPalette.length];
}

function formatCurrency(amount: number) {
  return `₺${amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
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

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5a2.1 2.1 0 0 1 3 3L7 20l-4 1 1-4Z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

export default function PaymentsTable() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");

  const summaryItems: {
    label: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    filterValue: FilterValue;
  }[] = [
    {
      label: "Toplam Gelir",
      value: paymentOverview.totalRevenue,
      icon: <WalletIcon />,
      color: "bg-[#EEF0FF] text-[#5B4DE3]",
      filterValue: "Tümü",
    },
    {
      label: "Tahsil Edilen",
      value: paymentOverview.completedAmount,
      icon: <CheckCircleIcon />,
      color: "bg-[#DCFCE7] text-[#16A34A]",
      filterValue: "Ödendi",
    },
    {
      label: "Bekleyen Ödeme",
      value: paymentOverview.pendingAmount,
      icon: <ClockIcon />,
      color: "bg-[#FEF3C7] text-[#F59E0B]",
      filterValue: "Bekliyor",
    },
    {
      label: "İade Edilen",
      value: paymentOverview.refundedAmount,
      icon: <RefundIcon />,
      color: "bg-[#FEE2E2] text-[#EF4444]",
      filterValue: "İade",
    },
  ];

  const filteredPayments = useMemo(() => {
    const term = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesFilter = activeFilter === "Tümü" || payment.status === activeFilter;
      const matchesSearch =
        term === "" ||
        payment.patientName.toLowerCase().includes(term) ||
        payment.treatment.toLowerCase().includes(term) ||
        payment.method.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div className="flex flex-col gap-5">
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
              placeholder="Bu listede hasta, tedavi veya ödeme yöntemi ara..."
              className="w-full rounded-xl border border-[#EAF0F8] bg-white py-2 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

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
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-240 table-fixed text-left">
            <thead>
              <tr className="border-b border-[#EAF0F8]/70 text-xs font-semibold tracking-wide text-[#667085] uppercase">
                <th className="w-52 pb-2.5 pr-4 font-medium">Hasta Adı</th>
                <th className="w-44 pb-2.5 pr-4 font-medium">Tedavi</th>
                <th className="w-32 pb-2.5 pr-4 text-right font-medium">Tutar</th>
                <th className="w-36 pb-2.5 pr-4 font-medium">Ödeme Durumu</th>
                <th className="w-36 pb-2.5 pr-4 font-medium">Ödeme Yöntemi</th>
                <th className="w-28 pb-2.5 pr-4 font-medium">Tarih</th>
                <th className="w-28 pb-2.5 font-medium">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
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
                        {payment.patientName.charAt(0)}
                      </div>
                      <span className="truncate text-sm font-medium text-[#0B1F55]">
                        {payment.patientName}
                      </span>
                    </div>
                  </td>
                  <td className="truncate py-4 pr-4 text-sm text-[#0B1F55]">{payment.treatment}</td>
                  <td className="py-4 pr-4 text-right text-sm font-bold text-[#0B1F55]">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusBadgeClass[payment.status]}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="inline-block truncate rounded-full border border-[#EAF0F8] bg-[#F7F8FF] px-3 py-1 text-xs font-medium text-[#667085]">
                      {payment.method}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-sm text-[#0B1F55]">{payment.date}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3 text-[#667085]">
                      <button
                        type="button"
                        aria-label="Düzenle"
                        onClick={(event) => event.stopPropagation()}
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                      >
                        <EditIcon />
                      </button>
                      <button
                        type="button"
                        aria-label="Diğer işlemler"
                        onClick={(event) => event.stopPropagation()}
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                      >
                        <MoreIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPayments.length === 0 && (
            <p className="py-10 text-center text-sm text-[#667085]">
              Aramanızla eşleşen ödeme bulunamadı.
            </p>
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
    </div>
  );
}
