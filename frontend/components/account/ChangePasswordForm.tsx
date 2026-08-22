"use client";

import { useState } from "react";
import { ApiError } from "@/lib/api";
import { changePassword } from "@/lib/auth";

const MIN_PASSWORD_LENGTH = 6;

interface ChangePasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialState: ChangePasswordFormState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

type FormErrors = Partial<Record<keyof ChangePasswordFormState, string>>;

function validate(values: ChangePasswordFormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.currentPassword) {
    errors.currentPassword = "Mevcut şifre zorunludur.";
  }

  if (!values.newPassword) {
    errors.newPassword = "Yeni şifre zorunludur.";
  } else if (values.newPassword.length < MIN_PASSWORD_LENGTH) {
    errors.newPassword = `Yeni şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalıdır.`;
  } else if (values.currentPassword && values.newPassword === values.currentPassword) {
    errors.newPassword = "Yeni şifre mevcut şifreyle aynı olamaz.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Yeni şifre tekrarı zorunludur.";
  } else if (values.newPassword && values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "Yeni şifreler eşleşmelidir.";
  }

  return errors;
}

export default function ChangePasswordForm() {
  const [form, setForm] = useState<ChangePasswordFormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const updateField = <K extends keyof ChangePasswordFormState>(
    key: K,
    value: ChangePasswordFormState[K]
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setSuccessMessage(null);
    setApiError(null);
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setSuccessMessage("Şifreniz başarıyla değiştirildi.");
      setForm(initialState);
      setErrors({});
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        if (error.message.includes("incorrect")) {
          setApiError("Mevcut şifre hatalı.");
        } else if (error.message.includes("different")) {
          setApiError("Yeni şifre mevcut şifreyle aynı olamaz.");
        } else {
          setApiError("Şifre değiştirilemedi. Bilgilerinizi kontrol edin.");
        }
      } else {
        setApiError("Şifre değiştirilirken bir hata oluştu.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Şifre Değiştir</h2>
      <p className="mt-1 text-sm text-[#667085]">Hesap şifrenizi güncelleyerek erişiminizi güvenli tutun.</p>

      <div className="mt-4 flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Mevcut Şifre</label>
          <input
            type="password"
            value={form.currentPassword}
            onChange={(event) => updateField("currentPassword", event.target.value)}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
              errors.currentPassword ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
            }`}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-[#EF4444]">{errors.currentPassword}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Yeni Şifre</label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(event) => updateField("newPassword", event.target.value)}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                errors.newPassword ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
              }`}
            />
            {errors.newPassword && <p className="mt-1 text-sm text-[#EF4444]">{errors.newPassword}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Yeni Şifre Tekrar</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(event) => updateField("confirmPassword", event.target.value)}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                errors.confirmPassword ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-[#EF4444]">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {successMessage && <p className="text-sm font-medium text-[#16A34A]">{successMessage}</p>}
        {apiError && <p className="text-sm font-medium text-[#EF4444]">{apiError}</p>}

        <div className="flex justify-end">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="flex h-11 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.06)] transition-colors hover:bg-[#4c3fd1] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Güncelleniyor..." : "Şifreyi Güncelle"}
          </button>
        </div>
      </div>
    </div>
  );
}
