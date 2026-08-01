import DoctorTreatmentPlansTable from "@/components/doctor/DoctorTreatmentPlansTable";

export default function DoctorTreatmentPlansPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Tedavi Planlarım</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Hastalarınız için oluşturulan diş tedavi planlarını, önceliklerini ve güncel durumlarını takip edin.
        </p>
      </div>

      <DoctorTreatmentPlansTable />
    </div>
  );
}
