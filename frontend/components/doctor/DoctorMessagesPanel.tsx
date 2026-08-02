"use client";

import { useMemo, useState } from "react";
import { doctorMessageRows, type DoctorMessageRow } from "@/data/doctorMessages";
import DoctorMessageDetail from "@/components/doctor/DoctorMessageDetail";
import DoctorMessageSummaryCards from "@/components/doctor/DoctorMessageSummaryCards";

export type FilterValue = "Tümü" | "Okunmamış" | "Hasta" | "Sekreter" | "Acil";

const filters: FilterValue[] = ["Tümü", "Okunmamış", "Hasta", "Sekreter", "Acil"];

const statusBadgeClass: Record<string, string> = {
  Okunmamış: "bg-[#EEF0FF] text-[#5B4DE3]",
  Okundu: "bg-[#F3F4F6] text-[#667085]",
};

const priorityBadgeClass: Record<string, string> = {
  Acil: "bg-[#FEE2E2] text-[#EF4444]",
  Normal: "bg-[#DBEAFE] text-[#2563EB]",
  Düşük: "bg-[#F3F4F6] text-[#667085]",
};

export function getSenderAvatarColor(message: DoctorMessageRow) {
  if (message.priority === "Acil") {
    return "bg-[#FEE2E2] text-[#EF4444]";
  }

  switch (message.senderType) {
    case "Hasta":
      return "bg-[#CCFBF1] text-[#0F766E]";
    case "Sekreter":
      return "bg-[#EEF0FF] text-[#5B4DE3]";
    case "Yönetim":
      return "bg-[#DBEAFE] text-[#2563EB]";
    default:
      return "bg-[#F3F4F6] text-[#475467]";
  }
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function DoctorMessagesPanel() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [selectedId, setSelectedId] = useState(doctorMessageRows[0].id);

  const filteredMessages = useMemo(() => {
    const term = search.trim().toLowerCase();

    return doctorMessageRows.filter((message) => {
      const matchesFilter =
        activeFilter === "Tümü" ||
        (activeFilter === "Okunmamış" && message.status === "Okunmamış") ||
        (activeFilter === "Hasta" && message.senderType === "Hasta") ||
        (activeFilter === "Sekreter" && message.senderType === "Sekreter") ||
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
    doctorMessageRows[0];

  return (
    <div className="flex flex-col gap-5">
      <DoctorMessageSummaryCards activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.1fr_1fr]">
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
              placeholder="Bu listede hasta, konu veya mesaj ara..."
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
                      ? "border-[#5B4DE3] bg-[#5B4DE3] text-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_6px_rgba(91,77,227,0.25)]"
                      : "border-[#E3E8F0] text-[#0B1F55] hover:border-[#DCD8FF] hover:bg-[#F7F8FF]"
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
                  className={`w-full rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    isSelected
                      ? "border-[#5B4DE3]/40 bg-[#F7F8FF]"
                      : "border-[#E3E8F0] bg-white hover:bg-[#F8F9FF]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${getSenderAvatarColor(message)}`}
                    >
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

        <DoctorMessageDetail message={selectedMessage} />
      </div>
    </div>
  );
}
