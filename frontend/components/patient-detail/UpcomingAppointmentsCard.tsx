import type { AppointmentStatus, UpcomingAppointment } from "@/data/patient-detail";

const statusBadgeClass: Record<AppointmentStatus, string> = {
  Onaylandı: "bg-[#DCFCE7] text-[#16A34A]",
  Beklemede: "bg-[#FEF3C7] text-[#F59E0B]",
};

export default function UpcomingAppointmentsCard({
  appointments,
}: {
  appointments: UpcomingAppointment[];
}) {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-7 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#5B4DE3]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
            <rect x="4" y="5" width="16" height="15" rx="2" />
            <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-[#0B1F55]">Yaklaşan Randevular</h3>
      </div>

      <div className="mt-5 flex-1 space-y-3">
        {appointments.map((appointment, index) => (
          <div
            key={`${appointment.day}-${appointment.month}-${index}`}
            className="flex items-center gap-4 rounded-2xl border border-[#EAF0F8] p-4"
          >
            <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#EEF0FF] text-[#5B4DE3]">
              <span className="text-sm font-bold leading-none">{appointment.day}</span>
              <span className="mt-0.5 text-[10px] font-semibold leading-none">{appointment.month}</span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#0B1F55]">
                {appointment.time} · {appointment.treatment}
              </p>
              <p className="text-xs text-[#667085]">{appointment.doctor}</p>
            </div>

            <span
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass[appointment.status]}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {appointment.status}
            </span>
          </div>
        ))}

        {appointments.length === 0 && (
          <p className="py-6 text-center text-sm text-[#667085]">Planlanmış randevu yok.</p>
        )}
      </div>

      <div className="mt-5">
        <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-[#5B4DE3] hover:underline">
          Tüm randevuları görüntüle
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
