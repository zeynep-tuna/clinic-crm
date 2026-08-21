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

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
    </svg>
  );
}

function getPatientName(appointment: Appointment) {
  return `${appointment.patient.firstName} ${appointment.patient.lastName}`.trim();
}

interface SecretaryTodayAppointmentsProps {
  appointments: Appointment[];
}

export default function SecretaryTodayAppointments({ appointments }: SecretaryTodayAppointmentsProps) {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#DBEAFE] text-[#2563EB]">
            <CalendarIcon />
          </span>
          <h2 className="text-base font-semibold text-[#0B1F55]">Bugünkü Randevular</h2>
        </div>
        <Link
          href="/secretary/appointments"
          className="rounded-lg border border-[#EAF0F8] px-3 py-1.5 text-xs font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p className="mt-4 py-4 text-center text-sm text-[#667085]">Bugün için planlanmış randevu bulunmuyor.</p>
      ) : (
        <div className="mt-3 divide-y divide-[#EAF0F8]">
          {appointments.map((appointment) => {
            const status = STATUS_LABELS[appointment.status];

            return (
              <div key={appointment.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-sm font-semibold text-[#0B1F55]">
                    {timeFormatter.format(new Date(appointment.startAt))}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-xs font-semibold text-[#2563EB]">
                    {getPatientName(appointment).charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#0B1F55]">{getPatientName(appointment)}</p>
                    <p className="text-xs text-[#667085]">{appointment.doctor.fullName}</p>
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
