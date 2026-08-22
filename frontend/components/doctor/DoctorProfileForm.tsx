import type { AuthUser } from "@/lib/auth";
import type { Doctor } from "@/lib/doctors-api";

interface DoctorProfileFormProps {
  currentUser: AuthUser;
  doctor: Doctor | null;
}

export default function DoctorProfileForm({ currentUser, doctor }: DoctorProfileFormProps) {
  const fields = [
    { label: "Ad Soyad", value: currentUser.fullName },
    { label: "E-posta", value: currentUser.email },
    { label: "Uzmanlık", value: doctor?.specialty ?? "—" },
    { label: "Telefon", value: doctor?.phone ?? "—" },
  ];

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Profil Bilgileri</h2>

      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label}>
            <p className="text-xs font-medium text-[#667085]">{field.label}</p>
            <p className="mt-1 text-sm text-[#0B1F55]">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
