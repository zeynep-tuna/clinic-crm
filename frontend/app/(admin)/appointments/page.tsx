import AppointmentsTable from "@/components/appointments/AppointmentsTable";
import AddAppointmentModal from "@/components/appointments/AddAppointmentModal";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F55]">Randevular</h2>
          <p className="mt-2 text-sm text-[#667085]">
            Diş kliniğinizdeki randevuları görüntüleyin, takip edin ve yönetin.
          </p>
        </div>

        <AddAppointmentModal />
      </div>

      <AppointmentsTable />
    </div>
  );
}
