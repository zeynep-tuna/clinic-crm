const dateRangeOptions = ["Son 7 Gün", "Son 30 Gün", "Bu Ay", "Bu Yıl"];

const reportTypeOptions = [
  "Genel Rapor",
  "Gelir Raporu",
  "Randevu Raporu",
  "Hasta Raporu",
  "Hekim Performansı",
];

const doctorOptions = [
  "Tüm Hekimler",
  "Dr. Ali Kaya",
  "Dr. Buse Güneş",
  "Dr. Mehmet Hızlı",
  "Dr. Deniz Yılmaz",
  "Dr. Elif Aydın",
];

export default function ReportFilters() {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#667085]">Tarih Aralığı</label>
          <select
            defaultValue={dateRangeOptions[1]}
            className="h-10 rounded-xl border border-[#E3E8F0] px-3.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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
            className="h-10 rounded-xl border border-[#E3E8F0] px-3.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          >
            {reportTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#667085]">Hekim</label>
          <select
            defaultValue={doctorOptions[0]}
            className="h-10 rounded-xl border border-[#E3E8F0] px-3.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          >
            {doctorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="ml-auto flex h-10 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#4c3fd1]"
        >
          Uygula
        </button>
      </div>
    </div>
  );
}
