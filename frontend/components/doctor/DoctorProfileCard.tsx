import type { AuthUser } from "@/lib/auth";
import type { Doctor } from "@/lib/doctors-api";

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

interface DoctorProfileCardProps {
  currentUser: AuthUser;
  doctor: Doctor | null;
}

export default function DoctorProfileCard({ currentUser, doctor }: DoctorProfileCardProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-xl font-bold text-[#5B4DE3]">
          {getInitials(currentUser.fullName)}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-bold text-[#0B1F55]">{currentUser.fullName}</p>
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                currentUser.isActive ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#F3F4F6] text-[#667085]"
              }`}
            >
              {currentUser.isActive ? "Aktif" : "Pasif"}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-[#667085]">
            Doktor{doctor?.specialty ? ` · ${doctor.specialty}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
