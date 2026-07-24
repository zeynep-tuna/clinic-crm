import ReportSummaryCards from "@/components/reports/ReportSummaryCards";
import ReportFilters from "@/components/reports/ReportFilters";
import MonthlyRevenueChart from "@/components/reports/MonthlyRevenueChart";
import AppointmentStatusDistribution from "@/components/reports/AppointmentStatusDistribution";
import PatientGrowthChart from "@/components/reports/PatientGrowthChart";
import DoctorPerformanceTable from "@/components/reports/DoctorPerformanceTable";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F55]">Raporlar</h2>
        <p className="mt-2 text-sm text-[#667085]">
          Klinik performansını, gelirleri, randevuları ve hasta istatistiklerini analiz edin.
        </p>
      </div>

      <ReportFilters />

      <ReportSummaryCards />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MonthlyRevenueChart />
        </div>
        <AppointmentStatusDistribution />
      </div>

      <PatientGrowthChart />

      <DoctorPerformanceTable />
    </div>
  );
}
