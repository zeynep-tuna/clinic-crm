"use client";

import { useEffect, useState } from "react";

const specialtyOptions = [
  "Diş Hekimi",
  "Ortodontist",
  "Endodontist",
  "Periodontolog",
  "Protetik Diş Tedavisi Uzmanı",
  "Çocuk Diş Hekimi",
  "Ağız, Diş ve Çene Cerrahisi Uzmanı",
];

const statusOptions = ["Aktif", "İzinli", "Pasif"];

interface DoctorFormState {
  fullName: string;
  specialty: string;
  phone: string;
  email: string;
  todayAppointments: string;
  status: string;
  notes: string;
}

const initialFormState: DoctorFormState = {
  fullName: "",
  specialty: "",
  phone: "",
  email: "",
  todayAppointments: "",
  status: "",
  notes: "",
};

type DoctorFormErrors = Partial<Record<keyof DoctorFormState, string>>;

function validateDoctorForm(values: DoctorFormState): DoctorFormErrors {
  const nextErrors: DoctorFormErrors = {};

  if (!values.fullName.trim()) {
    nextErrors.fullName = "Ad soyad zorunludur.";
  }

  if (!values.specialty) {
    nextErrors.specialty = "Uzmanlık alanı zorunludur.";
  }

  if (!values.phone.trim()) {
    nextErrors.phone = "Telefon numarası zorunludur.";
  } else {
    const digitCount = values.phone.replace(/\D/g, "").length;
    const hasLetters = /[a-zA-Z]/.test(values.phone);
    if (digitCount < 10 || hasLetters) {
      nextErrors.phone = "Geçerli bir telefon numarası girin.";
    }
  }

  if (!values.email.trim()) {
    nextErrors.email = "E-posta adresi zorunludur.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    nextErrors.email = "Geçerli bir e-posta adresi girin.";
  }

  if (!values.status) {
    nextErrors.status = "Lütfen bir seçim yapın.";
  }

  return nextErrors;
}

export default function AddDoctorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<DoctorFormState>(initialFormState);
  const [errors, setErrors] = useState<DoctorFormErrors>({});

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

  function updateField<K extends keyof DoctorFormState>(key: K, value: DoctorFormState[K]) {
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
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateDoctorForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setForm(initialFormState);
    setErrors({});
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-11 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-colors hover:bg-[#4c3fd1]"
      >
        + Yeni Diş Hekimi Ekle
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-doctor-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[20px] border border-[#EAF0F8] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 id="add-doctor-modal-title" className="text-xl font-bold text-[#0B1F55]">
                  Yeni Doktor Ekle
                </h2>
                <p className="mt-1 text-sm text-[#667085]">Yeni doktor bilgilerini girin</p>
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
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Ad Soyad</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.fullName ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                />
                {errors.fullName && <p className="mt-1 text-sm text-[#EF4444]">{errors.fullName}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Uzmanlık</label>
                <select
                  value={form.specialty}
                  onChange={(event) => updateField("specialty", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.specialty ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Uzmanlık seçin</option>
                  {specialtyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.specialty && <p className="mt-1 text-sm text-[#EF4444]">{errors.specialty}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Telefon</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.phone ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-[#EF4444]">{errors.phone}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">E-posta</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.email ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-[#EF4444]">{errors.email}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Bugünkü Randevu</label>
                <input
                  type="number"
                  min={0}
                  value={form.todayAppointments}
                  onChange={(event) => updateField("todayAppointments", event.target.value)}
                  className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Durum</label>
                <select
                  value={form.status}
                  onChange={(event) => updateField("status", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
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
                  placeholder="Ek notlarınızı buraya yazabilirsiniz..."
                  rows={4}
                  className="w-full resize-y rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                />
              </div>

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
                  className="rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
                >
                  Doktor Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
