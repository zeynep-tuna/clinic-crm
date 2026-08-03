"use client";

import { useEffect, useState } from "react";

const genderOptions = ["Kadın", "Erkek"];

const bloodTypeOptions = [
  "A Rh+",
  "A Rh-",
  "B Rh+",
  "B Rh-",
  "AB Rh+",
  "AB Rh-",
  "0 Rh+",
  "0 Rh-",
];

interface PatientFormState {
  fullName: string;
  phone: string;
  email: string;
  birthDate: string;
  gender: string;
  bloodType: string;
  address: string;
  notes: string;
}

const initialFormState: PatientFormState = {
  fullName: "",
  phone: "",
  email: "",
  birthDate: "",
  gender: "",
  bloodType: "",
  address: "",
  notes: "",
};

type PatientFormErrors = Partial<Record<keyof PatientFormState, string>>;

function validatePatientForm(values: PatientFormState): PatientFormErrors {
  const nextErrors: PatientFormErrors = {};

  if (!values.fullName.trim()) {
    nextErrors.fullName = "Ad soyad zorunludur.";
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

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    nextErrors.email = "Geçerli bir e-posta adresi girin.";
  }

  if (values.birthDate.trim() && !/^\d{2}\.\d{2}\.\d{4}$/.test(values.birthDate.trim())) {
    nextErrors.birthDate = "Geçerli bir tarih girin.";
  }

  if (!values.gender) {
    nextErrors.gender = "Lütfen bir seçim yapın.";
  }

  return nextErrors;
}

export default function AddPatientModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<PatientFormState>(initialFormState);
  const [errors, setErrors] = useState<PatientFormErrors>({});

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

  function updateField<K extends keyof PatientFormState>(key: K, value: PatientFormState[K]) {
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
    const validationErrors = validatePatientForm(form);
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
        + Yeni Hasta Ekle
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-patient-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[20px] border border-[#EAF0F8] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 id="add-patient-modal-title" className="text-xl font-bold text-[#0B1F55]">
                  Yeni Hasta Ekle
                </h2>
                <p className="mt-1 text-sm text-[#667085]">Yeni hasta bilgilerini girin</p>
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
                  placeholder="Örn. Ayşe Demir"
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.fullName ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                />
                {errors.fullName && <p className="mt-1 text-sm text-[#EF4444]">{errors.fullName}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Telefon</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="Örn. +90 555 123 45 67"
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
                  placeholder="Örn. ayse.demir@example.com"
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.email ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-[#EF4444]">{errors.email}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Doğum Tarihi</label>
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
                    type="text"
                    value={form.birthDate}
                    onChange={(event) => updateField("birthDate", event.target.value)}
                    placeholder="GG.AA.YYYY"
                    className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                      errors.birthDate ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                    }`}
                  />
                </div>
                {errors.birthDate && <p className="mt-1 text-sm text-[#EF4444]">{errors.birthDate}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Cinsiyet</label>
                <select
                  value={form.gender}
                  onChange={(event) => updateField("gender", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.gender ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Seçiniz</option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.gender && <p className="mt-1 text-sm text-[#EF4444]">{errors.gender}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Kan Grubu</label>
                <select
                  value={form.bloodType}
                  onChange={(event) => updateField("bloodType", event.target.value)}
                  className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                >
                  <option value="">Seçiniz</option>
                  {bloodTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Adres</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(event) => updateField("address", event.target.value)}
                  placeholder="Örn. Atatürk Cad. No:123 D:5 Kadıköy / İstanbul"
                  className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                />
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
                  Hasta Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
