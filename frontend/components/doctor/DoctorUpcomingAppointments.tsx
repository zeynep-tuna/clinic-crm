import Link from "next/link";
import type { Appointment } from "@/lib/appointments-api";

const dateTimeFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
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

interface DoctorUpcomingAppointmentsProps {
  appointments: Appointment[];
}

export default function DoctorUpcomingAppointments({ appointments }: DoctorUpcomingAppointmentsProps) {
  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#0B1F55]">Yaklaşan Randevular</h2>
        <Link
          href="/doctor/appointments"
          className="rounded-lg border border-[#EAF0F8] px-2.5 py-1 text-xs font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p className="mt-4 py-4 text-center text-sm text-[#667085]">Yaklaşan randevunuz bulunmuyor.</p>
      ) : (
        <div className="mt-3 divide-y divide-[#EEF2F8]">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center gap-3 py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FF] text-[#5B4DE3]">
                <CalendarIcon />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#0B1F55]">
                  {getPatientName(appointment)} - {appointment.title ?? "—"}
                </p>
                <p className="text-xs text-[#667085]">{dateTimeFormatter.format(new Date(appointment.startAt))}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
