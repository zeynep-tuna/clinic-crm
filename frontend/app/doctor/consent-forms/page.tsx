import DoctorConsentFormSummaryCards from "@/components/doctor/DoctorConsentFormSummaryCards";
import DoctorConsentFormsTable from "@/components/doctor/DoctorConsentFormsTable";

export default function DoctorConsentFormsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Onam Formları</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Hastalarınıza ait dijital onam formlarını görüntüleyin ve takip edin.
        </p>
      </div>

      <DoctorConsentFormSummaryCards />

      <DoctorConsentFormsTable />
    </div>
  );
}
