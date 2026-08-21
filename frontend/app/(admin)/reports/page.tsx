"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReportSummaryCards, { type ReportSummaryStat } from "@/components/reports/ReportSummaryCards";
import MonthlyRevenueChart from "@/components/reports/MonthlyRevenueChart";
import AppointmentStatusDistribution from "@/components/reports/AppointmentStatusDistribution";
import PatientGrowthChart from "@/components/reports/PatientGrowthChart";
import DoctorPerformanceTable from "@/components/reports/DoctorPerformanceTable";
import { listPatients, type Patient } from "@/lib/patients-api";
import { listDoctors, type Doctor } from "@/lib/doctors-api";
import { listAppointments, type Appointment } from "@/lib/appointments-api";
import { listPayments, type Payment } from "@/lib/payments-api";

export default function ReportsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReportsData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [patientsData, doctorsData, appointmentsData, paymentsData] = await Promise.all([
        listPatients({ includeInactive: true }),
        listDoctors({ includeInactive: true }),
        listAppointments({ includeInactive: true }),
        listPayments({ includeInactive: true }),
      ]);
      setPatients(patientsData);
      setDoctors(doctorsData);
      setAppointments(appointmentsData);
      setPayments(paymentsData);
    } catch {
      setError("Dashboard verileri yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReportsData();
  }, [loadReportsData]);

  const summaryStats = useMemo<ReportSummaryStat[]>(() => {
    const activePayments = payments.filter((payment) => payment.isActive);
    const totalRevenue = activePayments.reduce((total, payment) => {
      const value = Number(payment.amount);
      return total + (Number.isFinite(value) ? value : 0);
    }, 0);

    return [
      { id: "total-revenue", title: "Toplam Gelir", value: totalRevenue, format: "currency" },
      {
        id: "total-appointments",
        title: "Aktif Randevu Kaydı",
        value: appointments.filter((appointment) => appointment.isActive).length,
        format: "number",
      },
      {
        id: "active-patients",
        title: "Aktif Hasta",
        value: patients.filter((patient) => patient.isActive).length,
        format: "number",
      },
      {
        id: "active-doctors",
        title: "Aktif Hekim",
        value: doctors.filter((doctor) => doctor.isActive).length,
        format: "number",
      },
    ];
  }, [patients, doctors, appointments, payments]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F55]">Raporlar</h2>
        <p className="mt-2 text-sm text-[#667085]">
          Diş kliniğinizin gelir, randevu ve hasta artışı verilerini analiz edin.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Dashboard verileri yükleniyor...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">{error}</p>
          <button
            type="button"
            onClick={loadReportsData}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <ReportSummaryCards stats={summaryStats} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <MonthlyRevenueChart payments={payments} />
            </div>
            <AppointmentStatusDistribution appointments={appointments} />
          </div>

          <PatientGrowthChart patients={patients} />

          <DoctorPerformanceTable doctors={doctors} appointments={appointments} payments={payments} />
        </>
      )}
    </div>
  );
}
