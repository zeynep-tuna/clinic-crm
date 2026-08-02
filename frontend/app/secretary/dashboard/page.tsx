import SecretaryStatCard from "@/components/secretary/SecretaryStatCard";
import SecretaryTodayAppointments from "@/components/secretary/SecretaryTodayAppointments";
import SecretaryPaymentStatus from "@/components/secretary/SecretaryPaymentStatus";
import SecretaryDoctorSchedule from "@/components/secretary/SecretaryDoctorSchedule";
import SecretaryRecentPatients from "@/components/secretary/SecretaryRecentPatients";
import SecretaryUpcomingTasks from "@/components/secretary/SecretaryUpcomingTasks";
import { secretaryStatCards } from "@/data/secretaryDashboard";

function BannerCalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0 text-[#DCD8FF]">
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z" />
    </svg>
  );
}

export default function SecretaryDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#DCD8FF] bg-linear-to-r from-white to-[#F7F8FF] px-6 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            👋
          </span>

          <div>
            <p className="text-base font-semibold text-[#0B1F55]">Hoş geldiniz, Zeynep Hanım!</p>
            <p className="mt-0.5 text-sm text-[#667085]">
              Kliniğinizdeki güncel durumu aşağıdan hızlıca takip edebilirsiniz.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-[#667085]">
            <BannerCalendarIcon />
            <span>13 Mayıs 2024, Pazartesi</span>
          </div>
          <SparkleIcon />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {secretaryStatCards.map((card) => (
          <SecretaryStatCard
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
        <SecretaryTodayAppointments />
        <SecretaryUpcomingTasks />
        <SecretaryDoctorSchedule />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[2fr_1fr]">
        <SecretaryRecentPatients />
        <SecretaryPaymentStatus />
      </div>
    </div>
  );
}
