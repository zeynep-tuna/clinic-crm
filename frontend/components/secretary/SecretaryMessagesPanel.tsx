"use client";

import { useMemo, useState } from "react";
import { secretaryMessageRows } from "@/data/secretaryMessages";
import SecretaryMessageDetail from "@/components/secretary/SecretaryMessageDetail";

type FilterValue = "Tümü" | "Okunmamış" | "Hasta" | "Doktor" | "Acil";

const filters: FilterValue[] = ["Tümü", "Okunmamış", "Hasta", "Doktor", "Acil"];

const statusBadgeClass: Record<string, string> = {
  Okunmamış: "bg-[#EEF0FF] text-[#5B4DE3]",
  Okundu: "bg-[#F3F4F6] text-[#667085]",
};

const priorityBadgeClass: Record<string, string> = {
  Acil: "bg-[#FEE2E2] text-[#EF4444]",
  Yüksek: "bg-[#FEF3C7] text-[#F59E0B]",
  Normal: "bg-[#DBEAFE] text-[#2563EB]",
};

function initials(name: string) {
  const parts = name.split(" ").filter((part) => part !== "Dr." && part !== "Dr");
  return parts
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function SecretaryMessagesPanel() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [selectedId, setSelectedId] = useState(secretaryMessageRows[0].id);

  const filteredMessages = useMemo(() => {
    const term = search.trim().toLowerCase();

    return secretaryMessageRows.filter((message) => {
      const matchesFilter =
        activeFilter === "Tümü" ||
        (activeFilter === "Okunmamış" && message.status === "Okunmamış") ||
        (activeFilter === "Hasta" && message.senderType === "Hasta") ||
        (activeFilter === "Doktor" && message.senderType === "Doktor") ||
        (activeFilter === "Acil" && message.priority === "Acil");

      const matchesSearch =
        term === "" ||
        message.senderName.toLowerCase().includes(term) ||
        message.subject.toLowerCase().includes(term) ||
        message.body.toLowerCase().includes(term);

      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  const selectedMessage =
    filteredMessages.find((message) => message.id === selectedId) ??
    filteredMessages[0] ??
    secretaryMessageRows[0];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
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
            placeholder="Mesaj veya kişi ara..."
            className="w-full rounded-xl border border-[#E3E8F0] bg-white py-2 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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
                    ? "border-[#EEF0FF] bg-[#EEF0FF] text-[#5B4DE3]"
                    : "border-[#E3E8F0] text-[#0B1F55] hover:bg-[#F7F8FF]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-4 space-y-2">
          {filteredMessages.map((message) => {
            const isSelected = message.id === selectedMessage.id;

            return (
              <button
                key={message.id}
                type="button"
                onClick={() => setSelectedId(message.id)}
                className={`w-full rounded-xl border p-3 text-left transition-colors ${
                  isSelected
                    ? "border-[#5B4DE3] bg-[#F7F8FF]"
                    : "border-[#E3E8F0] hover:bg-[#F7F8FF]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-xs font-semibold text-[#5B4DE3]">
                    {initials(message.senderName)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`truncate text-sm ${
                          message.status === "Okunmamış" ? "font-bold text-[#0B1F55]" : "font-medium text-[#0B1F55]"
                        }`}
                      >
                        {message.senderName}
                      </p>
                      <span className="shrink-0 text-xs text-[#667085]">{message.timeLabel}</span>
                    </div>

                    <p className="mt-0.5 truncate text-sm text-[#0B1F55]">{message.subject}</p>
                    <p className="mt-0.5 truncate text-xs text-[#667085]">{message.body}</p>

                    <div className="mt-2 flex items-center gap-1.5">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusBadgeClass[message.status]}`}
                      >
                        {message.status}
                      </span>
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${priorityBadgeClass[message.priority]}`}
                      >
                        {message.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {filteredMessages.length === 0 && (
            <p className="py-10 text-center text-sm text-[#667085]">
              Aramanızla eşleşen mesaj bulunamadı.
            </p>
          )}
        </div>
      </div>

      <SecretaryMessageDetail message={selectedMessage} />
    </div>
  );
}
