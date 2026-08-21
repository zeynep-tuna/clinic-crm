"use client";

import { useState } from "react";
import { createMessage, updateMessage, type Message, type MessageUserRole } from "@/lib/messages-api";

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

const roleBadgeClass: Record<MessageUserRole, string> = {
  ADMIN: "bg-[#EEF0FF] text-[#5B4DE3]",
  DOCTOR: "bg-[#DBEAFE] text-[#2563EB]",
  SECRETARY: "bg-[#DCFCE7] text-[#16A34A]",
};

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
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

interface SecretaryMessageDetailProps {
  message: Message;
  currentUserId: string;
  onSent: () => void | Promise<void>;
  onMarkedRead: () => void | Promise<void>;
}

export default function SecretaryMessageDetail({
  message,
  currentUserId,
  onSent,
  onMarkedRead,
}: SecretaryMessageDetailProps) {
  const [reply, setReply] = useState("");
  const [replyError, setReplyError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMarkingRead, setIsMarkingRead] = useState(false);

  const isIncoming = message.receiverId === currentUserId;
  const otherParty = isIncoming ? message.sender : message.receiver;
  const status: "Okunmamış" | "Okundu" = message.isRead ? "Okundu" : "Okunmamış";

  function handleReplyChange(value: string) {
    setReply(value);
    if (replyError) {
      setReplyError(null);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedReply = reply.trim();

    if (!trimmedReply) {
      setReplyError("Mesaj alanı boş bırakılamaz.");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setReplyError(null);

    try {
      const receiverId = isIncoming ? message.senderId : message.receiverId;
      await createMessage({
        receiverId,
        subject: `Re: ${message.subject}`,
        content: trimmedReply,
      });
      setReply("");
      await onSent();
    } catch {
      setReplyError("Mesaj gönderilirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleMarkRead() {
    if (isMarkingRead) return;

    setIsMarkingRead(true);
    try {
      await updateMessage(message.id, { isRead: true });
      await onMarkedRead();
    } finally {
      setIsMarkingRead(false);
    }
  }

  return (
    <div className="flex flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4 border-b border-[#EAF0F8] pb-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${roleBadgeClass[otherParty.role]}`}
          >
            {initials(otherParty.fullName)}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0B1F55]">{otherParty.fullName}</p>
            <span
              className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleBadgeClass[otherParty.role]}`}
            >
              {roleLabels[otherParty.role]}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeClass[status]}`}
          >
            {status}
          </span>
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${priorityBadgeClass[message.priority]}`}
          >
            {priorityLabels[message.priority]}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-base font-bold text-[#0B1F55]">{message.subject}</p>
        <p className="mt-1 text-xs text-[#667085]">{dateFormatter.format(new Date(message.createdAt))}</p>

        <div className="mt-3 rounded-xl bg-[#F7F8FF] p-4">
          <p className="text-sm text-[#0B1F55]">{message.content}</p>
        </div>

        {isIncoming && !message.isRead && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleMarkRead}
              disabled={isMarkingRead}
              className="flex h-9 items-center justify-center rounded-xl border border-[#EAF0F8] px-3.5 text-xs font-semibold text-[#0B1F55] transition-colors hover:border-[#DCD8FF] hover:bg-[#F7F8FF] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isMarkingRead ? "İşaretleniyor..." : "Okundu İşaretle"}
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 border-t border-[#EAF0F8] pt-4">
        <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Cevap Yaz</label>
        <textarea
          value={reply}
          onChange={(event) => handleReplyChange(event.target.value)}
          rows={3}
          placeholder="Cevabınızı yazın..."
          className={`w-full resize-none rounded-xl border bg-[#F7F8FF]/40 px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
            replyError ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
          }`}
        />
        {replyError && <p className="mt-1 text-sm text-[#EF4444]">{replyError}</p>}

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-[#5B4DE3] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.06)] transition-colors hover:bg-[#4c3fd1] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Gönderiliyor..." : "Cevabı Gönder"}
          </button>
        </div>
      </form>
    </div>
  );
}
