"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, type AuthUser, type UserRole } from "@/lib/auth";

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

export default function DoctorTopbar() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let cancelled = false;

    getCurrentUser()
      .then((user) => {
        if (!cancelled) setCurrentUser(user);
      })
      .catch(() => {
        // topbar identity is a display-only enhancement; failures are silently ignored
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="flex min-h-18 shrink-0 flex-wrap items-center justify-end gap-4 border-b border-[#EAF0F8]/60 bg-white px-6 py-3">
      <div className="flex items-center gap-2.5 border-l border-[#EAF0F8]/60 py-1 pl-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
          {currentUser ? getInitials(currentUser.fullName) : ""}
        </div>
        <div className="text-left leading-tight">
          <p className="text-sm font-medium text-[#0B1F55]">{currentUser?.fullName ?? ""}</p>
          <p className="text-xs text-[#667085]">{currentUser ? ROLE_LABELS[currentUser.role] : ""}</p>
        </div>
      </div>
    </header>
  );
}
