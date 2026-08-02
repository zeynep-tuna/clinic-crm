import type { DoctorAppointmentStatus } from "@/data/doctorDashboard";
import { doctorTodayAppointments } from "@/data/doctorDashboard";

const statusStyles: Record<DoctorAppointmentStatus, string> = {
  Onaylandı: "bg-[#DCFCE7] text-[#16A34A]",
  Bekliyor: "bg-[#FEF3C7] text-[#F59E0B]",
  Tamamlandı: "bg-[#DBEAFE] text-[#2563EB]",
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

export default function DoctorTodayAppointments() {
  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#0B1F55]">Bugünkü Randevularım</h2>
        <button
          type="button"
          className="rounded-lg border border-[#EAF0F8] px-2.5 py-1 text-xs font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </button>
      </div>

      <div className="mt-3 divide-y divide-[#EEF2F8]">
        {doctorTodayAppointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="w-11 shrink-0 text-sm font-semibold text-[#0B1F55]">{appointment.time}</span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${getAvatarColor(appointment.id)}`}
              >
                {appointment.patientName.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#0B1F55]">{appointment.patientName}</p>
                <p className="truncate text-xs text-[#667085]">{appointment.treatment}</p>
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
