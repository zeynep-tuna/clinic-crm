"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ApiError } from "@/lib/api";
import { getPatient, type Patient } from "@/lib/patients-api";
import type {
  TreatmentRecord,
  UpcomingAppointment,
  PatientPaymentSummary,
  DoctorNote,
} from "@/data/patient-detail";
import PatientProfileCard, {
  type PatientProfileData,
} from "@/components/patient-detail/PatientProfileCard";
import TreatmentHistoryCard from "@/components/patient-detail/TreatmentHistoryCard";
import UpcomingAppointmentsCard from "@/components/patient-detail/UpcomingAppointmentsCard";
import PatientPaymentSummaryCard from "@/components/patient-detail/PatientPaymentSummaryCard";
import DoctorNotesCard from "@/components/patient-detail/DoctorNotesCard";

const EMPTY_TREATMENT_HISTORY: TreatmentRecord[] = [];
const EMPTY_UPCOMING_APPOINTMENTS: UpcomingAppointment[] = [];
const EMPTY_PAYMENT_SUMMARY: PatientPaymentSummary = {
  total: 0,
  paid: 0,
  pending: 0,
  pendingInvoiceCount: 0,
};
const EMPTY_DOCTOR_NOTES: DoctorNote[] = [];

function PageHeader() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0B1F55]">Hasta Detayı</h2>
      <nav className="mt-2 flex items-center gap-1.5 text-sm text-[#667085]">
        <Link href="/secretary/patients" className="hover:text-[#5B4DE3]">
          Hastalar
        </Link>
        <span aria-hidden>&gt;</span>
        <span className="text-[#0B1F55]">Hasta Detayı</span>
      </nav>
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

export default function SecretaryPatientDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    loadPatient();
  }, [loadPatient]);

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
            href="/secretary/patients"
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

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader />
      </div>

      <PatientProfileCard patient={toPatientProfileData(patient)} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <TreatmentHistoryCard history={EMPTY_TREATMENT_HISTORY} />
        <UpcomingAppointmentsCard appointments={EMPTY_UPCOMING_APPOINTMENTS} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <PatientPaymentSummaryCard summary={EMPTY_PAYMENT_SUMMARY} />
        <DoctorNotesCard notes={EMPTY_DOCTOR_NOTES} />
      </div>
    </div>
  );
}
