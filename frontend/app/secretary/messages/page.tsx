"use client";

import { useCallback, useEffect, useState } from "react";
import { getCurrentUser, type AuthUser } from "@/lib/auth";
import { listMessages, type Message } from "@/lib/messages-api";
import SecretaryMessageSummaryCards from "@/components/secretary/SecretaryMessageSummaryCards";
import SecretaryMessagesPanel, { type FilterValue } from "@/components/secretary/SecretaryMessagesPanel";
import AddSecretaryMessageModal from "@/components/secretary/AddSecretaryMessageModal";

export default function SecretaryMessagesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [user, data] = await Promise.all([getCurrentUser(), listMessages()]);
      setCurrentUser(user);
      setMessages(data);
    } catch {
      setError("Mesajlar yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[20px] border border-[#EAF0F8] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-1.5 text-xs text-[#98A2B3]">
          <span>ClinicCRM</span>
          <span className="text-[#D0D5DD]">&gt;</span>
          <span className="font-medium text-[#0B1F55]">Mesajlar</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F55]">Mesajlar</h1>
            <p className="mt-1 text-sm text-[#667085]">
              Doktor ve klinik yönetimiyle iletişimi tek ekrandan yönetin.
            </p>
            <p className="mt-0.5 text-xs text-[#667085]">
              Öncelikli konuşmaları takip edin ve hızlı yanıt verin.
            </p>
          </div>

          <AddSecretaryMessageModal onSent={loadMessages} />
        </div>
      </div>

      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Mesajlar yükleniyor...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">{error}</p>
          <button
            type="button"
            onClick={loadMessages}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && currentUser && (
        <>
          <SecretaryMessageSummaryCards
            messages={messages}
            currentUserId={currentUser.id}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <SecretaryMessagesPanel
            messages={messages}
            currentUserId={currentUser.id}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onRefresh={loadMessages}
          />
        </>
      )}
    </div>
  );
}
