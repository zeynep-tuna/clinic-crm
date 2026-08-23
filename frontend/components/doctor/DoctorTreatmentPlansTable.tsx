"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteTreatmentPlan,
  listTreatmentPlans,
  type TreatmentPlan,
  type TreatmentPlanStatus,
} from "@/lib/treatment-plans-api";
import DoctorTreatmentPlanSummaryCards from "@/components/doctor/DoctorTreatmentPlanSummaryCards";
import AddTreatmentPlanModal from "@/components/doctor/AddTreatmentPlanModal";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";

type UiStatus = "Aktif" | "Tamamlandı" | "Kontrol Bekliyor" | "Ertelendi";

export type FilterValue = "Tümü" | UiStatus;

const filters: FilterValue[] = ["Tümü", "Aktif", "Tamamlandı", "Kontrol Bekliyor", "Ertelendi"];

const statusBadgeClass: Record<UiStatus, string> = {
  Aktif: "bg-[#DCFCE7] text-[#16A34A]",
  Tamamlandı: "bg-[#DBEAFE] text-[#2563EB]",
  "Kontrol Bekliyor": "bg-[#FEF3C7] text-[#F59E0B]",
  Ertelendi: "bg-[#FEE2E2] text-[#EF4444]",
};

const STATUS_LABELS: Record<TreatmentPlanStatus, UiStatus> = {
  ACTIVE: "Aktif",
  COMPLETED: "Tamamlandı",
  REVIEW_PENDING: "Kontrol Bekliyor",
  POSTPONED: "Ertelendi",
};

const avatarPalette = [
  "bg-[#EEF0FF] text-[#5B4DE3]",
  "bg-[#DBEAFE] text-[#2563EB]",
  "bg-[#CCFBF1] text-[#0F766E]",
  "bg-[#FFEDD5] text-[#C2410C]",
  "bg-[#F3F4F6] text-[#475467]",
];

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function getAvatarColor(id: string) {
  const sum = id.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return avatarPalette[sum % avatarPalette.length];
}

function getPatientName(plan: TreatmentPlan) {
  return `${plan.patient.firstName} ${plan.patient.lastName}`.trim();
}

