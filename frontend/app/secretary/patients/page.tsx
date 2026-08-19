"use client";

import { useCallback, useEffect, useState } from "react";
import SecretaryPatientsTable, { type FilterValue } from "@/components/secretary/SecretaryPatientsTable";
import AddSecretaryPatientModal from "@/components/secretary/AddSecretaryPatientModal";
import { listPatients, type Patient } from "@/lib/patients-api";

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <circle cx="9" cy="8" r="3" />
      <path strokeLinecap="round" d="M2.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
      <path strokeLinecap="round" d="M15.5 5.5a3 3 0 0 1 0 5.8M18 19c-.4-2.3-1.5-4-3.2-4.8" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}

function PauseCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" d="M10 9.5v5M14 9.5v5" />
    </svg>
  );
}

export default function SecretaryPatientsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPatients = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await listPatients({ includeInactive: true });
      setPatients(data);
    } catch {
      setError("Hastalar yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  const total = patients.length;
  const activeCount = patients.filter((patient) => patient.isActive).length;
  // Backend'de "Kontrol Bekliyor" durumunun karşılığı yok.
  const pendingCount = 0;
  const inactiveCount = patients.filter((patient) => !patient.isActive).length;

  const summaryItems: { label: string; value: number; icon: React.ReactNode; color: string; filterValue: FilterValue }[] = [
    { label: "Toplam Hasta", value: total, icon: <UsersIcon />, color: "bg-[#EEF0FF] text-[#5B4DE3]", filterValue: "Tümü" },
    {
      label: "Aktif Hastalar",
      value: activeCount,
      icon: <CheckCircleIcon />,
      color: "bg-[#DCFCE7] text-[#16A34A]",
      filterValue: "Aktif",
    },
    {
      label: "Kontrol Bekliyor",
      value: pendingCount,
      icon: <ClockIcon />,
      color: "bg-[#FEF3C7] text-[#F59E0B]",
      filterValue: "Kontrol Bekliyor",
    },
    {
      label: "Pasif Hastalar",
      value: inactiveCount,
      icon: <PauseCircleIcon />,
      color: "bg-[#F3F4F6] text-[#667085]",
      filterValue: "Pasif",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[20px] border border-[#EAF0F8] bg-white px-6 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-1.5 text-xs text-[#98A2B3]">
          <span>ClinicCRM</span>
          <span className="text-[#D0D5DD]">&gt;</span>
          <span className="font-medium text-[#0B1F55]">Hastalar</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F55]">Hastalar</h1>
            <p className="mt-1 text-sm text-[#667085]">
              Hasta kayıtlarını görüntüleyin, takip edin ve yönetin.
            </p>
          </div>

          <AddSecretaryPatientModal onCreated={loadPatients} />
        </div>
      </div>

      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Hastalar yükleniyor...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">{error}</p>
          <button
            type="button"
            onClick={loadPatients}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EAF0F8]/60">
            {summaryItems.map((item) => {
              const isSelected = activeFilter === item.filterValue;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveFilter(item.filterValue)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors sm:px-5 sm:first:pl-2 sm:first:ml-0 sm:last:pr-2 ${
                    isSelected ? "bg-[#F7F8FF]" : "hover:bg-[#F7F8FF]"
                  }`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xl font-bold text-[#0B1F55]">{item.value}</p>
                    <p className="text-xs text-[#667085]">{item.label}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <SecretaryPatientsTable activeFilter={activeFilter} onFilterChange={setActiveFilter} patients={patients} />
        </>
      )}
    </div>
  );
}
