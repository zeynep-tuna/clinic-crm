import DoctorPaymentsTable from "@/components/doctor/DoctorPaymentsTable";

export default function DoctorPaymentsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Ödemeler</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Randevularınıza bağlı hasta ödemelerini ve tahsilat durumlarını takip edin.
        </p>
      </div>

      <DoctorPaymentsTable />
    </div>
  );
}
