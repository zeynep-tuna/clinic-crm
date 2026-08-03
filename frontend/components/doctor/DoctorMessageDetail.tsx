"use client";

import { useState } from "react";
import type { DoctorMessageRow } from "@/data/doctorMessages";
import { getSenderAvatarColor } from "@/components/doctor/DoctorMessagesPanel";

const statusBadgeClass: Record<string, string> = {
  Okunmamış: "bg-[#EEF0FF] text-[#5B4DE3]",
  Okundu: "bg-[#F3F4F6] text-[#667085]",
};

const priorityBadgeClass: Record<string, string> = {
  Acil: "bg-[#FEE2E2] text-[#EF4444]",
  Normal: "bg-[#DBEAFE] text-[#2563EB]",
  Düşük: "bg-[#F3F4F6] text-[#667085]",
};

const senderTypeBadgeClass: Record<string, string> = {
  Hasta: "bg-[#DCFCE7] text-[#16A34A]",
  Sekreter: "bg-[#EEF0FF] text-[#5B4DE3]",
  Yönetim: "bg-[#DBEAFE] text-[#2563EB]",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface DoctorMessageDetailProps {
  message: DoctorMessageRow;
  onDeleteClick: () => void;
}

export default function DoctorMessageDetail({ message, onDeleteClick }: DoctorMessageDetailProps) {
  const [reply, setReply] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ messageId: message.id, reply });
  };

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-4 border-b border-[#EEF2F8] pb-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getSenderAvatarColor(message)}`}
          >
            {initials(message.senderName)}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0B1F55]">{message.senderName}</p>
            <span
              className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${senderTypeBadgeClass[message.senderType]}`}
            >
              {message.senderType}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeClass[message.status]}`}
          >
            {message.status}
          </span>
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${priorityBadgeClass[message.priority]}`}
          >
            {message.priority}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-base font-semibold text-[#0B1F55]">{message.subject}</p>
        <p className="mt-1 text-xs text-[#667085]">{message.timeLabel}</p>
        <p className="mt-3 text-sm text-[#0B1F55]">{message.body}</p>

        <div className="mt-3">
          <button
            type="button"
            onClick={onDeleteClick}
            className="flex h-9 items-center justify-center rounded-xl border border-[#EAF0F8] px-3.5 text-xs font-semibold text-[#EF4444] transition-colors hover:border-[#FCA5A5] hover:bg-[#FEE2E2]"
          >
            Mesajı Sil
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 border-t border-[#EEF2F8] pt-5">
        <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Cevap Yaz</label>
        <textarea
          value={reply}
          onChange={(event) => setReply(event.target.value)}
          rows={3}
          placeholder="Cevabınızı yazın..."
          className="min-h-24 w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
        />

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-[#5B4DE3] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
          >
            Cevabı Gönder
          </button>
        </div>
      </form>
    </div>
  );
}
