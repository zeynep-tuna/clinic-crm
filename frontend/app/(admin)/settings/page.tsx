"use client";

import { useCallback, useEffect, useState } from "react";
import { getCurrentUser, type AuthUser } from "@/lib/auth";
import AdminAccountCard from "@/components/settings/AdminAccountCard";
import AdminAccountInfoForm from "@/components/settings/AdminAccountInfoForm";
import ChangePasswordForm from "@/components/account/ChangePasswordForm";

export default function SettingsPage() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch {
      setError("Hesap bilgileri yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Ayarlar</h1>
        <p className="mt-1 text-sm text-[#667085]">Hesap bilgilerinizi görüntüleyin ve şifrenizi yönetin.</p>
      </div>

      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Hesap bilgileri yükleniyor...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">{error}</p>
          <button
            type="button"
            onClick={loadProfile}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && currentUser && (
        <>
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_2fr]">
            <AdminAccountCard currentUser={currentUser} />
            <AdminAccountInfoForm currentUser={currentUser} />
          </div>
          <ChangePasswordForm />
        </>
      )}
    </div>
  );
}
