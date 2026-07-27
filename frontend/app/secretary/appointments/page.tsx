import SecretaryAppointmentSummaryCards from "@/components/secretary/SecretaryAppointmentSummaryCards";
import SecretaryAppointmentsTable from "@/components/secretary/SecretaryAppointmentsTable";

export default function SecretaryAppointmentsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F55]">Randevular</h1>
          <p className="mt-1 text-sm text-[#667085]">
            Klinik randevularını planlayın, görüntüleyin ve takip edin.
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
        >
          + Yeni Randevu Ekle
        </button>
      </div>

      <SecretaryAppointmentSummaryCards />

      <SecretaryAppointmentsTable />
    </div>
  );
}
