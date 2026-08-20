"use client";

import { useEffect, useState } from "react";
import { listPatients, type Patient } from "@/lib/patients-api";
import {
  createPayment,
  type CreatePaymentInput,
  type PaymentMethod,
} from "@/lib/payments-api";

const paymentMethodOptions: { value: PaymentMethod; label: string }[] = [
  { value: "CASH", label: "Nakit" },
  { value: "CARD", label: "Kart" },
  { value: "BANK_TRANSFER", label: "Havale / Banka Transferi" },
];

interface SecretaryPaymentFormState {
  patientId: string;
  amount: string;
  paymentMethod: string;
  paymentDate: string;
  note: string;
}

const initialFormState: SecretaryPaymentFormState = {
  patientId: "",
  amount: "",
  paymentMethod: "",
  paymentDate: "",
  note: "",
};

type SecretaryPaymentFormErrors = Partial<Record<keyof SecretaryPaymentFormState, string>>;

function validateSecretaryPaymentForm(values: SecretaryPaymentFormState): SecretaryPaymentFormErrors {
  const nextErrors: SecretaryPaymentFormErrors = {};

  if (!values.patientId) {
    nextErrors.patientId = "Hasta seçimi zorunludur.";
  }

  if (!values.amount.trim()) {
    nextErrors.amount = "Ödeme tutarı zorunludur.";
  } else {
    const amount = Number(values.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      nextErrors.amount = "Ödeme tutarı 0'dan büyük geçerli bir sayı olmalıdır.";
    }
  }

  if (!values.paymentMethod) {
    nextErrors.paymentMethod = "Ödeme yöntemi zorunludur.";
  }

  return nextErrors;
}

interface AddSecretaryPaymentModalProps {
  onCreated?: () => void | Promise<void>;
}

export default function AddSecretaryPaymentModal({ onCreated }: AddSecretaryPaymentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<SecretaryPaymentFormState>(initialFormState);
  const [errors, setErrors] = useState<SecretaryPaymentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);
  const [patientsError, setPatientsError] = useState<string | null>(null);

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
    setIsLoadingPatients(true);
    setPatientsError(null);

    listPatients()
      .then((data) => {
        if (cancelled) return;
        setPatients(data);
      })
      .catch(() => {
        if (cancelled) return;
        setPatientsError("Hastalar yüklenirken bir hata oluştu.");
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoadingPatients(false);
      });

    return () => {
      cancelled = true;
    };
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
    setApiError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApiError(null);

    const validationErrors = validateSecretaryPaymentForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const input: CreatePaymentInput = {
      patientId: form.patientId,
      amount: Number(form.amount),
      paymentMethod: form.paymentMethod as PaymentMethod,
      ...(form.paymentDate ? { paymentDate: form.paymentDate } : {}),
      ...(form.note.trim() ? { note: form.note.trim() } : {}),
    };

    setIsSubmitting(true);

    try {
      await createPayment(input);
      setForm(initialFormState);
      setErrors({});
      setIsOpen(false);
      await onCreated?.();
    } catch {
      setApiError("Ödeme eklenirken bir hata oluştu.");
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
              {patientsError && (
                <p className="rounded-xl bg-[#FEF2F2] px-4 py-2.5 text-sm text-[#EF4444] sm:col-span-2">
                  {patientsError}
                </p>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Hasta</label>
                <select
                  value={form.patientId}
                  onChange={(event) => updateField("patientId", event.target.value)}
                  disabled={isLoadingPatients}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.patientId ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">{isLoadingPatients ? "Yükleniyor..." : "Hasta seçin"}</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {`${patient.firstName} ${patient.lastName}`.trim()}
                    </option>
                  ))}
                </select>
                {errors.patientId && <p className="mt-1 text-sm text-[#EF4444]">{errors.patientId}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Tutar</label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
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
                  value={form.paymentMethod}
                  onChange={(event) => updateField("paymentMethod", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.paymentMethod ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Yöntem seçin</option>
                  {paymentMethodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.paymentMethod && <p className="mt-1 text-sm text-[#EF4444]">{errors.paymentMethod}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Tarih</label>
                <input
                  type="date"
                  value={form.paymentDate}
                  onChange={(event) => updateField("paymentDate", event.target.value)}
                  autoComplete="off"
                  className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Açıklama</label>
                <textarea
                  value={form.note}
                  onChange={(event) => updateField("note", event.target.value)}
                  placeholder="Ek açıklamalarınızı buraya yazabilirsiniz..."
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
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Kaydediliyor..." : "Ödeme Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
