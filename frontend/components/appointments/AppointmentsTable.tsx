"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiError } from "@/lib/api";
import {
  listAppointments,
  updateAppointment,
  type Appointment,
} from "@/lib/appointments-api";
import EmptyState from "@/components/common/EmptyState";
import AddAppointmentModal from "@/components/appointments/AddAppointmentModal";
import ConfirmDialog from "@/components/common/ConfirmDialog";

type UiStatus = "Bekliyor" | "Onaylandı" | "Tamamlandı" | "İptal" | "Gelmedi";

type FilterValue = "Tümü" | UiStatus;

const filters: FilterValue[] = ["Tümü", "Onaylandı", "Bekliyor", "Tamamlandı", "İptal"];

const statusBadgeClass: Record<UiStatus, string> = {
  Onaylandı: "bg-[#DCFCE7] text-[#16A34A]",
  Bekliyor: "bg-[#FEF3C7] text-[#F59E0B]",
  Tamamlandı: "bg-[#DBEAFE] text-[#2563EB]",
  İptal: "bg-[#FEE2E2] text-[#EF4444]",
  Gelmedi: "bg-[#F3F4F6] text-[#667085]",
};

const STATUS_LABELS: Record<Appointment["status"], UiStatus> = {
  SCHEDULED: "Bekliyor",
  CONFIRMED: "Onaylandı",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
  NO_SHOW: "Gelmedi",
};

const timeFormatter = new Intl.DateTimeFormat("tr-TR", {
  hour: "2-digit",
  minute: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const weekdayFormatter = new Intl.DateTimeFormat("tr-TR", {
  weekday: "long",
});

const avatarPalette = [
  "bg-[#EEF0FF] text-[#5B4DE3]",
  "bg-[#DBEAFE] text-[#2563EB]",
  "bg-[#CCFBF1] text-[#0F766E]",
  "bg-[#FFEDD5] text-[#C2410C]",
  "bg-[#F3F4F6] text-[#475467]",
];

function getAvatarColor(id: string) {
  const sum = id.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return avatarPalette[sum % avatarPalette.length];
}

function getStatusLabel(appointment: Appointment): UiStatus {
  return STATUS_LABELS[appointment.status];
}

function getPatientName(appointment: Appointment) {
  return `${appointment.patient.firstName} ${appointment.patient.lastName}`.trim();
}

function getPatientPhone(appointment: Appointment) {
  return appointment.patient.phone ?? "—";
}

function getDoctorName(appointment: Appointment) {
  return appointment.doctor.fullName;
}

function formatAppointmentTime(startAt: string) {
  return timeFormatter.format(new Date(startAt));
}

function formatAppointmentDate(startAt: string) {
  return dateFormatter.format(new Date(startAt));
}

function formatAppointmentWeekday(startAt: string) {
  const weekday = weekdayFormatter.format(new Date(startAt));
  return weekday.charAt(0).toUpperCase() + weekday.slice(1);
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
    </svg>
  );
}

function CalendarSummaryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}

function ClockSummaryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <rect x="3.5" y="4" width="17" height="5" rx="1.5" />
      <path strokeLinecap="round" d="M4.5 9v9a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V9" />
      <path strokeLinecap="round" d="M10 13h4" />
    </svg>
  );
}

function CancelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" d="M9.5 9.5l5 5M14.5 9.5l-5 5" />
    </svg>
  );
}

function RestoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9A7.5 7.5 0 1 1 6 15" />
    </svg>
  );
}

interface AppointmentsTableProps {
  refreshKey?: number;
}

