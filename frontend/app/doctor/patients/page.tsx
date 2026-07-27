import DoctorPatientsTable from "@/components/doctor/DoctorPatientsTable";

export default function DoctorPatientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Hastalarım</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Sorumlu olduğunuz hastaları görüntüleyin ve takip edin.
        </p>
      </div>

      <DoctorPatientsTable />
    </div>
  );
}
