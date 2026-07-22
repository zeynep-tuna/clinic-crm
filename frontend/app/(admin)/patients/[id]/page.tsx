import Link from "next/link";
import { getPatientDetailById } from "@/data/patient-detail";
import PatientProfileCard from "@/components/patient-detail/PatientProfileCard";
import TreatmentHistoryCard from "@/components/patient-detail/TreatmentHistoryCard";
import UpcomingAppointmentsCard from "@/components/patient-detail/UpcomingAppointmentsCard";
import PatientPaymentSummaryCard from "@/components/patient-detail/PatientPaymentSummaryCard";
import DoctorNotesCard from "@/components/patient-detail/DoctorNotesCard";

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
        className="flex items-center gap-2 rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)] hover:bg-[#4c3fd1]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4M12 13v4M10 15h4" />
        </svg>
        Randevu Oluştur
      </button>

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-[#E3E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5a2.1 2.1 0 0 1 3 3L7 20l-4 1 1-4Z" />
        </svg>
        Düzenle
      </button>

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-[#E3E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5h16v10a1 1 0 0 1-1 1H8l-4 3.5v-3.5H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
        </svg>
        Mesaj Gönder
      </button>
    </div>
  );
}

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = getPatientDetailById(id);

  if (!patient) {
    return (
      <div className="space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <PageHeader />
        </div>

        <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-10 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
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

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader />
        <ActionButtons />
      </div>

      <PatientProfileCard patient={patient} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <TreatmentHistoryCard history={patient.treatmentHistory} />
        <UpcomingAppointmentsCard appointments={patient.upcomingAppointments} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <PatientPaymentSummaryCard summary={patient.paymentSummary} />
        <DoctorNotesCard notes={patient.doctorNotes} />
      </div>
    </div>
  );
}
