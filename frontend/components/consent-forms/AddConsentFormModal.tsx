"use client";

import { useEffect, useState } from "react";

const patientOptions = [
  "Ayşe Demir",
  "Mehmet Kaya",
  "Zeynep Aydın",
  "Ali Yıldız",
  "Fatma Öz",
  "Elif Arslan",
];

const formTypeOptions = ["Tedavi", "İmplant", "Ortodonti", "Cerrahi", "KVKK", "Muayene"];

const statusOptions = ["İmzalandı", "Bekliyor", "Eksik"];

interface ConsentFormFormState {
  patient: string;
  formTitle: string;
  formType: string;
  date: string;
  status: string;
  notes: string;
}

const initialFormState: ConsentFormFormState = {
  patient: "",
  formTitle: "",
  formType: "",
  date: "",
  status: "",
  notes: "",
};

type ConsentFormFormErrors = Partial<Record<keyof ConsentFormFormState, string>>;

function validateConsentFormForm(values: ConsentFormFormState): ConsentFormFormErrors {
  const nextErrors: ConsentFormFormErrors = {};

  if (!values.patient) {
    nextErrors.patient = "Hasta seçimi zorunludur.";
  }

  if (!values.formTitle.trim()) {
    nextErrors.formTitle = "Form adı zorunludur.";
  }

  if (!values.formType) {
    nextErrors.formType = "Form türü zorunludur.";
  }

  if (!values.status) {
    nextErrors.status = "Form durumu zorunludur.";
  }

  return nextErrors;
}

export default function AddConsentFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ConsentFormFormState>(initialFormState);
  const [errors, setErrors] = useState<ConsentFormFormErrors>({});

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

  function updateField<K extends keyof ConsentFormFormState>(
    key: K,
    value: ConsentFormFormState[K]
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
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateConsentFormForm(form);
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
        + Yeni Onam Formu Ekle
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-consent-form-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[20px] border border-[#EAF0F8] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 id="add-consent-form-modal-title" className="text-xl font-bold text-[#0B1F55]">
                  Yeni Onam Formu Ekle
                </h2>
                <p className="mt-1 text-sm text-[#667085]">Hasta onam formu bilgilerini girin</p>
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
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Hasta</label>
                <select
                  value={form.patient}
                  onChange={(event) => updateField("patient", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.patient ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Hasta seçin</option>
                  {patientOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.patient && <p className="mt-1 text-sm text-[#EF4444]">{errors.patient}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Form Adı</label>
                <input
                  type="text"
                  value={form.formTitle}
                  onChange={(event) => updateField("formTitle", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.formTitle ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                />
                {errors.formTitle && <p className="mt-1 text-sm text-[#EF4444]">{errors.formTitle}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Form Türü</label>
                <select
                  value={form.formType}
                  onChange={(event) => updateField("formType", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.formType ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Form türü seçin</option>
                  {formTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.formType && <p className="mt-1 text-sm text-[#EF4444]">{errors.formType}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Tarih</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(event) => updateField("date", event.target.value)}
                  autoComplete="off"
                  className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Dosya</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] file:mr-3 file:rounded-lg file:border-0 file:bg-[#EEF0FF] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[#5B4DE3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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
                  Onam Formu Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
