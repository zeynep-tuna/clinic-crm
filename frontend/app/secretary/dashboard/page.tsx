import SecretaryStatCard from "@/components/secretary/SecretaryStatCard";
import SecretaryTodayAppointments from "@/components/secretary/SecretaryTodayAppointments";
import SecretaryPaymentStatus from "@/components/secretary/SecretaryPaymentStatus";
import SecretaryDoctorSchedule from "@/components/secretary/SecretaryDoctorSchedule";
import SecretaryRecentPatients from "@/components/secretary/SecretaryRecentPatients";
import SecretaryUpcomingTasks from "@/components/secretary/SecretaryUpcomingTasks";
import { secretaryStatCards } from "@/data/secretaryDashboard";

export default function SecretaryDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
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
        <SecretaryPaymentStatus />
        <SecretaryDoctorSchedule />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <SecretaryRecentPatients />
        <SecretaryUpcomingTasks />
      </div>
    </div>
  );
}
