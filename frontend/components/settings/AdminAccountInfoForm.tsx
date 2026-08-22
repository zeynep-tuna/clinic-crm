import type { AuthUser, UserRole } from "@/lib/auth";

const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Klinik Yöneticisi",
  SECRETARY: "Sekreter",
  DOCTOR: "Doktor",
};

interface AdminAccountInfoFormProps {
  currentUser: AuthUser;
}

export default function AdminAccountInfoForm({ currentUser }: AdminAccountInfoFormProps) {
  const fields = [
    { label: "Ad Soyad", value: currentUser.fullName },
    { label: "E-posta", value: currentUser.email },
    { label: "Rol", value: ROLE_LABELS[currentUser.role] },
    { label: "Kayıt Durumu", value: currentUser.isActive ? "Aktif" : "Pasif" },
  ];

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Hesap Bilgileri</h2>

      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
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
