import DoctorAppointmentsTable from "@/components/doctor/DoctorAppointmentsTable";

export default function DoctorAppointmentsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Randevularım</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Randevularınızı, durumlarını ve geçmiş kayıtlarını görüntüleyin.
        </p>
      </div>

      <DoctorAppointmentsTable />
    </div>
  );
}
