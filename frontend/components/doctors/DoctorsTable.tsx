"use client";

import { useMemo, useState } from "react";
import { doctors, type DoctorStatus } from "@/data/doctors";
import EmptyState from "@/components/common/EmptyState";
import AddDoctorModal from "@/components/doctors/AddDoctorModal";
import ConfirmDialog from "@/components/common/ConfirmDialog";

type FilterValue = "Tümü" | DoctorStatus;

const filters: FilterValue[] = ["Tümü", "Aktif", "İzinli", "Pasif"];

const statusBadgeClass: Record<DoctorStatus, string> = {
  Aktif: "bg-[#DCFCE7] text-[#16A34A]",
  İzinli: "bg-[#FEF3C7] text-[#F59E0B]",
  Pasif: "bg-[#F3F4F6] text-[#667085]",
};

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

function getInitials(fullName: string) {
  const nameWithoutTitle = fullName.replace(/^Dr\.\s*/i, "").trim();
  const parts = nameWithoutTitle.split(/\s+/).filter(Boolean);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <circle cx="9" cy="8" r="3" />
      <path strokeLinecap="round" d="M2.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
      <path strokeLinecap="round" d="M15.5 5.5a3 3 0 0 1 0 5.8M18 19c-.4-2.3-1.5-4-3.2-4.8" />
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}

function PauseCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" d="M10 9.5v5M14 9.5v5" />
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

export default function DoctorsTable() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [doctorList, setDoctorList] = useState(doctors);
  const [pendingDeactivateId, setPendingDeactivateId] = useState<string | null>(null);

  const totalCount = doctorList.length;
  const activeCount = doctorList.filter((doctor) => doctor.status === "Aktif").length;
  const onLeaveCount = doctorList.filter((doctor) => doctor.status === "İzinli").length;
  const inactiveCount = doctorList.filter((doctor) => doctor.status === "Pasif").length;

  const summaryItems: {
    label: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    filterValue: FilterValue;
  }[] = [
    { label: "Toplam Hekim", value: totalCount, icon: <UsersIcon />, color: "bg-[#EEF0FF] text-[#5B4DE3]", filterValue: "Tümü" },
    {
      label: "Aktif Hekim",
      value: activeCount,
      icon: <CheckCircleIcon />,
      color: "bg-[#DCFCE7] text-[#16A34A]",
      filterValue: "Aktif",
    },
    {
      label: "İzinli",
      value: onLeaveCount,
      icon: <ClockIcon />,
      color: "bg-[#FEF3C7] text-[#F59E0B]",
      filterValue: "İzinli",
    },
    {
      label: "Pasif",
      value: inactiveCount,
      icon: <PauseCircleIcon />,
      color: "bg-[#F3F4F6] text-[#667085]",
      filterValue: "Pasif",
    },
  ];

  const filteredDoctors = useMemo(() => {
    const term = search.trim().toLowerCase();

    return doctorList.filter((doctor) => {
      const matchesFilter = activeFilter === "Tümü" || doctor.status === activeFilter;
      const matchesSearch =
        term === "" ||
        doctor.fullName.toLowerCase().includes(term) ||
        doctor.specialty.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter, doctorList]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#EAF0F8]/60">
        {summaryItems.map((item) => {
          const isSelected = activeFilter === item.filterValue;

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
              placeholder="Bu listede hekim veya uzmanlık ara..."
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
          {doctorList.length === 0 && (
            <EmptyState
              variant="empty"
              title="Henüz hekim kaydı yok"
              description="Diş kliniğinizde görev yapan hekimleri ekleyerek çalışma takibini başlatabilirsiniz."
              action={<AddDoctorModal />}
            />
          )}

          {doctorList.length > 0 && filteredDoctors.length === 0 && (
            <EmptyState
              variant="search"
              title="Eşleşen hekim bulunamadı"
              description="Hekim adı, uzmanlık veya durum filtresini değiştirerek tekrar deneyin."
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

          {filteredDoctors.length > 0 && (
          <table className="w-full min-w-292 table-fixed text-left">
            <thead>
              <tr className="border-b border-[#EAF0F8]/70 text-xs font-semibold tracking-wide text-[#667085] uppercase">
                <th className="w-56 pb-2.5 pr-4 font-medium">Doktor Adı</th>
                <th className="w-44 pb-2.5 pr-4 font-medium">Uzmanlık</th>
                <th className="w-40 pb-2.5 pr-4 font-medium">Telefon</th>
                <th className="w-52 pb-2.5 pr-4 font-medium">E-posta</th>
                <th className="w-40 whitespace-nowrap pb-2.5 pr-4 text-center font-medium">Bugünkü Randevu</th>
                <th className="w-32 pb-2.5 pr-4 font-medium">Durum</th>
                <th className="w-28 pb-2.5 font-medium">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  onClick={() => console.log("Doktor detayına git:", doctor.id)}
                  className="cursor-pointer border-b border-[#EAF0F8]/60 transition-colors last:border-0 hover:bg-[#F8F9FF]"
                >
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarColor(doctor.id)}`}
                      >
                        {getInitials(doctor.fullName)}
                      </div>
                      <span className="truncate text-sm font-medium text-[#0B1F55]">{doctor.fullName}</span>
                    </div>
                  </td>
                  <td className="truncate py-4 pr-4 text-sm text-[#0B1F55]" title={doctor.specialty}>
                    {doctor.specialty}
                  </td>
                  <td className="truncate py-4 pr-4 text-sm text-[#0B1F55]">{doctor.phone}</td>
                  <td className="truncate py-4 pr-4 text-sm text-[#667085]">{doctor.email}</td>
                  <td className="py-4 pr-4 text-center text-sm text-[#0B1F55]">
                    {doctor.todayAppointments} randevu
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusBadgeClass[doctor.status]}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {doctor.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3 text-[#667085]">
                      <button
                        type="button"
                        aria-label="Düzenle"
                        onClick={(event) => event.stopPropagation()}
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                      >
                        <EditIcon />
                      </button>
                      <button
                        type="button"
                        aria-label="Diğer işlemler"
                        onClick={(event) => event.stopPropagation()}
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
                      >
                        <MoreIcon />
                      </button>
                      <button
                        type="button"
                        aria-label="Hekimi pasifleştir"
                        onClick={(event) => {
                          event.stopPropagation();
                          setPendingDeactivateId(doctor.id);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#FEF3C7] hover:text-[#F59E0B]"
                      >
                        <PauseCircleIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#EAF0F8]/70 pt-5">
          <p className="text-sm text-[#667085]">Toplam {filteredDoctors.length} kayıt</p>

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

      <ConfirmDialog
        open={pendingDeactivateId !== null}
        title="Hekimi pasifleştirmek istiyor musunuz?"
        description="Seçili diş hekimi aktif listeden pasif duruma alınacak. Randevu planlamasında görünürlüğü etkilenebilir."
        confirmLabel="Hekimi Pasifleştir"
        variant="warning"
        onConfirm={() => {
          setDoctorList((prev) =>
            prev.map((doctor) =>
              doctor.id === pendingDeactivateId ? { ...doctor, status: "Pasif" } : doctor
            )
          );
          setPendingDeactivateId(null);
        }}
        onCancel={() => setPendingDeactivateId(null)}
      />
    </div>
  );
}
