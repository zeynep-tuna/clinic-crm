import DoctorsTable from "@/components/doctors/DoctorsTable";
import AddDoctorModal from "@/components/doctors/AddDoctorModal";

export default function DoctorsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F55]">Doktorlar</h2>
          <p className="mt-2 text-sm text-[#667085]">
            Klinik doktorlarını görüntüleyin, uzmanlık alanlarını ve durumlarını yönetin.
          </p>
        </div>

        <AddDoctorModal />
      </div>

      <DoctorsTable />
    </div>
  );
}