function getStatusLabel(plan: TreatmentPlan): UiStatus {
  return STATUS_LABELS[plan.status];
}

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export default function DoctorTreatmentPlansTable() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [planList, setPlanList] = useState<TreatmentPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingDeactivateId, setPendingDeactivateId] = useState<string | null>(null);
  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);
  const [deactivateError, setDeactivateError] = useState<string | null>(null);

  const loadTreatmentPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await listTreatmentPlans();
      setPlanList(data);
    } catch {
      setError("Tedavi planları yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTreatmentPlans();
  }, [loadTreatmentPlans]);

  async function handleConfirmDeactivate() {
    const planId = pendingDeactivateId;
    if (!planId) return;

    setPendingDeactivateId(null);
    setDeactivateError(null);
    setDeactivatingId(planId);

    try {
      await deleteTreatmentPlan(planId);
      await loadTreatmentPlans();
    } catch {
      setDeactivateError("Tedavi planı pasifleştirilirken bir hata oluştu.");
    } finally {
      setDeactivatingId(null);
    }
  }

  const filteredPlans = useMemo(() => {
    const term = search.trim().toLowerCase();

    return planList.filter((plan) => {
      const status = getStatusLabel(plan);
      const matchesFilter = activeFilter === "Tümü" || status === activeFilter;
      const matchesSearch =
        term === "" ||
        getPatientName(plan).toLowerCase().includes(term) ||
        plan.description.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter, planList]);

  return (
    <div className="flex flex-col gap-5">
      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Tedavi planları yükleniyor...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">{error}</p>
          <button
            type="button"
            onClick={loadTreatmentPlans}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {deactivateError && (
            <div className="rounded-[20px] border border-[#FEE2E2] bg-[#FEF2F2] px-5 py-3 text-sm text-[#EF4444]">
              {deactivateError}
            </div>
          )}

          <div className="flex justify-end">
            <AddTreatmentPlanModal onCreated={loadTreatmentPlans} />
          </div>

          <DoctorTreatmentPlanSummaryCards
            treatmentPlans={planList}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
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
                  placeholder="Bu listede hasta veya tedavi planı ara..."
                  className="w-full rounded-xl border border-[#EAF0F8] bg-white py-2 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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
                          ? "border-[#5B4DE3] bg-[#5B4DE3] text-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_6px_rgba(91,77,227,0.25)]"
                          : "border-[#EAF0F8] text-[#0B1F55] hover:border-[#DCD8FF] hover:bg-[#F7F8FF]"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              {planList.length === 0 && (
                <EmptyState
                  variant="empty"
                  title="Henüz tedavi planı bulunmuyor"
                  description="Hastalar için oluşturduğunuz diş tedavi planları burada takip edilir."
                />
              )}

              {planList.length > 0 && filteredPlans.length === 0 && (
                <EmptyState
                  variant="search"
                  title="Eşleşen tedavi planı bulunamadı"
                  description="Hasta adı, tedavi planı açıklaması veya seçili filtreyi değiştirerek tekrar deneyin."
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
              )}

              {filteredPlans.length > 0 && (
              <table className="w-full min-w-220 text-left">
                <thead>
                  <tr className="border-b border-[#EEF2F8] text-xs font-semibold tracking-wide text-[#667085] uppercase">
                    <th className="pb-2.5 font-medium">Hasta</th>
                    <th className="pb-2.5 font-medium">Tedavi Planı</th>
                    <th className="pb-2.5 font-medium">Başlangıç Tarihi</th>
                    <th className="pb-2.5 font-medium">Durum</th>
                    <th className="pb-2.5 font-medium">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlans.map((plan) => {
                    const patientName = getPatientName(plan);
                    const status = getStatusLabel(plan);

                    return (
                    <tr
                      key={plan.id}
                      className="border-b border-[#EEF2F8] transition-colors last:border-0 hover:bg-[#F8F9FF]"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarColor(plan.id)}`}
                          >
                            {patientName.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-[#0B1F55]">{patientName}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-[#0B1F55]">{plan.description}</td>
                      <td className="py-4 text-sm text-[#0B1F55]">{formatDate(plan.startDate)}</td>
                      <td className="py-4">
                        <span
                          className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusBadgeClass[status]}`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="py-4">
                        {plan.isActive ? (
                          <button
                            type="button"
                            aria-label="Tedavi planını pasifleştir"
                            disabled={deactivatingId === plan.id}
                            onClick={() => setPendingDeactivateId(plan.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition-colors hover:bg-[#FEE2E2] hover:text-[#EF4444] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
                              <circle cx="12" cy="12" r="8.5" />
                              <path strokeLinecap="round" d="M10 9.5v5M14 9.5v5" />
                            </svg>
                          </button>
                        ) : (
                          <span className="text-sm text-[#667085]">—</span>
                        )}
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#EEF2F8] pt-5">
              <p className="text-sm text-[#667085]">Toplam {filteredPlans.length} kayıt</p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Önceki sayfa"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EAF0F8] text-[#667085] hover:bg-[#F7F8FF]"
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
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EAF0F8] text-[#667085] hover:bg-[#F7F8FF]"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <ConfirmDialog
        open={pendingDeactivateId !== null}
        title="Tedavi planını pasifleştirmek istiyor musunuz?"
        description="Seçili tedavi planı pasif duruma alınacak ve aktif tedavi planı listelerinde görünmeyecek. Kayıt kalıcı olarak silinmez."
        confirmLabel="Tedavi Planını Pasifleştir"
        variant="warning"
        onConfirm={handleConfirmDeactivate}
        onCancel={() => setPendingDeactivateId(null)}
      />
    </div>
  );
}
