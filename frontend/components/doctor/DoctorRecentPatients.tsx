import Link from "next/link";
import type { Appointment } from "@/lib/appointments-api";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const avatarPalette = [
  "bg-[#EEF0FF] text-[#5B4DE3]",
  "bg-[#DBEAFE] text-[#2563EB]",
  "bg-[#CCFBF1] text-[#0F766E]",
  "bg-[#FFEDD5] text-[#C2410C]",
  "bg-[#F3F4F6] text-[#475467]",
];

function getAvatarColor(id: string) {
  const sum = id.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return avatarPalette[sum % avatarPalette.length];
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
    </svg>
  );
}

interface RecentPatientEntry {
  patientId: string;
  name: string;
  lastVisit: string;
}

function buildRecentPatients(appointments: Appointment[]): RecentPatientEntry[] {
  const byPatient = new Map<string, Appointment>();

  for (const appointment of appointments) {
    const existing = byPatient.get(appointment.patientId);
    if (!existing || new Date(appointment.startAt) > new Date(existing.startAt)) {
      byPatient.set(appointment.patientId, appointment);
    }
  }

  return Array.from(byPatient.values())
    .sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime())
    .slice(0, 5)
    .map((appointment) => ({
      patientId: appointment.patientId,
      name: `${appointment.patient.firstName} ${appointment.patient.lastName}`.trim(),
      lastVisit: dateFormatter.format(new Date(appointment.startAt)),
    }));
}

interface DoctorRecentPatientsProps {
  appointments: Appointment[];
}

export default function DoctorRecentPatients({ appointments }: DoctorRecentPatientsProps) {
  const recentPatients = buildRecentPatients(appointments);

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#0B1F55]">Son Hastalarım</h2>
        <Link
          href="/doctor/patients"
          className="rounded-lg border border-[#EAF0F8] px-2.5 py-1 text-xs font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </Link>
      </div>

      {recentPatients.length === 0 ? (
        <p className="mt-4 py-4 text-center text-sm text-[#667085]">Henüz randevusu olan hastanız bulunmuyor.</p>
      ) : (
        <div className="mt-3 divide-y divide-[#EEF2F8]">
          {recentPatients.map((patient) => (
            <div key={patient.patientId} className="flex items-center justify-between gap-3 py-2.5">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarColor(patient.patientId)}`}
                >
                  {patient.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#0B1F55]">{patient.name}</p>
                  <p className="truncate text-xs text-[#667085]">Son ziyaret: {patient.lastVisit}</p>
                </div>
              </div>

              <span className="shrink-0 text-[#98A2B3]">
                <ArrowIcon />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
