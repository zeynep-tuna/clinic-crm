"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import SecretaryStatCard from "@/components/secretary/SecretaryStatCard";
import SecretaryTodayAppointments from "@/components/secretary/SecretaryTodayAppointments";
import SecretaryPaymentStatus from "@/components/secretary/SecretaryPaymentStatus";
import SecretaryDoctorSchedule from "@/components/secretary/SecretaryDoctorSchedule";
import SecretaryRecentPatients from "@/components/secretary/SecretaryRecentPatients";
import { listPatients, type Patient } from "@/lib/patients-api";
import { listDoctors, type Doctor } from "@/lib/doctors-api";
import { listAppointments, type Appointment, type AppointmentStatus } from "@/lib/appointments-api";
import { listPayments, type Payment } from "@/lib/payments-api";
import { listConsentForms, type ConsentForm } from "@/lib/consent-forms-api";
import { getCurrentUser, type AuthUser } from "@/lib/auth";

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

function BannerCalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0 text-[#DCD8FF]">
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z" />
    </svg>
  );
}

const todayLabelFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
});

export default function SecretaryDashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [consentForms, setConsentForms] = useState<ConsentForm[]>([]);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [user, patientsData, doctorsData, appointmentsData, paymentsData, consentFormsData] = await Promise.all([
        getCurrentUser(),
        listPatients({ includeInactive: true }),
        listDoctors({ includeInactive: true }),
        listAppointments({ includeInactive: true }),
        listPayments({ includeInactive: true }),
        listConsentForms({ includeInactive: true }),
      ]);
      setCurrentUser(user);
      setPatients(patientsData);
      setDoctors(doctorsData);
      setAppointments(appointmentsData);
      setPayments(paymentsData);
      setConsentForms(consentFormsData);
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

  const newPatientsToday = useMemo(
    () => activePatients.filter((patient) => isToday(patient.createdAt)).length,
    [activePatients]
  );

  const totalCollected = useMemo(() => {
    return payments
      .filter((payment) => payment.isActive)
      .reduce((total, payment) => {
        const value = Number(payment.amount);
        return total + (Number.isFinite(value) ? value : 0);
      }, 0);
  }, [payments]);

  const pendingConsentCount = useMemo(
    () => consentForms.filter((form) => form.isActive && form.status === "PENDING").length,
    [consentForms]
  );

  const recentPatients = useMemo(() => {
    return [...activePatients]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4);
  }, [activePatients]);

  const todayLabel = todayLabelFormatter.format(new Date());

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#DCD8FF] bg-linear-to-r from-white to-[#F7F8FF] px-6 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            👋
          </span>

          <div>
            <p className="text-base font-semibold text-[#0B1F55]">
              Hoş geldiniz{currentUser ? `, ${currentUser.fullName}` : ""}!
            </p>
            <p className="mt-0.5 text-sm text-[#667085]">
              Kliniğinizdeki güncel durumu aşağıdan hızlıca takip edebilirsiniz.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-[#667085]">
            <BannerCalendarIcon />
            <span>{todayLabel}</span>
          </div>
          <SparkleIcon />
        </div>
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
            onClick={loadDashboardData}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <SecretaryStatCard
              title="Bugünkü Randevular"
              value={todayAppointments.length.toLocaleString("tr-TR")}
              icon="appointments"
              href="/secretary/appointments"
              linkLabel="Tüm randevuları gör →"
            />
            <SecretaryStatCard
              title="Bugün Eklenen Hasta"
              value={newPatientsToday.toLocaleString("tr-TR")}
              icon="newPatient"
              href="/secretary/patients"
              linkLabel="Yeni kayıtları gör →"
            />
            <SecretaryStatCard
              title="Toplam Tahsilat"
              value={formatCurrency(totalCollected)}
              icon="payments"
              href="/secretary/payments"
              linkLabel="Ödemeleri gör →"
            />
            <SecretaryStatCard
              title="Onam Bekleyen"
              value={pendingConsentCount.toLocaleString("tr-TR")}
              icon="consent"
              href="/secretary/consent-forms"
              linkLabel="Onam formlarını gör →"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SecretaryTodayAppointments appointments={todayAppointments} />
            <SecretaryDoctorSchedule doctors={doctors} todayAppointments={todayAppointments} />
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[2fr_1fr]">
            <SecretaryRecentPatients patients={recentPatients} />
            <SecretaryPaymentStatus payments={payments} />
          </div>
        </>
      )}
    </div>
  );
}
