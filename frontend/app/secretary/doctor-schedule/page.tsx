import SecretaryDoctorScheduleSummaryCards from "@/components/secretary/SecretaryDoctorScheduleSummaryCards";
import SecretaryDoctorScheduleTable from "@/components/secretary/SecretaryDoctorScheduleTable";

export default function SecretaryDoctorSchedulePage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Doktor Takvimi</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Doktorların günlük randevu yoğunluğunu ve müsaitlik durumlarını takip edin.
        </p>
      </div>

      <SecretaryDoctorScheduleSummaryCards />

      <SecretaryDoctorScheduleTable />
    </div>
  );
}
