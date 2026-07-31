import PatientsTable from "@/components/patients/PatientsTable";
import AddPatientModal from "@/components/patients/AddPatientModal";

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F55]">Hastalar</h2>
          <p className="mt-2 text-sm text-[#667085]">
            Diş kliniğinizde kayıtlı hastaları görüntüleyin, takip edin ve yönetin.
          </p>
        </div>

        <AddPatientModal />
      </div>

      <PatientsTable />
    </div>
  );
}
