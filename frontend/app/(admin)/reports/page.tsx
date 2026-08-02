import ReportSummaryCards from "@/components/reports/ReportSummaryCards";
import ReportFilters from "@/components/reports/ReportFilters";
import MonthlyRevenueChart from "@/components/reports/MonthlyRevenueChart";
import AppointmentStatusDistribution from "@/components/reports/AppointmentStatusDistribution";
import PatientGrowthChart from "@/components/reports/PatientGrowthChart";
import DoctorPerformanceTable from "@/components/reports/DoctorPerformanceTable";

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
      />
      <path strokeLinecap="round" d="M8.5 14h2M8.5 17h5" />
    </svg>
  );
}

function ExcelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path strokeLinecap="round" d="M3.5 10h17M9.5 4v16" />
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-xl border border-[#EAF0F8] bg-white px-4 text-sm font-semibold text-[#0B1F55] shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-colors hover:bg-[#F7F8FF]"
          >
            <PdfIcon />
            PDF
          </button>
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-xl border border-[#EAF0F8] bg-white px-4 text-sm font-semibold text-[#0B1F55] shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-colors hover:bg-[#F7F8FF]"
          >
            <ExcelIcon />
            Excel
          </button>
        </div>
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
