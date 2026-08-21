"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { listDoctors, type Doctor } from "@/lib/doctors-api";
import { listAppointments, type Appointment, type AppointmentStatus } from "@/lib/appointments-api";
import SecretaryDoctorScheduleSummaryCards from "@/components/secretary/SecretaryDoctorScheduleSummaryCards";
import SecretaryDoctorScheduleTable from "@/components/secretary/SecretaryDoctorScheduleTable";
import SecretaryDoctorScheduleDetail from "@/components/secretary/SecretaryDoctorScheduleDetail";

const OPERATIONAL_STATUSES: AppointmentStatus[] = ["SCHEDULED", "CONFIRMED"];

function isOperational(appointment: Appointment) {
  return OPERATIONAL_STATUSES.includes(appointment.status);
}

function isToday(value: string) {
  const date = new Date(value);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function toLocalDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function SecretaryDoctorSchedulePage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => toLocalDateInputValue(new Date()));

  const loadScheduleData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [doctorsData, appointmentsData] = await Promise.all([listDoctors(), listAppointments()]);
      setDoctors(doctorsData);
      setAppointments(appointmentsData);
      setSelectedDoctorId((current) => current ?? doctorsData[0]?.id ?? null);
    } catch {
      setError("Doktor takvimi yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadScheduleData();
  }, [loadScheduleData]);

  const todayAppointments = useMemo(
    () => appointments.filter((appointment) => isToday(appointment.startAt) && isOperational(appointment)),
    [appointments]
  );

  const selectedDoctor = useMemo(
    () => doctors.find((doctor) => doctor.id === selectedDoctorId) ?? null,
    [doctors, selectedDoctorId]
  );

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Doktor Takvimi</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Doktorların günlük randevu yoğunluğunu ve programlarını takip edin.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Doktor takvimi yükleniyor...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">{error}</p>
          <button
            type="button"
            onClick={loadScheduleData}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <SecretaryDoctorScheduleSummaryCards
            activeDoctorCount={doctors.length}
            todayAppointmentCount={todayAppointments.length}
          />

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.4fr_1fr]">
            <SecretaryDoctorScheduleTable
              doctors={doctors}
              todayAppointments={todayAppointments}
              selectedDoctorId={selectedDoctorId}
              onSelectDoctor={setSelectedDoctorId}
            />

            <SecretaryDoctorScheduleDetail
              doctor={selectedDoctor}
              appointments={appointments}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
        </>
      )}
    </div>
  );
}
