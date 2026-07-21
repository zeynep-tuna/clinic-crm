import StatCard from "@/components/dashboard/StatCard";
import TodayAppointments from "@/components/dashboard/TodayAppointments";
import RecentPatients from "@/components/dashboard/RecentPatients";
import PaymentSummary from "@/components/dashboard/PaymentSummary";
import { statCards } from "@/data/dashboard";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TodayAppointments />
        </div>

        <div className="space-y-8">
          <RecentPatients />
          <PaymentSummary />
        </div>
      </div>
    </div>
  );
}
