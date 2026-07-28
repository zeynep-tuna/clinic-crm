import { secretaryDoctorSchedule } from "@/data/secretaryDashboard";

function ScheduleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
      <path strokeLinecap="round" d="M9 14h2M9 17h6" />
    </svg>
  );
}

function DoctorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <circle cx="12" cy="8" r="3.5" />
      <path strokeLinecap="round" d="M5 20c.7-3.8 3.4-6 7-6s6.3 2.2 7 6" />
    </svg>
  );
}

export default function SecretaryDoctorSchedule() {
  const totalAppointments = secretaryDoctorSchedule.reduce((sum, item) => sum + item.appointmentCount, 0);

  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#DBEAFE] text-[#2563EB]">
            <ScheduleIcon />
          </span>
          <h2 className="text-base font-semibold text-[#0B1F55]">Doktor Takvimi Özeti</h2>
        </div>

        <span className="shrink-0 rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#2563EB]">
          {secretaryDoctorSchedule.length} aktif
        </span>
      </div>

      <p className="mt-2 text-sm text-[#667085]">Bugün {totalAppointments} randevu planlandı</p>

      <div className="mt-3 flex-1 divide-y divide-[#E3E8F0]">
        {secretaryDoctorSchedule.map((doctor) => (
          <div key={doctor.id} className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
                <DoctorIcon />
              </span>
              <div>
                <p className="text-sm font-medium text-[#0B1F55]">{doctor.name}</p>
                <p className="text-xs text-[#667085]">{doctor.department}</p>
              </div>
            </div>
            <p className="shrink-0 text-right text-sm">
              <span className="font-bold text-[#0B1F55]">{doctor.appointmentCount}</span>{" "}
              <span className="text-[#667085]">randevu</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-[#E3E8F0] pt-3">
        <button
          type="button"
          className="text-xs font-semibold text-[#5B4DE3] transition-opacity hover:underline hover:opacity-80"
        >
          Tüm Doktor Takvimi →
        </button>
      </div>
    </div>
  );
}
