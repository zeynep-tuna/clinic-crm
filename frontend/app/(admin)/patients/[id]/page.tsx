"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ApiError } from "@/lib/api";
import { getPatient, type Patient } from "@/lib/patients-api";
import { listTreatmentPlans, type TreatmentPlan } from "@/lib/treatment-plans-api";
import { listAppointments, type Appointment, type AppointmentStatus } from "@/lib/appointments-api";
import { listPayments, type Payment } from "@/lib/payments-api";
import type { TreatmentRecord } from "@/data/patient-detail";
import PatientProfileCard, {
  type PatientProfileData,
} from "@/components/patient-detail/PatientProfileCard";
import TreatmentHistoryCard from "@/components/patient-detail/TreatmentHistoryCard";
import UpcomingAppointmentsCard from "@/components/patient-detail/UpcomingAppointmentsCard";
import PatientPaymentSummaryCard from "@/components/patient-detail/PatientPaymentSummaryCard";

const treatmentDateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const OPERATIONAL_STATUSES: AppointmentStatus[] = ["SCHEDULED", "CONFIRMED"];

function toTreatmentRecords(plans: TreatmentPlan[]): TreatmentRecord[] {
  return plans.map((plan) => ({
    date: treatmentDateFormatter.format(new Date(plan.startDate)),
    treatment: plan.description,
    doctor: plan.doctor.fullName,
    description: "—",
  }));
}

function PageHeader() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0B1F55]">Hasta Detayı</h2>
      <nav className="mt-2 flex items-center gap-1.5 text-sm text-[#667085]">
        <Link href="/patients" className="hover:text-[#5B4DE3]">
          Hastalar
        </Link>
        <span aria-hidden>&gt;</span>
        <span className="text-[#0B1F55]">Hasta Detayı</span>
      </nav>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        className="flex items-center gap-2 rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:bg-[#4c3fd1]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4M12 13v4M10 15h4" />
        </svg>
        Randevu Oluştur
      </button>

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-[#EAF0F8] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5a2.1 2.1 0 0 1 3 3L7 20l-4 1 1-4Z" />
        </svg>
        Düzenle
      </button>

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-[#EAF0F8] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5h16v10a1 1 0 0 1-1 1H8l-4 3.5v-3.5H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
        </svg>
        Mesaj Gönder
      </button>
    </div>
  );
}

function formatBirthDate(birthDate: string | null) {
  if (!birthDate) return "—";

  const [year, month, day] = birthDate.slice(0, 10).split("-");
  if (!year || !month || !day) return "—";

  return `${day}.${month}.${year}`;
}

function calculateAge(birthDate: string | null): number | null {
  if (!birthDate) return null;

  const [yearStr, monthStr, dayStr] = birthDate.slice(0, 10).split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (!year || !month || !day) return null;

  const today = new Date();
  let age = today.getFullYear() - year;
  const hadBirthdayThisYear =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!hadBirthdayThisYear) {
    age -= 1;
  }

  return age;
}

function toPatientProfileData(patient: Patient): PatientProfileData {
  const age = calculateAge(patient.birthDate);

  return {
    fullName: `${patient.firstName} ${patient.lastName}`.trim(),
    status: patient.isActive ? "Aktif" : "Pasif",
    age: age !== null ? String(age) : "—",
    gender: patient.gender ?? "—",
    phone: patient.phone ?? "—",
    email: patient.email ?? "—",
    birthDate: formatBirthDate(patient.birthDate),
    bloodType: "—",
    lastVisit: "—",
  };
}

