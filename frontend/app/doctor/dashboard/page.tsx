import DoctorStatCard from "@/components/doctor/DoctorStatCard";
import DoctorTodayAppointments from "@/components/doctor/DoctorTodayAppointments";
import DoctorNotes from "@/components/doctor/DoctorNotes";
import DoctorWeeklyLoad from "@/components/doctor/DoctorWeeklyLoad";
import DoctorRecentPatients from "@/components/doctor/DoctorRecentPatients";
import DoctorUpcomingAppointments from "@/components/doctor/DoctorUpcomingAppointments";
import { doctorStatCards } from "@/data/doctorDashboard";

export default function DoctorDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <DoctorRecentPatients />
        <DoctorUpcomingAppointments />
      </div>
    </div>
  );
}
