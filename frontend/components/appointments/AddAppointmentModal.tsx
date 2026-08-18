"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/lib/api";
import { listPatients, type Patient } from "@/lib/patients-api";
import { listDoctors, type Doctor } from "@/lib/doctors-api";
import {
  createAppointment,
  type CreateAppointmentInput,
} from "@/lib/appointments-api";

const departmentOptions = [
  "Diş Hekimliği",
  "Ortodonti",
  "Endodonti",
  "Periodontoloji",
  "Çocuk Diş Hekimliği",
];

const appointmentTypeOptions = ["Muayene", "Kontrol", "Tedavi", "Konsültasyon"];

const statusOptions = ["Onaylandı", "Bekliyor", "Tamamlandı", "İptal"];

const STATUS_TO_BACKEND: Record<string, CreateAppointmentInput["status"]> = {
  Onaylandı: "CONFIRMED",
  Bekliyor: "SCHEDULED",
  Tamamlandı: "COMPLETED",
  İptal: "CANCELLED",
};

const APPOINTMENT_DURATION_MINUTES = 30;

interface AppointmentFormState {
  patientId: string;
  doctorId: string;
  department: string;
  date: string;
  time: string;
  appointmentType: string;
  status: string;
  notes: string;
}

const initialFormState: AppointmentFormState = {
  patientId: "",
  doctorId: "",
  department: "",
  date: "",
  time: "",
  appointmentType: "",
  status: "",
  notes: "",
};

type AppointmentFormErrors = Partial<Record<keyof AppointmentFormState, string>>;

function validateAppointmentForm(values: AppointmentFormState): AppointmentFormErrors {
  const nextErrors: AppointmentFormErrors = {};

  if (!values.patientId) {
    nextErrors.patientId = "Hasta seçimi zorunludur.";
  }

  if (!values.doctorId) {
    nextErrors.doctorId = "Diş hekimi seçimi zorunludur.";
  }

  if (!values.date.trim()) {
    nextErrors.date = "Randevu tarihi zorunludur.";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(values.date);
    if (!Number.isNaN(selectedDate.getTime()) && selectedDate < today) {
      nextErrors.date = "Geçmiş tarihli randevu oluşturulamaz.";
    }
  }

  if (!values.time.trim()) {
    nextErrors.time = "Randevu saati zorunludur.";
  }

  if (!values.appointmentType) {
    nextErrors.appointmentType = "İşlem türü zorunludur.";
  }

  if (!values.status) {
    nextErrors.status = "Lütfen bir seçim yapın.";
  }

  return nextErrors;
}

function buildStartAtIso(dateStr: string, timeStr: string): string | null {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);

  if (!year || !month || !day || Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }

  const localDate = new Date(year, month - 1, day, hour, minute, 0, 0);
  if (Number.isNaN(localDate.getTime())) {
    return null;
  }

  return localDate.toISOString();
}

function addMinutesIso(iso: string, minutes: number): string {
  const date = new Date(iso);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
}

interface AddAppointmentModalProps {
  onCreated?: () => void;
}

