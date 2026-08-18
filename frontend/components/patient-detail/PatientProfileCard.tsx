import type { PatientStatus } from "@/data/patients";

export interface PatientProfileData {
  fullName: string;
  status: PatientStatus;
  age: string;
  gender: string;
  phone: string;
  email: string;
  birthDate: string;
  bloodType: string;
  lastVisit: string;
}

const statusBadgeClass: Record<PatientStatus, string> = {
  Aktif: "bg-[#DCFCE7] text-[#16A34A]",
  "Kontrol Bekliyor": "bg-[#FEF3C7] text-[#F59E0B]",
  Pasif: "bg-[#F3F4F6] text-[#667085]",
};

function InfoIcon({ type }: { type: "age" | "gender" | "phone" | "email" | "calendar" | "blood" | "visit" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    className: "h-4 w-4",
  };

  switch (type) {
    case "age":
    case "calendar":
    case "visit":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "gender":
      return (
        <svg {...common}>
          <circle cx="10" cy="14" r="5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l5-5m0 0h-4m4 0v4" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5h3.2l1.3 4-2 1.4a11 11 0 0 0 5.1 5.1l1.4-2 4 1.3v3.2c0 1-.9 1.8-1.9 1.6-8-1-13.9-6.9-14.9-14.9-.1-1 .7-1.9 1.8-1.7Z" />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="14" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.5l8 6 8-6" />
        </svg>
      );
    case "blood":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z" />
        </svg>
      );
    default:
      return null;
  }
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: "age" | "gender" | "phone" | "email" | "calendar" | "blood" | "visit";
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#5B4DE3]">
        <InfoIcon type={icon} />
      </div>
      <div>
        <p className="text-xs text-[#667085]">{label}</p>
        <p className="text-sm font-semibold text-[#0B1F55]">{value}</p>
      </div>
    </div>
  );
}

export default function PatientProfileCard({ patient }: { patient: PatientProfileData }) {
  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-7 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-center gap-8">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-3xl font-bold text-[#5B4DE3]">
          {patient.fullName.charAt(0)}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold text-[#0B1F55]">{patient.fullName}</h3>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass[patient.status]}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {patient.status}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
            <InfoItem icon="age" label="Yaş" value={patient.age} />
            <InfoItem icon="gender" label="Cinsiyet" value={patient.gender} />
            <InfoItem icon="phone" label="Telefon" value={patient.phone} />
            <InfoItem icon="email" label="E-posta" value={patient.email} />

            <div className="sm:col-start-1">
              <InfoItem icon="calendar" label="Doğum Tarihi" value={patient.birthDate} />
            </div>
            <div className="sm:col-start-2">
              <InfoItem icon="blood" label="Kan Grubu" value={patient.bloodType} />
            </div>
            <div className="sm:col-start-3">
              <InfoItem icon="visit" label="Son Ziyaret" value={patient.lastVisit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
