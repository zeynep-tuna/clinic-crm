const dateRangeOptions = ["Son 7 Gün", "Son 30 Gün", "Bu Ay", "Bu Yıl"];

const reportTypeOptions = [
  "Genel Rapor",
  "Gelir Raporu",
  "Randevu Raporu",
  "Hasta Raporu",
  "Doktor Performansı",
];

export default function ReportFilters() {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#667085]">Tarih Aralığı</label>
          <select
            defaultValue={dateRangeOptions[1]}
            className="rounded-xl border border-[#E3E8F0] px-4 py-2 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          >
            {dateRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#667085]">Rapor Türü</label>
          <select
            defaultValue={reportTypeOptions[0]}
            className="rounded-xl border border-[#E3E8F0] px-4 py-2 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          >
            {reportTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