export default function AddAppointmentModal({ onCreated }: AddAppointmentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<AppointmentFormState>(initialFormState);
  const [errors, setErrors] = useState<AppointmentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setIsLoadingOptions(true);
    setOptionsError(null);

    Promise.all([listPatients(), listDoctors()])
      .then(([patientsData, doctorsData]) => {
        if (cancelled) return;
        setPatients(patientsData);
        setDoctors(doctorsData);
      })
      .catch(() => {
        if (cancelled) return;
        setOptionsError("Hasta veya doktor listesi yüklenirken bir hata oluştu.");
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoadingOptions(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  function updateField<K extends keyof AppointmentFormState>(
    key: K,
    value: AppointmentFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function closeModal() {
    setIsOpen(false);
    setErrors({});
    setApiError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApiError(null);

    const validationErrors = validateAppointmentForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const startAt = buildStartAtIso(form.date, form.time);
    if (!startAt) {
      setErrors((prev) => ({ ...prev, date: "Geçerli bir tarih ve saat girin." }));
      return;
    }

    const endAt = addMinutesIso(startAt, APPOINTMENT_DURATION_MINUTES);

    const input: CreateAppointmentInput = {
      patientId: form.patientId,
      doctorId: form.doctorId,
      startAt,
      endAt,
      ...(form.appointmentType ? { title: form.appointmentType } : {}),
      ...(form.notes.trim() ? { notes: form.notes.trim() } : {}),
      ...(form.status ? { status: STATUS_TO_BACKEND[form.status] } : {}),
    };

    setIsSubmitting(true);

    try {
      await createAppointment(input);
      setForm(initialFormState);
      setErrors({});
      setIsOpen(false);
      onCreated?.();
    } catch (submitError) {
      const isDoctorConflict =
        submitError instanceof ApiError &&
        submitError.status === 400 &&
        submitError.message.includes("already has an active appointment");

      if (isDoctorConflict) {
        setApiError("Seçilen doktorun bu saat aralığında başka bir randevusu var.");
      } else {
        setApiError("Randevu oluşturulurken bir hata oluştu.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-11 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-colors hover:bg-[#4c3fd1]"
      >
        + Yeni Randevu Ekle
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-appointment-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[20px] border border-[#EAF0F8] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 id="add-appointment-modal-title" className="text-xl font-bold text-[#0B1F55]">
                  Yeni Randevu Oluştur
                </h2>
                <p className="mt-1 text-sm text-[#667085]">Hasta için yeni randevu planlayın.</p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Kapat"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#667085] hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {optionsError && (
                <p className="rounded-xl bg-[#FEF2F2] px-4 py-2.5 text-sm text-[#EF4444] sm:col-span-2">
                  {optionsError}
                </p>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Hasta</label>
                <select
                  value={form.patientId}
                  onChange={(event) => updateField("patientId", event.target.value)}
                  disabled={isLoadingOptions}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.patientId ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">{isLoadingOptions ? "Yükleniyor..." : "Hasta seçin"}</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {`${patient.firstName} ${patient.lastName}`.trim()}
                    </option>
                  ))}
                </select>
                {errors.patientId && <p className="mt-1 text-sm text-[#EF4444]">{errors.patientId}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Diş Hekimi</label>
                <select
                  value={form.doctorId}
                  onChange={(event) => updateField("doctorId", event.target.value)}
                  disabled={isLoadingOptions}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.doctorId ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">{isLoadingOptions ? "Yükleniyor..." : "Diş hekimi seçin"}</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.fullName}
                    </option>
                  ))}
                </select>
                {errors.doctorId && <p className="mt-1 text-sm text-[#EF4444]">{errors.doctorId}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Bölüm</label>
                <select
                  value={form.department}
                  onChange={(event) => updateField("department", event.target.value)}
                  className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                >
                  <option value="">Bölüm seçin</option>
                  {departmentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Tarih</label>
                <div className="relative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
                  >
                    <rect x="4" y="5" width="16" height="15" rx="2" />
                    <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
                  </svg>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) => updateField("date", event.target.value)}
                    autoComplete="off"
                    className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                      errors.date ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                    }`}
                  />
                </div>
                {errors.date && <p className="mt-1 text-sm text-[#EF4444]">{errors.date}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Saat</label>
                <div className="relative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
                  >
                    <circle cx="12" cy="12" r="8.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
                  </svg>
                  <input
                    type="time"
                    step={900}
                    value={form.time}
                    onChange={(event) => updateField("time", event.target.value)}
                    autoComplete="off"
                    className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                      errors.time ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                    }`}
                  />
                </div>
                {errors.time && <p className="mt-1 text-sm text-[#EF4444]">{errors.time}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Randevu Türü</label>
                <select
                  value={form.appointmentType}
                  onChange={(event) => updateField("appointmentType", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.appointmentType ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Tür seçin</option>
                  {appointmentTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.appointmentType && (
                  <p className="mt-1 text-sm text-[#EF4444]">{errors.appointmentType}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Durum</label>
                <select
                  value={form.status}
                  onChange={(event) => updateField("status", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 sm:max-w-[calc(50%-0.75rem)] ${
                    errors.status ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Durum seçin</option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.status && <p className="mt-1 text-sm text-[#EF4444]">{errors.status}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Notlar</label>
                <textarea
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Not eklemek için yazın..."
                  rows={4}
                  className="w-full resize-y rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                />
              </div>

              {apiError && (
                <p className="rounded-xl bg-[#FEF2F2] px-4 py-2.5 text-sm text-[#EF4444] sm:col-span-2">
                  {apiError}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 sm:col-span-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-[#EAF0F8] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Randevu oluşturuluyor..." : "Randevu Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
