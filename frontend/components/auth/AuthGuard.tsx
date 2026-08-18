"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getRoleHome, validateCurrentUser, type UserRole } from "@/lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

type GuardStatus = "checking" | "authorized" | "error";

export default function AuthGuard({ children, allowedRole }: AuthGuardProps) {
  const router = useRouter();
  const [status, setStatus] = useState<GuardStatus>("checking");
  const isMountedRef = useRef(true);

  const runCheck = useCallback(async () => {
    setStatus("checking");

    try {
      const user = await validateCurrentUser();

      if (!isMountedRef.current) return;

      if (!user) {
        router.replace("/login");
        return;
      }

      if (user.role !== allowedRole) {
        router.replace(getRoleHome(user.role));
        return;
      }

      setStatus("authorized");
    } catch {
      if (!isMountedRef.current) return;
      setStatus("error");
    }
  }, [allowedRole, router]);

  useEffect(() => {
    isMountedRef.current = true;
    runCheck();

    return () => {
      isMountedRef.current = false;
    };
  }, [runCheck]);

  if (status === "error") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-[#F7F8FF]">
        <p className="text-sm text-[#667085]">Oturum doğrulanırken bir hata oluştu.</p>
        <button
          type="button"
          onClick={runCheck}
          className="rounded-xl border border-[#EAF0F8] bg-white px-4 py-2 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  if (status !== "authorized") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F7F8FF]">
        <p className="text-sm text-[#667085]">Oturum kontrol ediliyor...</p>
      </div>
    );
  }

  return <>{children}</>;
}