export default function PatientDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([]);
  const [isLoadingTreatmentPlans, setIsLoadingTreatmentPlans] = useState(true);
  const [treatmentPlansError, setTreatmentPlansError] = useState<string | null>(null);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoadingRelatedRecords, setIsLoadingRelatedRecords] = useState(true);
  const [relatedRecordsError, setRelatedRecordsError] = useState<string | null>(null);

  const loadPatient = useCallback(async () => {
    setIsLoading(true);
    setNotFound(false);
    setError(null);

    try {
      const data = await getPatient(id);
      setPatient(data);
    } catch (fetchError) {
      if (fetchError instanceof ApiError && fetchError.status === 404) {
        setNotFound(true);
      } else {
        setError("Hasta bilgileri yüklenirken bir hata oluştu.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const loadTreatmentHistory = useCallback(async () => {
    setIsLoadingTreatmentPlans(true);
    setTreatmentPlansError(null);

    try {
      const data = await listTreatmentPlans({ patientId: id, includeInactive: true });
      setTreatmentPlans(data);
    } catch {
      setTreatmentPlansError("Tedavi planları yüklenirken bir hata oluştu.");
    } finally {
      setIsLoadingTreatmentPlans(false);
    }
  }, [id]);

  const loadRelatedRecords = useCallback(async () => {
    setIsLoadingRelatedRecords(true);
    setRelatedRecordsError(null);

    try {
      const [appointmentsData, paymentsData] = await Promise.all([
        listAppointments({ patientId: id, includeInactive: true }),
        listPayments({ includeInactive: true }),
      ]);
      setAppointments(appointmentsData);
      setPayments(paymentsData);
    } catch {
      setRelatedRecordsError("Randevu ve ödeme bilgileri yüklenirken bir hata oluştu.");
    } finally {
      setIsLoadingRelatedRecords(false);
    }
  }, [id]);

  useEffect(() => {
    loadPatient();
  }, [loadPatient]);

  useEffect(() => {
    loadTreatmentHistory();
  }, [loadTreatmentHistory]);

  useEffect(() => {
    loadRelatedRecords();
  }, [loadRelatedRecords]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <PageHeader />
        </div>

        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Hasta bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <PageHeader />
        </div>

        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-lg font-semibold text-[#0B1F55]">Hasta bulunamadı</p>
          <p className="mt-2 text-sm text-[#667085]">
            Aradığınız hasta kaydına ulaşılamadı. Lütfen hasta listesine geri dönün.
          </p>
          <Link
            href="/patients"
            className="mt-6 inline-block rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
          >
            Hasta Listesine Dön
          </Link>
        </div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <PageHeader />
        </div>

        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">
            {error ?? "Hasta bilgileri yüklenirken bir hata oluştu."}
          </p>
          <button
            type="button"
            onClick={loadPatient}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  const now = new Date();
  const upcomingAppointments = appointments
    .filter((appointment) => appointment.isActive)
    .filter((appointment) => OPERATIONAL_STATUSES.includes(appointment.status))
    .filter((appointment) => new Date(appointment.startAt) > now)
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  const patientPayments = payments.filter((payment) => payment.patientId === id);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader />
        <ActionButtons />
      </div>

      <PatientProfileCard patient={toPatientProfileData(patient)} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {isLoadingTreatmentPlans && (
          <div className="flex items-center justify-center rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <p className="text-sm text-[#667085]">Tedavi planları yükleniyor...</p>
          </div>
        )}

        {!isLoadingTreatmentPlans && treatmentPlansError && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <p className="text-sm text-[#EF4444]">{treatmentPlansError}</p>
            <button
              type="button"
              onClick={loadTreatmentHistory}
              className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {!isLoadingTreatmentPlans && !treatmentPlansError && (
          <TreatmentHistoryCard history={toTreatmentRecords(treatmentPlans)} />
        )}

        {isLoadingRelatedRecords && (
          <div className="flex items-center justify-center rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <p className="text-sm text-[#667085]">Randevu bilgileri yükleniyor...</p>
          </div>
        )}

        {!isLoadingRelatedRecords && relatedRecordsError && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <p className="text-sm text-[#EF4444]">{relatedRecordsError}</p>
            <button
              type="button"
              onClick={loadRelatedRecords}
              className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {!isLoadingRelatedRecords && !relatedRecordsError && (
          <UpcomingAppointmentsCard appointments={upcomingAppointments} />
        )}
      </div>

      {!isLoadingRelatedRecords && !relatedRecordsError && (
        <PatientPaymentSummaryCard payments={patientPayments} />
      )}
    </div>
  );
}
