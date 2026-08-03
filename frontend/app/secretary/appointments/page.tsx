"use client";

import { useState } from "react";
import SecretaryAppointmentSummaryCards from "@/components/secretary/SecretaryAppointmentSummaryCards";
import SecretaryAppointmentsTable, { type FilterValue } from "@/components/secretary/SecretaryAppointmentsTable";
import AddSecretaryAppointmentModal from "@/components/secretary/AddSecretaryAppointmentModal";

export default function SecretaryAppointmentsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F55]">Randevular</h1>
          <p className="mt-1 text-sm text-[#667085]">
            Klinik randevularını planlayın, görüntüleyin ve takip edin.
          </p>
        </div>

        <AddSecretaryAppointmentModal />
      </div>

      <SecretaryAppointmentSummaryCards activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <SecretaryAppointmentsTable activeFilter={activeFilter} onFilterChange={setActiveFilter} />
    </div>
  );
}
