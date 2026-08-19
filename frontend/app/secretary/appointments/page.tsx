"use client";

import { useCallback, useEffect, useState } from "react";
import SecretaryAppointmentSummaryCards from "@/components/secretary/SecretaryAppointmentSummaryCards";
import SecretaryAppointmentsTable, { type FilterValue } from "@/components/secretary/SecretaryAppointmentsTable";
import AddSecretaryAppointmentModal from "@/components/secretary/AddSecretaryAppointmentModal";
import { listAppointments, type Appointment } from "@/lib/appointments-api";

export default function SecretaryAppointmentsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await listAppointments({ includeInactive: true });
      setAppointments(data);
    } catch {
      setError("Randevular yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F55]">Randevular</h1>
          <p className="mt-1 text-sm text-[#667085]">
            Klinik randevularını planlayın, görüntüleyin ve takip edin.
          </p>
        </div>

        <AddSecretaryAppointmentModal onCreated={loadAppointments} />
      </div>

      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Randevular yükleniyor...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">{error}</p>
          <button
            type="button"
            onClick={loadAppointments}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <SecretaryAppointmentSummaryCards
            appointments={appointments}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <SecretaryAppointmentsTable
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            appointments={appointments}
            onRefresh={loadAppointments}
          />
        </>
      )}
    </div>
  );
}
