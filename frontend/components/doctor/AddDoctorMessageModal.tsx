"use client";

import { useEffect, useState } from "react";
import { listMessageRecipients, type MessageRecipient } from "@/lib/users-api";
import { createMessage, type CreateMessageInput, type MessagePriority, type MessageUserRole } from "@/lib/messages-api";

const priorityOptions: { value: MessagePriority; label: string }[] = [
  { value: "URGENT", label: "Acil" },
  { value: "HIGH", label: "Yüksek" },
  { value: "NORMAL", label: "Normal" },
  { value: "LOW", label: "Düşük" },
];

const roleLabels: Record<MessageUserRole, string> = {
  ADMIN: "Yönetim",
  DOCTOR: "Doktor",
  SECRETARY: "Sekreter",
};

interface DoctorMessageFormState {
  receiverId: string;
  subject: string;
  priority: string;
  content: string;
}

const initialFormState: DoctorMessageFormState = {
  receiverId: "",
  subject: "",
  priority: "",
  content: "",
};

type DoctorMessageFormErrors = Partial<Record<keyof DoctorMessageFormState, string>>;

function validateDoctorMessageForm(values: DoctorMessageFormState): DoctorMessageFormErrors {
  const nextErrors: DoctorMessageFormErrors = {};

  if (!values.receiverId) {
    nextErrors.receiverId = "Alıcı seçimi zorunludur.";
  }

  if (!values.subject.trim()) {
    nextErrors.subject = "Konu alanı zorunludur.";
  }

  if (!values.content.trim()) {
    nextErrors.content = "Mesaj alanı boş bırakılamaz.";
  }

  return nextErrors;
}

interface AddDoctorMessageModalProps {
  onSent?: () => void | Promise<void>;
}

export default function AddDoctorMessageModal({ onSent }: AddDoctorMessageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<DoctorMessageFormState>(initialFormState);
  const [errors, setErrors] = useState<DoctorMessageFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [recipients, setRecipients] = useState<MessageRecipient[]>([]);
  const [isLoadingRecipients, setIsLoadingRecipients] = useState(false);
  const [recipientsError, setRecipientsError] = useState<string | null>(null);

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
    setIsLoadingRecipients(true);
    setRecipientsError(null);

    listMessageRecipients()
      .then((data) => {
        if (cancelled) return;
        setRecipients(data);
      })
      .catch(() => {
        if (cancelled) return;
        setRecipientsError("Alıcılar yüklenirken bir hata oluştu.");
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoadingRecipients(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  function updateField<K extends keyof DoctorMessageFormState>(
    key: K,
    value: DoctorMessageFormState[K]
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

    const validationErrors = validateDoctorMessageForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isSubmitting) return;

    const input: CreateMessageInput = {
      receiverId: form.receiverId,
      subject: form.subject.trim(),
      content: form.content.trim(),
      ...(form.priority ? { priority: form.priority as MessagePriority } : {}),
    };

    setIsSubmitting(true);

    try {
      await createMessage(input);
      setForm(initialFormState);
      setErrors({});
      setIsOpen(false);
      await onSent?.();
    } catch {
      setApiError("Mesaj gönderilirken bir hata oluştu.");
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
        + Yeni Mesaj
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-doctor-message-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[20px] border border-[#EAF0F8] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 id="add-doctor-message-modal-title" className="text-xl font-bold text-[#0B1F55]">
                  Yeni Mesaj Oluştur
                </h2>
                <p className="mt-1 text-sm text-[#667085]">
                  Sekreter veya klinik yönetimine yeni bir mesaj gönderin.
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
              {recipientsError && (
                <p className="rounded-xl bg-[#FEF2F2] px-4 py-2.5 text-sm text-[#EF4444]">{recipientsError}</p>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Alıcı</label>
                <select
                  value={form.receiverId}
                  onChange={(event) => updateField("receiverId", event.target.value)}
                  disabled={isLoadingRecipients}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.receiverId ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                >
                  <option value="">{isLoadingRecipients ? "Alıcılar yükleniyor..." : "Seçiniz"}</option>
                  {recipients.map((recipient) => (
                    <option key={recipient.id} value={recipient.id}>
                      {`${recipient.fullName} · ${roleLabels[recipient.role]}`}
                    </option>
                  ))}
                </select>
                {errors.receiverId && <p className="mt-1 text-sm text-[#EF4444]">{errors.receiverId}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Konu</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(event) => updateField("subject", event.target.value)}
                  placeholder="Örn. Hasta dosyası hakkında"
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
                  className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                >
                  <option value="">Öncelik seçin (varsayılan: Normal)</option>
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Mesaj</label>
                <textarea
                  value={form.content}
                  onChange={(event) => updateField("content", event.target.value)}
                  placeholder="Mesajınızı yazın..."
                  rows={4}
                  className={`w-full resize-y rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                    errors.content ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                  }`}
                />
                {errors.content && <p className="mt-1 text-sm text-[#EF4444]">{errors.content}</p>}
              </div>

              {apiError && <p className="rounded-xl bg-[#FEF2F2] px-4 py-2.5 text-sm text-[#EF4444]">{apiError}</p>}

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
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