export default function AppointmentsTable({ refreshKey }: AppointmentsTableProps) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingCancelId, setPendingCancelId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [pendingUndoId, setPendingUndoId] = useState<string | null>(null);
  const [undoingId, setUndoingId] = useState<string | null>(null);
  const [undoError, setUndoError] = useState<{ appointmentId: string; message: string } | null>(null);

  const loadAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await listAppointments({ includeInactive: true });
      setAppointmentList(data);
    } catch {
      setError("Randevular yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments, refreshKey]);

  async function handleConfirmCancel() {
    const appointmentId = pendingCancelId;
    if (!appointmentId) return;

    setPendingCancelId(null);
    setCancelError(null);
    setUndoError(null);
    setCancellingId(appointmentId);

    try {
      await updateAppointment(appointmentId, { status: "CANCELLED" });
      await loadAppointments();
    } catch {
      setCancelError("Randevu iptal edilirken bir hata oluştu.");
    } finally {
      setCancellingId(null);
    }
  }

  async function handleConfirmUndo() {
    const appointmentId = pendingUndoId;
    if (!appointmentId) return;

    setPendingUndoId(null);
    setUndoError(null);
    setUndoingId(appointmentId);

    try {
      await updateAppointment(appointmentId, { status: "SCHEDULED" });
      await loadAppointments();
    } catch (error) {
      const isConflict =
        error instanceof ApiError &&
        error.status === 400 &&
        error.message.includes("already has an active appointment");

      setUndoError({
        appointmentId,
        message: isConflict
          ? "Bu saat artık müsait değil. Randevu iptali geri alınamadı."
          : "Randevu iptali geri alınırken bir hata oluştu.",
      });
    } finally {
      setUndoingId(null);
    }
  }

  const totalCount = appointmentList.length;
  const confirmedCount = appointmentList.filter((appointment) => getStatusLabel(appointment) === "Onaylandı").length;
  const pendingCount = appointmentList.filter((appointment) => getStatusLabel(appointment) === "Bekliyor").length;
  const otherCount = appointmentList.filter((appointment) => {
    const status = getStatusLabel(appointment);
    return status === "Tamamlandı" || status === "İptal" || status === "Gelmedi";
  }).length;

  const summaryItems: {
    label: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    filterValue: FilterValue;
    selectable: boolean;
  }[] = [
    {
      label: "Toplam Randevu",
      value: totalCount,
      icon: <CalendarSummaryIcon />,
      color: "bg-[#EEF0FF] text-[#5B4DE3]",
      filterValue: "Tümü",
      selectable: true,
    },
    {
      label: "Onaylandı",
      value: confirmedCount,
      icon: <CheckCircleIcon />,
      color: "bg-[#DCFCE7] text-[#16A34A]",
      filterValue: "Onaylandı",
      selectable: true,
    },
    {
      label: "Bekliyor",
      value: pendingCount,
      icon: <ClockSummaryIcon />,
      color: "bg-[#FEF3C7] text-[#F59E0B]",
      filterValue: "Bekliyor",
      selectable: true,
    },
    {
      label: "Tamamlandı / İptal",
      value: otherCount,
      icon: <ArchiveIcon />,
      color: "bg-[#F3F4F6] text-[#667085]",
      filterValue: "Tümü",
      selectable: false,
    },
  ];

  const filteredAppointments = useMemo(() => {
    const term = search.trim().toLowerCase();

    return appointmentList.filter((appointment) => {
      const status = getStatusLabel(appointment);
      const matchesFilter = activeFilter === "Tümü" || status === activeFilter;
      const matchesSearch =
        term === "" ||
        getPatientName(appointment).toLowerCase().includes(term) ||
        getDoctorName(appointment).toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter, appointmentList]);

  return (
    <div className="flex flex-col gap-5">
      {isLoading && (
        <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#667085]">Randevular yükleniyor...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[#EF4444]">{error}</p>
          <button
            type="button"
            onClick={loadAppointments}
            className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {cancelError && (
            <div className="rounded-[20px] border border-[#FEE2E2] bg-[#FEF2F2] px-5 py-3 text-sm text-[#EF4444]">
              {cancelError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EAF0F8]/60">
            {summaryItems.map((item) => {
              const isSelected = item.selectable && activeFilter === item.filterValue;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveFilter(item.filterValue)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors sm:px-5 ${
                    isSelected ? "bg-[#F7F8FF]" : "hover:bg-[#F7F8FF]"
                  }`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xl font-bold text-[#0B1F55]">{item.value}</p>
                    <p className="text-xs text-[#667085]">{item.label}</p>
                  </div>
                </button>
              );
            })}
          </div>

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
                  placeholder="Bu listede hasta veya doktor ara..."
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
              {appointmentList.length === 0 && (
                <EmptyState
                  variant="empty"
                  title="Henüz randevu bulunmuyor"
                  description="Diş kliniğinizdeki hasta randevularını planlamak için yeni randevu oluşturabilirsiniz."
                  action={<AddAppointmentModal />}
                />
              )}

              {appointmentList.length > 0 && filteredAppointments.length === 0 && (
                <EmptyState
                  variant="search"
                  title="Eşleşen randevu bulunamadı"
                  description="Hasta adı, hekim veya durum filtresini değiştirerek tekrar deneyin."
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

              {filteredAppointments.length > 0 && (
              <table className="w-full min-w-240 text-left">
                <thead>
                  <tr className="border-b border-[#EAF0F8]/70 text-xs font-semibold tracking-wide text-[#667085] uppercase">
                    <th className="pb-2.5 font-medium">Saat</th>
                    <th className="pb-2.5 font-medium">Hasta</th>
                    <th className="pb-2.5 font-medium">Doktor</th>
                    <th className="pb-2.5 font-medium">Tarih</th>
                    <th className="pb-2.5 font-medium">Durum</th>
                    <th className="pb-2.5 font-medium">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => {
                    const patientName = getPatientName(appointment);
                    const status = getStatusLabel(appointment);
                    const rowUndoError =
                      undoError?.appointmentId === appointment.id ? undoError.message : null;

                    return [
                    <tr
                      key={appointment.id}
                      onClick={() => console.log("Randevu detayına git:", appointment.id)}
                      className="cursor-pointer border-b border-[#EAF0F8]/60 transition-colors last:border-0 hover:bg-[#F8F9FF]"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-[#0B1F55]">
                          <span className="text-[#98A2B3]">
                            <ClockIcon />
                          </span>
                          {formatAppointmentTime(appointment.startAt)}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarColor(appointment.id)}`}
                          >
                            {patientName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#0B1F55]">{patientName}</p>
                            <p className="text-xs text-[#667085]">{getPatientPhone(appointment)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-[#0B1F55]">{getDoctorName(appointment)}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2 text-sm text-[#0B1F55]">
                          <span className="text-[#98A2B3]">
                            <CalendarIcon />
                          </span>
                          <div>
                            <p>{formatAppointmentDate(appointment.startAt)}</p>
                            <p className="text-xs text-[#667085]">{formatAppointmentWeekday(appointment.startAt)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusBadgeClass[status]}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3 text-[#667085]">
                          {(status === "Bekliyor" || status === "Onaylandı") && (
                            <button
                              type="button"
                              aria-label="Randevuyu iptal et"
                              disabled={cancellingId === appointment.id}
                              onClick={(event) => {
                                event.stopPropagation();
                                setPendingCancelId(appointment.id);
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#FEE2E2] hover:text-[#EF4444] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <CancelIcon />
                            </button>
                          )}
                          {status === "İptal" && (
                            <button
                              type="button"
                              aria-label="Randevu iptalini geri al"
                              disabled={undoingId === appointment.id}
                              onClick={(event) => {
                                event.stopPropagation();
                                setPendingUndoId(appointment.id);
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#EEF0FF] hover:text-[#5B4DE3] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <RestoreIcon />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>,
                    rowUndoError && (
                      <tr key={`${appointment.id}-undo-error`} className="border-b border-[#EAF0F8]/60 last:border-0">
                        <td colSpan={6} className="bg-[#FEF2F2] px-4 py-2.5 text-sm text-[#EF4444]">
                          {rowUndoError}
                        </td>
                      </tr>
                    ),
                    ];
                  })}
                </tbody>
              </table>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#EAF0F8]/70 pt-5">
              <p className="text-sm text-[#667085]">Toplam {filteredAppointments.length} kayıt</p>

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
        open={pendingCancelId !== null}
        title="Randevuyu iptal etmek istiyor musunuz?"
        description="Seçili hasta randevusu iptal edilecek."
        confirmLabel="Randevuyu İptal Et"
        variant="warning"
        onConfirm={handleConfirmCancel}
        onCancel={() => setPendingCancelId(null)}
      />

      <ConfirmDialog
        open={pendingUndoId !== null}
        title="Randevu iptalini geri almak istiyor musunuz?"
        description="Randevu yeniden Bekliyor durumuna alınacaktır."
        confirmLabel="İptali Geri Al"
        variant="warning"
        onConfirm={handleConfirmUndo}
        onCancel={() => setPendingUndoId(null)}
      />
    </div>
  );
}
