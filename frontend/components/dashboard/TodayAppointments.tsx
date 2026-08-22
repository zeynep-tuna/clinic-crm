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

const statusBadgeClass: Record<UiStatus, string> = {
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

function getPatientName(appointment: Appointment) {
  return `${appointment.patient.firstName} ${appointment.patient.lastName}`.trim();
}

interface TodayAppointmentsProps {
  appointments: Appointment[];
}

export default function TodayAppointments({ appointments }: TodayAppointmentsProps) {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#0B1F55]">Bugünkü Randevular</h3>
        <Link
          href="/appointments"
          className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-medium text-[#0B1F55] hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p className="mt-6 py-6 text-center text-sm text-[#667085]">Bugün için planlanmış randevu bulunmuyor.</p>
      ) : (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#EAF0F8]/70 text-sm text-[#667085]">
                <th className="pb-3 font-medium">Saat</th>
                <th className="pb-3 font-medium">Hasta</th>
                <th className="pb-3 font-medium">Doktor</th>
                <th className="pb-3 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => {
                const status = STATUS_LABELS[appointment.status];

                return (
                  <tr key={appointment.id} className="border-b border-[#EAF0F8]/60 last:border-0">
                    <td className="py-4 text-sm text-[#0B1F55]">{timeFormatter.format(new Date(appointment.startAt))}</td>
                    <td className="py-4 text-sm font-medium text-[#0B1F55]">{getPatientName(appointment)}</td>
                    <td className="py-4 text-sm text-[#0B1F55]">{appointment.doctor.fullName}</td>
                    <td className="py-4">
                      <span
                        className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusBadgeClass[status]}`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link href="/appointments" className="text-sm font-medium text-[#5B4DE3] hover:underline">
          Tüm randevuları görüntüle →
        </Link>
      </div>
    </div>
  );
}
