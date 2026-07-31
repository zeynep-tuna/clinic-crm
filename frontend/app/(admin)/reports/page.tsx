import ReportSummaryCards from "@/components/reports/ReportSummaryCards";
import ReportFilters from "@/components/reports/ReportFilters";
import MonthlyRevenueChart from "@/components/reports/MonthlyRevenueChart";
import AppointmentStatusDistribution from "@/components/reports/AppointmentStatusDistribution";
import PatientGrowthChart from "@/components/reports/PatientGrowthChart";
import DoctorPerformanceTable from "@/components/reports/DoctorPerformanceTable";

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0 4-4m-4 4-4-4" />
      <path strokeLinecap="round" d="M4 18.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
    </svg>
  );
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F55]">Raporlar</h2>
          <p className="mt-2 text-sm text-[#667085]">
            Diş kliniğinizin gelir, randevu, hasta artışı ve hekim performansı verilerini analiz edin.
          </p>
        </div>

        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-xl border border-[#E3E8F0] bg-white px-5 text-sm font-semibold text-[#0B1F55] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)] transition-colors hover:bg-[#F7F8FF]"
        >
          <DownloadIcon />
          Raporu Dışa Aktar
        </button>
      </div>

      <ReportFilters />

      <ReportSummaryCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
