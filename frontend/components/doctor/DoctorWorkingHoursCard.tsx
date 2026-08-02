import { doctorWorkingHours } from "@/data/doctorProfile";

export default function DoctorWorkingHoursCard() {
  const openDays = doctorWorkingHours.filter((item) => !item.isClosed).length;
  const closedDays = doctorWorkingHours.filter((item) => item.isClosed).length;

  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#0B1F55]">Çalışma Saatleri</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Hasta randevularınız için görünen haftalık çalışma planınızı takip edin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#16A34A]">
            {openDays} gün aktif
          </span>
          <span className="inline-flex items-center rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-semibold text-[#667085]">
            {closedDays} gün kapalı
          </span>
        </div>
      </div>

      <div className="mt-5 divide-y divide-[#EEF2F8]">
        {doctorWorkingHours.map((item) => (
          <div key={item.day} className="flex items-center justify-between py-3">
            <span className={`text-sm font-medium ${item.isClosed ? "text-[#98A2B3]" : "text-[#0B1F55]"}`}>
              {item.day}
            </span>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                item.isClosed ? "bg-[#F3F4F6] text-[#98A2B3]" : "bg-[#EEF0FF] text-[#5B4DE3]"
              }`}
            >
              {item.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
