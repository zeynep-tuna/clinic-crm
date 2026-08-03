"use client";

import { useEffect, useState } from "react";

const recipientTypeOptions = ["Hasta", "Diş Hekimi", "Klinik Yönetimi"];

const recipientOptions = ["Ayşe Demir", "Mehmet Kaya", "Dr. Elif Kaya", "Dr. Ahmet Can", "Klinik Yönetimi"];

const priorityOptions = ["Normal", "Acil", "Düşük"];

interface SecretaryMessageFormState {
  recipientType: string;
  recipient: string;
  subject: string;
  priority: string;
  message: string;
}

const initialFormState: SecretaryMessageFormState = {
  recipientType: "",
  recipient: "",
  subject: "",
  priority: "",
  message: "",
};

type SecretaryMessageFormErrors = Partial<Record<keyof SecretaryMessageFormState, string>>;

function validateSecretaryMessageForm(values: SecretaryMessageFormState): SecretaryMessageFormErrors {
  const nextErrors: SecretaryMessageFormErrors = {};

  if (!values.recipientType) {
    nextErrors.recipientType = "Alıcı türü seçimi zorunludur.";
  }

  if (!values.recipient) {
    nextErrors.recipient = "Alıcı seçimi zorunludur.";
  }

  const trimmedSubject = values.subject.trim();
  if (!trimmedSubject) {
    nextErrors.subject = "Konu alanı zorunludur.";
  } else if (trimmedSubject.length < 3) {
    nextErrors.subject = "Konu en az 3 karakter olmalıdır.";
  }

  if (!values.priority) {
    nextErrors.priority = "Öncelik seçimi zorunludur.";
  }

  const trimmedMessage = values.message.trim();
  if (!trimmedMessage) {
    nextErrors.message = "Mesaj alanı boş bırakılamaz.";
  } else if (trimmedMessage.length < 3) {
    nextErrors.message = "Mesaj en az 3 karakter olmalıdır.";
  }

  return nextErrors;
}

export default function AddSecretaryMessageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<SecretaryMessageFormState>(initialFormState);
  const [errors, setErrors] = useState<SecretaryMessageFormErrors>({});

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

  function updateField<K extends keyof SecretaryMessageFormState>(
    key: K,
    value: SecretaryMessageFormState[K]
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
    const validationErrors = validateSecretaryMessageForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Yeni mesaj:", form);
    setForm(initialFormState);
    setErrors({});
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-11 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.06)] transition-colors hover:bg-[#4c3fd1]"
      >
        + Yeni Mesaj
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-secretary-message-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[24px] border border-[#EEF2F8] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 id="add-secretary-message-modal-title" className="text-xl font-bold text-[#0B1F55]">
                  Yeni Mesaj Oluştur
                </h2>
                <p className="mt-1 text-sm text-[#667085]">
                  Hasta, diş hekimi veya klinik yönetimine yeni bir mesaj gönderin.
                </p>
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

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Alıcı Türü</label>
                <select
                  value={form.recipientType}
                  onChange={(event) => updateField("recipientType", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.recipientType ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Seçiniz</option>
                  {recipientTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.recipientType && (
                  <p className="mt-1 text-sm text-[#EF4444]">{errors.recipientType}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Alıcı</label>
                <select
                  value={form.recipient}
                  onChange={(event) => updateField("recipient", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.recipient ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Seçiniz</option>
                  {recipientOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.recipient && <p className="mt-1 text-sm text-[#EF4444]">{errors.recipient}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Konu</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(event) => updateField("subject", event.target.value)}
                  placeholder="Örn. Randevu hatırlatması"
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.subject ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                />
                {errors.subject && <p className="mt-1 text-sm text-[#EF4444]">{errors.subject}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Öncelik</label>
                <select
                  value={form.priority}
                  onChange={(event) => updateField("priority", event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.priority ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">Seçiniz</option>
                  {priorityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.priority && <p className="mt-1 text-sm text-[#EF4444]">{errors.priority}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Mesaj</label>
                <textarea
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Mesajınızı yazın..."
                  rows={4}
                  className={`w-full resize-y rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.message ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                />
                {errors.message && <p className="mt-1 text-sm text-[#EF4444]">{errors.message}</p>}
              </div>

              <div className="flex items-center justify-end gap-3">
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
                  Mesajı Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
