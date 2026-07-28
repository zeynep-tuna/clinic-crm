import type { SecretaryAppointmentStatus } from "@/data/secretaryDashboard";
import { secretaryTodayAppointments } from "@/data/secretaryDashboard";

const statusStyles: Record<SecretaryAppointmentStatus, string> = {
  Onaylandı: "bg-[#DCFCE7] text-[#16A34A]",
  Bekliyor: "bg-[#FEF3C7] text-[#F59E0B]",
  Tamamlandı: "bg-[#DBEAFE] text-[#2563EB]",
};

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
    </svg>
  );
}

export default function SecretaryTodayAppointments() {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#DBEAFE] text-[#2563EB]">
            <CalendarIcon />
          </span>
          <h2 className="text-base font-semibold text-[#0B1F55]">Bugünkü Randevular</h2>
        </div>
        <button
          type="button"
          className="rounded-lg border border-[#E3E8F0] px-3 py-1.5 text-xs font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </button>
      </div>

      <div className="mt-3 divide-y divide-[#E3E8F0]">
        {secretaryTodayAppointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex items-center gap-3">
              <span className="w-12 shrink-0 text-sm font-semibold text-[#0B1F55]">{appointment.time}</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-xs font-semibold text-[#2563EB]">
                {appointment.patientName.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-medium text-[#0B1F55]">{appointment.patientName}</p>
                <p className="text-xs text-[#667085]">{appointment.doctorName}</p>
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
