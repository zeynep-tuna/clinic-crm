import { secretaryDoctorSchedule } from "@/data/secretaryDashboard";

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
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Doktor Takvimi Özeti</h2>

      <p className="mt-3 text-2xl font-bold text-[#5B4DE3]">{secretaryDoctorSchedule.length} aktif doktor</p>
      <p className="text-sm text-[#667085]">Bugün {totalAppointments} randevu planlandı</p>

      <div className="mt-4 space-y-3">
        {secretaryDoctorSchedule.map((doctor) => (
          <div key={doctor.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FF] text-[#5B4DE3]">
                <DoctorIcon />
              </span>
              <div>
                <p className="text-sm font-medium text-[#0B1F55]">{doctor.name}</p>
                <p className="text-xs text-[#667085]">{doctor.department}</p>
              </div>
            </div>
            <span className="shrink-0 text-sm font-semibold text-[#0B1F55]">{doctor.appointmentCount} randevu</span>
          </div>
        ))}
      </div>
    </div>
  );
}
