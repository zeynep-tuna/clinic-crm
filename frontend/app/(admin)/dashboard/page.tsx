"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import TodayAppointments from "@/components/dashboard/TodayAppointments";
import RecentPatients from "@/components/dashboard/RecentPatients";
import PaymentSummary from "@/components/dashboard/PaymentSummary";
import { listPatients, type Patient } from "@/lib/patients-api";
import { listDoctors, type Doctor } from "@/lib/doctors-api";
import { listAppointments, type Appointment, type AppointmentStatus } from "@/lib/appointments-api";
import { listPayments, type Payment } from "@/lib/payments-api";

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

function formatCurrency(amount: number) {
  return `₺${amount.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function DashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = useCallback(async () => {
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
    loadDashboardData();
  }, [loadDashboardData]);

  const todayAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => appointment.isActive && isToday(appointment.startAt) && isOperational(appointment)
      ),
    [appointments]
  );

  const activePatients = useMemo(() => patients.filter((patient) => patient.isActive), [patients]);
  const activeDoctors = useMemo(() => doctors.filter((doctor) => doctor.isActive), [doctors]);

  const totalCollected = useMemo(() => {
    return payments
      .filter((payment) => payment.isActive)
      .reduce((total, payment) => {
        const value = Number(payment.amount);
        return total + (Number.isFinite(value) ? value : 0);
      }, 0);
  }, [payments]);

  const recentPatients = useMemo(() => {
    return [...activePatients]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4);
  }, [activePatients]);

  if (isLoading) {
    return (
      <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <p className="text-sm text-[#667085]">Dashboard verileri yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <p className="text-sm text-[#EF4444]">{error}</p>
        <button
          type="button"
          onClick={loadDashboardData}
          className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Aktif Hasta"
          value={activePatients.length.toLocaleString("tr-TR")}
          icon="patients"
          href="/patients"
          linkLabel="Tüm hastaları gör →"
        />
        <StatCard
          title="Bugünkü Randevu"
          value={todayAppointments.length.toLocaleString("tr-TR")}
          icon="appointments"
          href="/appointments"
          linkLabel="Tüm randevuları gör →"
        />
        <StatCard
          title="Toplam Tahsilat"
          value={formatCurrency(totalCollected)}
          icon="payments"
          href="/payments"
          linkLabel="Ödemeleri gör →"
          iconVariant="warning"
        />
        <StatCard
          title="Aktif Doktor"
          value={activeDoctors.length.toLocaleString("tr-TR")}
          icon="doctors"
          href="/doctors"
          linkLabel="Doktorları gör →"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TodayAppointments appointments={todayAppointments} />
        </div>

        <div className="space-y-6">
          <RecentPatients patients={recentPatients} />
          <PaymentSummary payments={payments} />
        </div>
      </div>
    </div>
  );
}
