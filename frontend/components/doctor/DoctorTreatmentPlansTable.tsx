"use client";

import { useMemo, useState } from "react";
import {
  doctorTreatmentPlanRows,
  type DoctorTreatmentPlanPriority,
  type DoctorTreatmentPlanStatus,
} from "@/data/doctorTreatmentPlans";

type FilterValue = "Tümü" | DoctorTreatmentPlanStatus;

const filters: FilterValue[] = ["Tümü", "Aktif", "Tamamlandı", "Kontrol Bekliyor", "Ertelendi"];

const statusBadgeClass: Record<DoctorTreatmentPlanStatus, string> = {
  Aktif: "bg-[#DCFCE7] text-[#16A34A]",
  Tamamlandı: "bg-[#DBEAFE] text-[#2563EB]",
  "Kontrol Bekliyor": "bg-[#FEF3C7] text-[#F59E0B]",
  Ertelendi: "bg-[#FEE2E2] text-[#EF4444]",
};

const priorityBadgeClass: Record<DoctorTreatmentPlanPriority, string> = {
  Yüksek: "bg-[#FEE2E2] text-[#EF4444]",
  Normal: "bg-[#EEF0FF] text-[#5B4DE3]",
  Düşük: "bg-[#F3F4F6] text-[#667085]",
};

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5a2.1 2.1 0 0 1 3 3L7 20l-4 1 1-4Z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

export default function DoctorTreatmentPlansTable() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");

  const filteredPlans = useMemo(() => {
    const term = search.trim().toLowerCase();

    return doctorTreatmentPlanRows.filter((plan) => {
      const matchesFilter = activeFilter === "Tümü" || plan.status === activeFilter;
      const matchesSearch =
        term === "" ||
        plan.patientName.toLowerCase().includes(term) ||
        plan.planDescription.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-xs">
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
            placeholder="Tedavi planı veya hasta ara..."
            className="w-full rounded-xl border border-[#E3E8F0] bg-white py-2 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
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
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[880px] text-left">
          <thead>
            <tr className="border-b border-[#E3E8F0] text-sm text-[#667085]">
              <th className="pb-2.5 font-medium">Hasta</th>
              <th className="pb-2.5 font-medium">Tedavi Planı</th>
              <th className="pb-2.5 font-medium">Başlangıç Tarihi</th>
              <th className="pb-2.5 font-medium">Son Güncelleme</th>
              <th className="pb-2.5 font-medium">Öncelik</th>
              <th className="pb-2.5 font-medium">Durum</th>
              <th className="pb-2.5 font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map((plan) => (
              <tr key={plan.id} className="border-b border-[#E3E8F0]/60 last:border-0">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
                      {plan.patientName.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-[#0B1F55]">{plan.patientName}</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-[#0B1F55]">{plan.planDescription}</td>
                <td className="py-4 text-sm text-[#0B1F55]">{plan.startDate}</td>
                <td className="py-4 text-sm text-[#0B1F55]">{plan.lastUpdateLabel}</td>
                <td className="py-4">
                  <span
                    className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold ${priorityBadgeClass[plan.priority]}`}
                  >
                    {plan.priority}
                  </span>
                </td>
                <td className="py-4">
                  <span
                    className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusBadgeClass[plan.status]}`}
                  >
                    {plan.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2 text-[#667085]">
                    <button
                      type="button"
                      aria-label="Görüntüle"
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                    >
                      <EyeIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="Düzenle"
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                    >
                      <EditIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="Diğer işlemler"
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                    >
                      <MoreIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPlans.length === 0 && (
          <p className="py-10 text-center text-sm text-[#667085]">
            Aramanızla eşleşen tedavi planı bulunamadı.
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#E3E8F0] pt-5">
        <p className="text-sm text-[#667085]">Toplam {filteredPlans.length} kayıt</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Önceki sayfa"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E3E8F0] text-[#667085] hover:bg-[#F7F8FF]"
          >
            &lt;
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5B4DE3] text-sm font-semibold text-white"
          >
            1
          </button>
          <button
            type="button"
            aria-label="Sonraki sayfa"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E3E8F0] text-[#667085] hover:bg-[#F7F8FF]"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
