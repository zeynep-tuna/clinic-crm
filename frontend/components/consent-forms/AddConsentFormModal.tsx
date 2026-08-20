"use client";

import { useEffect, useState } from "react";
import { listPatients, type Patient } from "@/lib/patients-api";
import {
  createConsentForm,
  type ConsentFormStatus,
  type CreateConsentFormInput,
} from "@/lib/consent-forms-api";

const consentFormTemplates: { title: string; formType: string }[] = [
  { title: "İmplant Tedavisi Onam Formu", formType: "İmplant" },
  { title: "Diş Çekimi Onam Formu", formType: "Cerrahi" },
  { title: "Ortodontik Tedavi Onam Formu", formType: "Ortodonti" },
  { title: "Kanal Tedavisi Onam Formu", formType: "Tedavi" },
  { title: "KVKK Aydınlatma ve Onam Formu", formType: "KVKK" },
  { title: "Genel Muayene Onam Formu", formType: "Muayene" },
];

const statusOptions: { value: ConsentFormStatus; label: string }[] = [
  { value: "SIGNED", label: "İmzalandı" },
  { value: "PENDING", label: "Bekliyor" },
  { value: "MISSING", label: "Eksik" },
];

interface ConsentFormFormState {
  patientId: string;
  title: string;
  formType: string;
  content: string;
  status: string;
  signedAt: string;
  note: string;
}

const initialFormState: ConsentFormFormState = {
  patientId: "",
  title: "",
  formType: "",
  content: "",
  status: "",
  signedAt: "",
  note: "",
};

type ConsentFormFormErrors = Partial<Record<keyof ConsentFormFormState, string>>;

function validateConsentFormForm(values: ConsentFormFormState): ConsentFormFormErrors {
  const nextErrors: ConsentFormFormErrors = {};

  if (!values.patientId) {
    nextErrors.patientId = "Hasta seçimi zorunludur.";
  }

  if (!values.title.trim()) {
    nextErrors.title = "Form adı zorunludur.";
  }

  if (!values.formType) {
    nextErrors.formType = "Form türü zorunludur.";
  }

  if (!values.content.trim()) {
    nextErrors.content = "Form içeriği zorunludur.";
  }

  if (values.status === "SIGNED" && !values.signedAt) {
    nextErrors.signedAt = "İmzalanma tarihi zorunludur.";
  }

  return nextErrors;
}

interface AddConsentFormModalProps {
  onCreated?: () => void | Promise<void>;
}

export default function AddConsentFormModal({ onCreated }: AddConsentFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ConsentFormFormState>(initialFormState);
  const [errors, setErrors] = useState<ConsentFormFormErrors>({});
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

  function handleTitleChange(value: string) {
    const template = consentFormTemplates.find((option) => option.title === value);

    setForm((prev) => ({
      ...prev,
      title: value,
      formType: template ? template.formType : "",
    }));
    setErrors((prev) => {
      if (!prev.title && !prev.formType) return prev;
      const next = { ...prev };
      delete next.title;
      delete next.formType;
      return next;
    });
  }

  function handleStatusChange(value: string) {
    setForm((prev) => ({
      ...prev,
      status: value,
      signedAt: value === "SIGNED" ? prev.signedAt : "",
    }));
    setErrors((prev) => {
      if (!prev.status && !prev.signedAt) return prev;
      const next = { ...prev };
      delete next.status;
      if (value !== "SIGNED") {
        delete next.signedAt;
      }
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

    const validationErrors = validateConsentFormForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const input: CreateConsentFormInput = {
      patientId: form.patientId,
      title: form.title.trim(),
      formType: form.formType,
      content: form.content.trim(),
      ...(form.status ? { status: form.status as ConsentFormStatus } : {}),
      ...(form.status === "SIGNED" && form.signedAt ? { signedAt: form.signedAt } : {}),
      ...(form.note.trim() ? { note: form.note.trim() } : {}),
    };

    setIsSubmitting(true);

    try {
      await createConsentForm(input);
      setForm(initialFormState);
      setErrors({});
      setIsOpen(false);
      await onCreated?.();
    } catch {
      setApiError("Onam formu eklenirken bir hata oluştu.");
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
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Form Adı</label>
                <select
                  value={form.title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.title ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Form adı seçin</option>
                  {consentFormTemplates.map((option) => (
                    <option key={option.title} value={option.title}>
                      {option.title}
                    </option>
                  ))}
                </select>
                {errors.title && <p className="mt-1 text-sm text-[#EF4444]">{errors.title}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Form Türü</label>
                <select
                  value={form.formType}
                  disabled
                  onChange={() => {}}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 disabled:cursor-not-allowed disabled:bg-[#F7F8FF] disabled:text-[#667085] ${
                    errors.formType ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Form adı seçildiğinde otomatik belirlenir</option>
                  {consentFormTemplates.map((option) => (
                    <option key={option.formType} value={option.formType}>
                      {option.formType}
                    </option>
                  ))}
                </select>
                {errors.formType && <p className="mt-1 text-sm text-[#EF4444]">{errors.formType}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Durum</label>
                <select
                  value={form.status}
                  onChange={(event) => handleStatusChange(event.target.value)}
                  className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                >
                  <option value="">Durum seçin (varsayılan: Bekliyor)</option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {form.status === "SIGNED" && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">İmzalanma Tarihi</label>
                  <input
                    type="date"
                    value={form.signedAt}
                    onChange={(event) => updateField("signedAt", event.target.value)}
                    autoComplete="off"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                      errors.signedAt ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                    }`}
                  />
                  {errors.signedAt && <p className="mt-1 text-sm text-[#EF4444]">{errors.signedAt}</p>}
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Form İçeriği</label>
                <textarea
                  value={form.content}
                  onChange={(event) => updateField("content", event.target.value)}
                  placeholder="Onam formunun metnini buraya yazın..."
                  rows={4}
                  className={`w-full resize-y rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.content ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                />
                {errors.content && <p className="mt-1 text-sm text-[#EF4444]">{errors.content}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Notlar</label>
                <textarea
                  value={form.note}
                  onChange={(event) => updateField("note", event.target.value)}
                  placeholder="Ek notlarınızı buraya yazabilirsiniz..."
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
                  {isSubmitting ? "Kaydediliyor..." : "Onam Formu Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
