"use client";

import { useMemo, useState } from "react";
import type { Doctor } from "@/lib/doctors-api";
import type { Appointment } from "@/lib/appointments-api";
import EmptyState from "@/components/common/EmptyState";

function getDoctorInitials(name: string) {
  const parts = name.split(" ").filter((part) => part !== "Dr." && part !== "Dr");
  return parts
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

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

interface SecretaryDoctorScheduleTableProps {
  doctors: Doctor[];
  todayAppointments: Appointment[];
  selectedDoctorId: string | null;
  onSelectDoctor: (doctorId: string) => void;
}

export default function SecretaryDoctorScheduleTable({
  doctors,
  todayAppointments,
  selectedDoctorId,
  onSelectDoctor,
}: SecretaryDoctorScheduleTableProps) {
  const [search, setSearch] = useState("");

  const filteredDoctors = useMemo(() => {
    const term = search.trim().toLowerCase();

    return doctors.filter((doctor) => {
      return (
        term === "" ||
        doctor.fullName.toLowerCase().includes(term) ||
        (doctor.specialty ?? "").toLowerCase().includes(term)
      );
    });
  }, [search, doctors]);

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
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
          placeholder="Bu listede doktor veya uzmanlık ara..."
          className="w-full rounded-xl border border-[#EAF0F8] bg-white py-2 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
        />
      </div>

      <div className="mt-5 overflow-x-auto">
        {doctors.length === 0 && (
          <EmptyState
            variant="empty"
            title="Aktif doktor bulunmuyor"
            description="Kliniğinize doktor eklendiğinde takvimleri burada görüntülenir."
          />
        )}

        {doctors.length > 0 && filteredDoctors.length === 0 && (
          <EmptyState
            variant="search"
            title="Eşleşen doktor bulunamadı"
            description="Doktor adı veya uzmanlığını değiştirerek tekrar deneyin."
            action={
              <button
                type="button"
                onClick={() => setSearch("")}
                className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
              >
                Aramayı temizle
              </button>
            }
          />
        )}

        {filteredDoctors.length > 0 && (
          <table className="w-full min-w-150 text-left">
            <thead>
              <tr className="border-b border-[#EAF0F8] text-xs font-semibold tracking-wide text-[#667085] uppercase">
                <th className="pb-2.5 font-medium">Doktor</th>
                <th className="pb-2.5 font-medium">Uzmanlık</th>
                <th className="pb-2.5 font-medium">Bugünkü Randevu</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => {
                const doctorTodayCount = todayAppointments.filter(
                  (appointment) => appointment.doctorId === doctor.id
                ).length;
                const isSelected = doctor.id === selectedDoctorId;

                return (
                  <tr
                    key={doctor.id}
                    onClick={() => onSelectDoctor(doctor.id)}
                    className={`cursor-pointer border-b border-[#EAF0F8]/60 transition-colors last:border-0 hover:bg-[#F8F9FF] ${
                      isSelected ? "bg-[#F7F8FF]" : ""
                    }`}
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarColor(doctor.id)}`}
                        >
                          {getDoctorInitials(doctor.fullName)}
                        </div>
                        <span className="text-sm font-medium text-[#0B1F55]">{doctor.fullName}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-[#0B1F55]">{doctor.specialty ?? "—"}</td>
                    <td className="py-4 text-sm text-[#0B1F55]">{doctorTodayCount} randevu</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#EAF0F8] pt-5">
        <p className="text-sm text-[#667085]">Toplam {filteredDoctors.length} kayıt</p>
      </div>
    </div>
  );
}
