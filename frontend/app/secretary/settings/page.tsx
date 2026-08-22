"use client";

import { useCallback, useEffect, useState } from "react";
import { getCurrentUser, type AuthUser } from "@/lib/auth";
import SecretarySettingsProfileCard from "@/components/secretary/SecretarySettingsProfileCard";
import SecretarySettingsForm from "@/components/secretary/SecretarySettingsForm";

export default function SecretarySettingsPage() {
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
      setError("Profil bilgileri yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[20px] border border-[#EAF0F8] bg-white px-6 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-1.5 text-xs text-[#98A2B3]">
          <span>ClinicCRM</span>
          <span className="text-[#D0D5DD]">&gt;</span>
          <span className="font-medium text-[#0B1F55]">Ayarlar</span>
        </div>

        <h1 className="mt-2 text-2xl font-bold text-[#0B1F55]">Ayarlar</h1>
        <p className="mt-1 text-sm text-[#667085]">Sekreter profil bilgilerinizi görüntüleyin.</p>
      </div>

      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Profil bilgileri yükleniyor...</p>
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
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_2fr]">
          <SecretarySettingsProfileCard currentUser={currentUser} />
          <SecretarySettingsForm currentUser={currentUser} />
        </div>
      )}
    </div>
  );
}
