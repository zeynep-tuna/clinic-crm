import { doctorWorkingHours } from "@/data/doctorProfile";

export default function DoctorWorkingHoursCard() {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Çalışma Saatleri</h2>

      <div className="mt-4 divide-y divide-[#E3E8F0]">
        {doctorWorkingHours.map((item) => (
          <div key={item.day} className="flex items-center justify-between py-2.5">
            <span className={`text-sm ${item.isClosed ? "text-[#98A2B3]" : "text-[#0B1F55]"}`}>
              {item.day}
            </span>
            <span
              className={`text-sm font-medium ${item.isClosed ? "text-[#98A2B3]" : "text-[#0B1F55]"}`}
            >
              {item.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
