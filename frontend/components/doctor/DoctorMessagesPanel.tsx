"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getCurrentUser, type AuthUser } from "@/lib/auth";
import { listMessages, updateMessage, type Message, type MessageUserRole } from "@/lib/messages-api";
import DoctorMessageDetail from "@/components/doctor/DoctorMessageDetail";
import DoctorMessageSummaryCards from "@/components/doctor/DoctorMessageSummaryCards";
import AddDoctorMessageModal from "@/components/doctor/AddDoctorMessageModal";
import EmptyState from "@/components/common/EmptyState";

export type FilterValue = "Tümü" | "Okunmamış" | "Sekreter" | "Yönetim" | "Acil";

const filters: FilterValue[] = ["Tümü", "Okunmamış", "Sekreter", "Yönetim", "Acil"];

type ReadStatus = "Okunmamış" | "Okundu" | "Alıcı okumadı";

const statusBadgeClass: Record<ReadStatus, string> = {
  Okunmamış: "bg-[#EEF0FF] text-[#5B4DE3]",
  Okundu: "bg-[#F3F4F6] text-[#667085]",
  "Alıcı okumadı": "bg-[#FEF3C7] text-[#F59E0B]",
};

const priorityLabels: Record<Message["priority"], string> = {
  URGENT: "Acil",
  HIGH: "Yüksek",
  NORMAL: "Normal",
  LOW: "Düşük",
};

const priorityBadgeClass: Record<Message["priority"], string> = {
  URGENT: "bg-[#FEE2E2] text-[#EF4444]",
  HIGH: "bg-[#FEF3C7] text-[#F59E0B]",
  NORMAL: "bg-[#DBEAFE] text-[#2563EB]",
  LOW: "bg-[#F3F4F6] text-[#667085]",
};

const roleLabels: Record<MessageUserRole, string> = {
  ADMIN: "Yönetim",
  DOCTOR: "Doktor",
  SECRETARY: "Sekreter",
};

