"use client";

import type { Doctor } from "@/lib/doctors-api";
import type { Appointment, AppointmentStatus } from "@/lib/appointments-api";

type UiStatus = "Bekliyor" | "Onaylandı";

const OPERATIONAL_STATUSES: AppointmentStatus[] = ["SCHEDULED", "CONFIRMED"];

const STATUS_LABELS: Record<AppointmentStatus, UiStatus | null> = {
  SCHEDULED: "Bekliyor",
  CONFIRMED: "Onaylandı",
  COMPLETED: null,
  CANCELLED: null,
  NO_SHOW: null,
};

const statusBadgeClass: Record<UiStatus, string> = {
  Bekliyor: "bg-[#FEF3C7] text-[#F59E0B]",
  Onaylandı: "bg-[#DCFCE7] text-[#16A34A]",
};

const timeFormatter = new Intl.DateTimeFormat("tr-TR", {
  hour: "2-digit",
  minute: "2-digit",
});

function getDoctorInitials(name: string) {
  const parts = name.split(" ").filter((part) => part !== "Dr." && part !== "Dr");
  return parts
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getPatientName(appointment: Appointment) {
  return `${appointment.patient.firstName} ${appointment.patient.lastName}`.trim();
}

function parseLocalDateInputValue(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isSameLocalDate(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

interface SecretaryDoctorScheduleDetailProps {
  doctor: Doctor | null;
  appointments: Appointment[];
  selectedDate: string;
  onDateChange: (value: string) => void;
}

export default function SecretaryDoctorScheduleDetail({
  doctor,
  appointments,
  selectedDate,
  onDateChange,
}: SecretaryDoctorScheduleDetailProps) {
  if (!doctor) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <p className="text-sm text-[#667085]">Randevularını görüntülemek için bir doktor seçin.</p>
      </div>
    );
  }

  const targetDate = parseLocalDateInputValue(selectedDate);

  const dayAppointments = appointments
    .filter((appointment) => appointment.doctorId === doctor.id)
    .filter((appointment) => OPERATIONAL_STATUSES.includes(appointment.status))
    .filter((appointment) => isSameLocalDate(new Date(appointment.startAt), targetDate))
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-3 border-b border-[#EEF2F8] pb-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
          {getDoctorInitials(doctor.fullName)}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0B1F55]">{doctor.fullName}</p>
          <p className="text-xs text-[#667085]">{doctor.specialty ?? "—"}</p>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-[#667085]">Tarih</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(event) => onDateChange(event.target.value)}
          className="h-10 w-full rounded-xl border border-[#EAF0F8] px-3.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
        />
      </div>

      {dayAppointments.length === 0 ? (
        <p className="mt-6 flex-1 py-6 text-center text-sm text-[#667085]">Bu tarihte randevu bulunmuyor.</p>
      ) : (
        <div className="mt-4 flex-1 divide-y divide-[#EEF2F8]">
          {dayAppointments.map((appointment) => {
            const status = STATUS_LABELS[appointment.status] ?? "Bekliyor";

            return (
              <div key={appointment.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#0B1F55]">
                    {timeFormatter.format(new Date(appointment.startAt))} –{" "}
                    {timeFormatter.format(new Date(appointment.endAt))}
                  </p>
                  <p className="truncate text-sm text-[#0B1F55]">{getPatientName(appointment)}</p>
                  <p className="truncate text-xs text-[#667085]">{appointment.title ?? "—"}</p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass[status]}`}
                >
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
