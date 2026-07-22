import type { PatientPaymentSummary } from "@/data/patient-detail";

function formatTRY(amount: number) {
  return `₺${amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function PatientPaymentSummaryCard({
  summary,
}: {
  summary: PatientPaymentSummary;
}) {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#E3E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#5B4DE3]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <circle cx="12" cy="12" r="2.5" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-[#0B1F55]">Ödeme Özeti</h3>
      </div>

      <div className="mt-5 grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#E3E8F0] p-4">
          <p className="text-xs text-[#667085]">Toplam Ödeme</p>
          <p className="mt-2 text-lg font-bold text-[#0B1F55]">{formatTRY(summary.total)}</p>
          <p className="mt-1 text-xs text-[#667085]">Tüm zamanlar</p>
        </div>

        <div className="rounded-2xl border border-[#E3E8F0] p-4">
          <p className="text-xs text-[#667085]">Ödenen Tutar</p>
          <p className="mt-2 text-lg font-bold text-[#16A34A]">{formatTRY(summary.paid)}</p>
          <p className="mt-1 text-xs text-[#667085]">Tamamlanan ödemeler</p>
        </div>

        <div className="rounded-2xl border border-[#E3E8F0] p-4">
          <p className="text-xs text-[#667085]">Bekleyen Ödeme</p>
          <p className="mt-2 text-lg font-bold text-[#F59E0B]">{formatTRY(summary.pending)}</p>
          <p className="mt-1 text-xs text-[#667085]">
            {summary.pendingInvoiceCount} adet fatura
          </p>
        </div>
      </div>

      <div className="mt-5">
        <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-[#5B4DE3] hover:underline">
          Tüm ödemeleri görüntüle
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
