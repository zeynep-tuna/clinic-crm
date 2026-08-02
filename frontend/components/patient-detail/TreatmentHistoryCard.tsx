import type { TreatmentRecord } from "@/data/patient-detail";

export default function TreatmentHistoryCard({ history }: { history: TreatmentRecord[] }) {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-7 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#5B4DE3]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3.5h8a1 1 0 0 1 1 1V5h1a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1v-.5a1 1 0 0 1 1-1Z" />
            <path strokeLinecap="round" d="M9 12l2 2 4-4.5" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-[#0B1F55]">Tedavi Geçmişi</h3>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left">
          <thead>
            <tr className="border-b border-[#EAF0F8] text-xs text-[#667085]">
              <th className="pb-2.5 font-medium">Tarih</th>
              <th className="pb-2.5 font-medium">Tedavi / İşlem</th>
              <th className="pb-2.5 font-medium">Doktor</th>
              <th className="pb-2.5 font-medium">Açıklama</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, index) => (
              <tr key={`${record.date}-${index}`} className="border-b border-[#EAF0F8]/60 last:border-0">
                <td className="py-3.5 text-sm text-[#0B1F55]">{record.date}</td>
                <td className="py-3.5 text-sm font-medium text-[#0B1F55]">{record.treatment}</td>
                <td className="py-3.5 text-sm text-[#0B1F55]">{record.doctor}</td>
                <td className="py-3.5 text-sm text-[#667085]">{record.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && (
          <p className="py-6 text-center text-sm text-[#667085]">Kayıtlı tedavi geçmişi yok.</p>
        )}
      </div>

      <div className="mt-auto pt-5">
        <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-[#5B4DE3] hover:underline">
          Tüm tedavi geçmişini görüntüle
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
