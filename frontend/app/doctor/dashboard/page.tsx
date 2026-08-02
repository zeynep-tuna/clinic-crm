import DoctorStatCard from "@/components/doctor/DoctorStatCard";
import DoctorTodayAppointments from "@/components/doctor/DoctorTodayAppointments";
import DoctorNotes from "@/components/doctor/DoctorNotes";
import DoctorWeeklyLoad from "@/components/doctor/DoctorWeeklyLoad";
import DoctorRecentPatients from "@/components/doctor/DoctorRecentPatients";
import DoctorUpcomingAppointments from "@/components/doctor/DoctorUpcomingAppointments";
import { doctorProfile, doctorStatCards } from "@/data/doctorDashboard";

function BannerCalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
    </svg>
  );
}

export default function DoctorDashboardPage() {
  const todayCount = doctorStatCards.find((card) => card.id === "today-appointments")?.value ?? "0";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#DCD8FF] bg-linear-to-r from-white to-[#F7F8FF] px-6 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            🦷
          </span>

          <div>
            <p className="text-base font-semibold text-[#0B1F55]">Hoş geldiniz, {doctorProfile.name}!</p>
            <p className="mt-0.5 text-sm text-[#667085]">
              Bugünkü randevularınızı, hasta notlarınızı ve tedavi süreçlerinizi buradan hızlıca takip edebilirsiniz.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-[#667085]">
            <BannerCalendarIcon />
            <span>13 Mayıs 2024, Pazartesi</span>
          </div>
          <span className="inline-flex items-center rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-semibold text-[#5B4DE3]">
            Bugün {todayCount} randevu
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {doctorStatCards.map((card) => (
          <DoctorStatCard
            key={card.id}
            id={card.id}
            title={card.title}
            value={card.value}
            icon={card.icon}
            linkLabel={card.linkLabel}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr_1fr]">
        <DoctorTodayAppointments />
        <DoctorNotes />
        <DoctorWeeklyLoad />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[2fr_1fr]">
        <DoctorRecentPatients />
        <DoctorUpcomingAppointments />
      </div>
    </div>
  );
}
