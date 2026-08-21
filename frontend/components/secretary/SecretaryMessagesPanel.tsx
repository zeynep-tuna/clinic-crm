"use client";

import { useMemo, useState } from "react";
import type { Message, MessageUserRole } from "@/lib/messages-api";
import SecretaryMessageDetail from "@/components/secretary/SecretaryMessageDetail";
import EmptyState from "@/components/common/EmptyState";

export type FilterValue = "Tümü" | "Okunmamış" | "Doktor" | "Yönetim" | "Acil";

const filters: FilterValue[] = ["Tümü", "Okunmamış", "Doktor", "Yönetim", "Acil"];

const statusBadgeClass: Record<string, string> = {
  Okunmamış: "bg-[#EEF0FF] text-[#5B4DE3]",
  Okundu: "bg-[#F3F4F6] text-[#667085]",
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
  ADMIN: "bg-[#EEF0FF] text-[#5B4DE3]",
  DOCTOR: "bg-[#DBEAFE] text-[#2563EB]",
  SECRETARY: "bg-[#DCFCE7] text-[#16A34A]",
};

const timeFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

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

interface SecretaryMessagesPanelProps {
  messages: Message[];
  currentUserId: string;
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  onRefresh: () => void | Promise<void>;
}

export default function SecretaryMessagesPanel({
  messages,
  currentUserId,
  activeFilter,
  onFilterChange,
  onRefresh,
}: SecretaryMessagesPanelProps) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(messages[0]?.id ?? "");

  const filteredMessages = useMemo(() => {
    const term = search.trim().toLowerCase();

    return messages.filter((message) => {
      const otherParty = otherPartyOf(message, currentUserId);
      const status: "Okunmamış" | "Okundu" = message.isRead ? "Okundu" : "Okunmamış";

      const matchesFilter =
        activeFilter === "Tümü" ||
        (activeFilter === "Okunmamış" && status === "Okunmamış") ||
        (activeFilter === "Doktor" && otherParty.role === "DOCTOR") ||
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

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
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
            placeholder="Bu listede mesaj veya kişi ara..."
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
                onClick={() => onFilterChange(filter)}
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
              description="Doktor veya klinik yönetimiyle mesajlaşmalar başladığında mesajlar burada görüntülenir."
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
                    onFilterChange("Tümü");
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
            const status: "Okunmamış" | "Okundu" = message.isRead ? "Okundu" : "Okunmamış";
            const isSelected = selectedMessage && message.id === selectedMessage.id;
            const isIncoming = message.receiverId === currentUserId;

            return (
              <button
                key={message.id}
                type="button"
                onClick={() => setSelectedId(message.id)}
                className={`w-full rounded-lg border p-2.5 text-left transition-colors ${
                  isSelected
                    ? "border-[#5B4DE3] bg-[#F7F8FF]"
                    : "border-[#EEF2F8] hover:bg-[#F8F9FF]"
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
                          status === "Okunmamış" && isIncoming ? "font-bold text-[#0B1F55]" : "font-medium text-[#667085]"
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

                    <p
                      className={`mt-0.5 truncate text-sm ${
                        status === "Okunmamış" && isIncoming ? "font-semibold text-[#0B1F55]" : "font-normal text-[#667085]"
                      }`}
                    >
                      {message.subject}
                    </p>
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
        <SecretaryMessageDetail
          message={selectedMessage}
          currentUserId={currentUserId}
          onSent={onRefresh}
          onMarkedRead={onRefresh}
        />
      )}
    </div>
  );
}
