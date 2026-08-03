"use client";

import { useEffect, useState } from "react";
import { secretaryPatientRows } from "@/data/secretaryPatients";

const patientOptions = secretaryPatientRows.map((patient) => patient.fullName);

const statusOptions = ["Ödendi", "Bekliyor", "Kısmi Ödeme", "İade"];

const methodOptions = ["Kredi Kartı", "Nakit", "Havale/EFT"];

interface SecretaryPaymentFormState {
  patient: string;
  treatment: string;
  amount: string;
  method: string;
  status: string;
  date: string;
  description: string;
}

const initialFormState: SecretaryPaymentFormState = {
  patient: "",
  treatment: "",
  amount: "",
  method: "",
  status: "",
  date: "",
  description: "",
};

type SecretaryPaymentFormErrors = Partial<Record<keyof SecretaryPaymentFormState, string>>;

function validateSecretaryPaymentForm(values: SecretaryPaymentFormState): SecretaryPaymentFormErrors {
  const nextErrors: SecretaryPaymentFormErrors = {};

  if (!values.patient) {
    nextErrors.patient = "Hasta seçimi zorunludur.";
  }

  if (!values.treatment.trim()) {
    nextErrors.treatment = "Tedavi/işlem bilgisi zorunludur.";
  }

  if (!values.amount.trim()) {
    nextErrors.amount = "Ödeme tutarı zorunludur.";
  } else if (Number.isNaN(Number(values.amount))) {
    nextErrors.amount = "Ödeme tutarı sayısal olmalıdır.";
  } else if (Number(values.amount) <= 0) {
    nextErrors.amount = "Ödeme tutarı 0'dan büyük olmalıdır.";
  }

  if (!values.method) {
    nextErrors.method = "Ödeme yöntemi zorunludur.";
  }

  if (!values.status) {
    nextErrors.status = "Ödeme durumu zorunludur.";
  }

  return nextErrors;
}

export default function AddSecretaryPaymentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<SecretaryPaymentFormState>(initialFormState);
  const [errors, setErrors] = useState<SecretaryPaymentFormErrors>({});

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

  function updateField<K extends keyof SecretaryPaymentFormState>(
    key: K,
    value: SecretaryPaymentFormState[K]
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
    setForm(initialFormState);
    setErrors({});
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateSecretaryPaymentForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Yeni ödeme:", form);
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
        + Yeni Ödeme Ekle
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-secretary-payment-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[24px] border border-[#EEF2F8] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 id="add-secretary-payment-modal-title" className="text-xl font-bold text-[#0B1F55]">
                  Yeni Ödeme Ekle
                </h2>
                <p className="mt-1 text-sm text-[#667085]">Hasta ödeme bilgilerini girin</p>
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
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Tedavi / İşlem</label>
                <input
                  type="text"
                  value={form.treatment}
                  onChange={(event) => updateField("treatment", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.treatment ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                />
                {errors.treatment && <p className="mt-1 text-sm text-[#EF4444]">{errors.treatment}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Tutar</label>
                <input
                  type="number"
                  min={0}
                  value={form.amount}
                  onChange={(event) => updateField("amount", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.amount ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                />
                {errors.amount && <p className="mt-1 text-sm text-[#EF4444]">{errors.amount}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Ödeme Yöntemi</label>
                <select
                  value={form.method}
                  onChange={(event) => updateField("method", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.method ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Yöntem seçin</option>
                  {methodOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.method && <p className="mt-1 text-sm text-[#EF4444]">{errors.method}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Ödeme Durumu</label>
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
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Tarih</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(event) => updateField("date", event.target.value)}
                  autoComplete="off"
                  className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Açıklama</label>
                <textarea
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="Ek açıklamalarınızı buraya yazabilirsiniz..."
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
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
                >
                  Ödeme Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
