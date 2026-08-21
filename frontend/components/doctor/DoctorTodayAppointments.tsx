import Link from "next/link";
import type { Appointment, AppointmentStatus } from "@/lib/appointments-api";

type UiStatus = "Bekliyor" | "Onaylandı" | "Tamamlandı" | "İptal" | "Gelmedi";

const STATUS_LABELS: Record<AppointmentStatus, UiStatus> = {
  SCHEDULED: "Bekliyor",
  CONFIRMED: "Onaylandı",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
  NO_SHOW: "Gelmedi",
};

const statusStyles: Record<UiStatus, string> = {
  Bekliyor: "bg-[#FEF3C7] text-[#F59E0B]",
  Onaylandı: "bg-[#DCFCE7] text-[#16A34A]",
  Tamamlandı: "bg-[#DBEAFE] text-[#2563EB]",
  İptal: "bg-[#FEE2E2] text-[#EF4444]",
  Gelmedi: "bg-[#F3F4F6] text-[#667085]",
};

const timeFormatter = new Intl.DateTimeFormat("tr-TR", {
  hour: "2-digit",
  minute: "2-digit",
});

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

function getPatientName(appointment: Appointment) {
  return `${appointment.patient.firstName} ${appointment.patient.lastName}`.trim();
}

interface DoctorTodayAppointmentsProps {
  appointments: Appointment[];
}

export default function DoctorTodayAppointments({ appointments }: DoctorTodayAppointmentsProps) {
  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#0B1F55]">Bugünkü Randevularım</h2>
        <Link
          href="/doctor/appointments"
          className="rounded-lg border border-[#EAF0F8] px-2.5 py-1 text-xs font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p className="mt-4 py-4 text-center text-sm text-[#667085]">Bugün için planlanmış randevunuz bulunmuyor.</p>
      ) : (
        <div className="mt-3 divide-y divide-[#EEF2F8]">
          {appointments.map((appointment) => {
            const status = STATUS_LABELS[appointment.status];
            const patientName = getPatientName(appointment);

            return (
              <div key={appointment.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-11 shrink-0 text-sm font-semibold text-[#0B1F55]">
                    {timeFormatter.format(new Date(appointment.startAt))}
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${getAvatarColor(appointment.id)}`}
                  >
                    {patientName.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#0B1F55]">{patientName}</p>
                    <p className="truncate text-xs text-[#667085]">{appointment.title ?? "—"}</p>
                  </div>
                </div>

                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