const roleAvatarClass: Record<MessageUserRole, string> = {
  ADMIN: "bg-[#DBEAFE] text-[#2563EB]",
  DOCTOR: "bg-[#DBEAFE] text-[#2563EB]",
  SECRETARY: "bg-[#EEF0FF] text-[#5B4DE3]",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function otherPartyOf(message: Message, currentUserId: string) {
  return message.receiverId === currentUserId ? message.sender : message.receiver;
}

function getReadStatus(message: Message, currentUserId: string): ReadStatus {
  if (message.isRead) {
    return "Okundu";
  }

  return message.receiverId === currentUserId ? "Okunmamış" : "Alıcı okumadı";
}

const timeFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default function DoctorMessagesPanel() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [selectedId, setSelectedId] = useState("");

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

  const currentUserId = currentUser?.id ?? "";

  const filteredMessages = useMemo(() => {
    const term = search.trim().toLowerCase();

    return messages.filter((message) => {
      const otherParty = otherPartyOf(message, currentUserId);
      const isIncoming = message.receiverId === currentUserId;

      const matchesFilter =
        activeFilter === "Tümü" ||
        (activeFilter === "Okunmamış" && isIncoming && !message.isRead) ||
        (activeFilter === "Sekreter" && otherParty.role === "SECRETARY") ||
        (activeFilter === "Yönetim" && otherParty.role === "ADMIN") ||
        (activeFilter === "Acil" && message.priority === "URGENT");

      const matchesSearch =
        term === "" ||
        message.sender.fullName.toLowerCase().includes(term) ||
        message.receiver.fullName.toLowerCase().includes(term) ||
        message.subject.toLowerCase().includes(term) ||
        message.content.toLowerCase().includes(term);

      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter, messages, currentUserId]);

  const selectedMessage =
    filteredMessages.find((message) => message.id === selectedId) ??
    filteredMessages[0] ??
    messages[0];

  async function handleSelect(message: Message) {
    setSelectedId(message.id);

    if (message.receiverId === currentUserId && !message.isRead) {
      try {
        await updateMessage(message.id, { isRead: true });
        await loadMessages();
      } catch {
        // read-status update failure is non-blocking for viewing the message
      }
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <p className="text-sm text-[#667085]">Mesajlar yükleniyor...</p>
      </div>
    );
  }

  if (error || !currentUser) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <p className="text-sm text-[#EF4444]">{error ?? "Mesajlar yüklenirken bir hata oluştu."}</p>
        <button
          type="button"
          onClick={loadMessages}
          className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <AddDoctorMessageModal onSent={loadMessages} />
      </div>

      <DoctorMessageSummaryCards
        messages={messages}
        currentUserId={currentUserId}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path strokeLinecap="round" d="M20 20l-3.8-3.8" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Bu listede kişi, konu veya mesaj ara..."
              className="w-full rounded-xl border border-[#EAF0F8] bg-white py-2 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-xl border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-[#5B4DE3] bg-[#5B4DE3] text-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_6px_rgba(91,77,227,0.25)]"
                      : "border-[#EAF0F8] text-[#0B1F55] hover:border-[#DCD8FF] hover:bg-[#F7F8FF]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {messages.length === 0 && (
            <div className="mt-4">
              <EmptyState
                variant="empty"
                title="Henüz mesaj bulunmuyor"
                description="Sekreterya veya klinik yönetimiyle mesajlaşmalar başladığında mesajlar burada görüntülenir."
              />
            </div>
          )}

          {messages.length > 0 && filteredMessages.length === 0 && (
            <div className="mt-4">
              <EmptyState
                variant="search"
                title="Eşleşen mesaj bulunamadı"
                description="Kişi adı, konu veya mesaj içeriğini değiştirerek tekrar deneyin."
                action={
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setActiveFilter("Tümü");
                    }}
                    className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
                  >
                    Filtreleri temizle
                  </button>
                }
              />
            </div>
          )}

          <div className="mt-4 space-y-2">
            {filteredMessages.map((message) => {
              const otherParty = otherPartyOf(message, currentUserId);
              const isIncoming = message.receiverId === currentUserId;
              const status = getReadStatus(message, currentUserId);
              const isUnreadIncoming = isIncoming && !message.isRead;
              const isSelected = selectedMessage && message.id === selectedMessage.id;

              return (
                <button
                  key={message.id}
                  type="button"
                  onClick={() => handleSelect(message)}
                  className={`w-full rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    isSelected
                      ? "border-[#5B4DE3]/40 bg-[#F7F8FF]"
                      : "border-[#EAF0F8] bg-white hover:bg-[#F8F9FF]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${roleAvatarClass[otherParty.role]}`}
                    >
                      {initials(otherParty.fullName)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`truncate text-sm ${
                            isUnreadIncoming ? "font-bold text-[#0B1F55]" : "font-medium text-[#0B1F55]"
                          }`}
                        >
                          {otherParty.fullName}
                          <span className="ml-1.5 text-xs font-normal text-[#98A2B3]">
                            {isIncoming ? "· Gelen" : "· Giden"}
                          </span>
                        </p>
                        <span className="shrink-0 text-xs text-[#667085]">
                          {timeFormatter.format(new Date(message.createdAt))}
                        </span>
                      </div>

                      <p className="mt-0.5 truncate text-sm text-[#0B1F55]">{message.subject}</p>
                      <p className="mt-0.5 truncate text-xs text-[#667085]">{message.content}</p>

                      <div className="mt-2 flex items-center gap-1.5">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusBadgeClass[status]}`}
                        >
                          {status}
                        </span>
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${priorityBadgeClass[message.priority]}`}
                        >
                          {priorityLabels[message.priority]}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedMessage && (
          <DoctorMessageDetail message={selectedMessage} currentUserId={currentUserId} onSent={loadMessages} />
        )}
      </div>
    </div>
  );
}
