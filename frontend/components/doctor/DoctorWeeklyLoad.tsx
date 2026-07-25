import { doctorWeeklyLoad } from "@/data/doctorDashboard";

const dayShortLabels: Record<string, string> = {
  Pazartesi: "Pzt",
  Salı: "Sal",
  Çarşamba: "Çar",
  Perşembe: "Per",
  Cuma: "Cum",
  Cumartesi: "Cmt",
};

export default function DoctorWeeklyLoad() {
  const max = Math.max(...doctorWeeklyLoad.map((item) => item.count));

  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Haftalık Yoğunluk</h2>

      <div className="mt-6 flex flex-1 items-end justify-between gap-2">
        {doctorWeeklyLoad.map((item) => (
          <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs font-semibold text-[#0B1F55]">{item.count}</span>
            <div className="flex h-28 w-full items-end">
              <div
                className="w-full rounded-t-lg bg-[#5B4DE3]"
                style={{ height: `${(item.count / max) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-[#667085]">{dayShortLabels[item.day] ?? item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
