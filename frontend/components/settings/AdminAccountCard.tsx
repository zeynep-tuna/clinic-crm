import type { AuthUser, UserRole } from "@/lib/auth";

const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Klinik Yöneticisi",
  SECRETARY: "Sekreter",
  DOCTOR: "Doktor",
};

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

interface AdminAccountCardProps {
  currentUser: AuthUser;
}

export default function AdminAccountCard({ currentUser }: AdminAccountCardProps) {
  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-lg font-bold text-[#5B4DE3]">
          {getInitials(currentUser.fullName)}
        </div>

        <div className="min-w-0">
          <p className="truncate text-base font-bold text-[#0B1F55]">{currentUser.fullName}</p>
          <p className="text-sm text-[#667085]">{ROLE_LABELS[currentUser.role]}</p>
        </div>
      </div>

      <span
        className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
          currentUser.isActive ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#F3F4F6] text-[#667085]"
        }`}
      >
        {currentUser.isActive ? "Aktif" : "Pasif"}
      </span>
    </div>
  );
}
