import type { DoctorAppointmentStatus } from "@/data/doctorDashboard";
import { doctorTodayAppointments } from "@/data/doctorDashboard";

const statusStyles: Record<DoctorAppointmentStatus, string> = {
  Onaylandı: "bg-[#DCFCE7] text-[#16A34A]",
  Bekliyor: "bg-[#FEF3C7] text-[#F59E0B]",
  Tamamlandı: "bg-[#DBEAFE] text-[#2563EB]",
};

export default function DoctorTodayAppointments() {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#0B1F55]">Bugünkü Randevularım</h2>
        <button
          type="button"
          className="rounded-lg border border-[#E3E8F0] px-3 py-1.5 text-xs font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </button>
      </div>

      <div className="mt-4 divide-y divide-[#E3E8F0]">
        {doctorTodayAppointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center justify-between gap-3 py-3">
            <div className="flex items-center gap-3">
              <span className="w-12 shrink-0 text-sm font-semibold text-[#0B1F55]">{appointment.time}</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-xs font-semibold text-[#5B4DE3]">
                {appointment.patientName.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-medium text-[#0B1F55]">{appointment.patientName}</p>
                <p className="text-xs text-[#667085]">{appointment.treatment}</p>
              </div>
            </div>

            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[appointment.status]}`}
            >
              {appointment.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
