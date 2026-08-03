"use client";

import { useState } from "react";
import { doctorProfileInfo } from "@/data/doctorProfile";

interface DoctorPasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialState: DoctorPasswordFormState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

type DoctorPasswordFormErrors = Partial<Record<keyof DoctorPasswordFormState, string>>;

function validateDoctorPasswordForm(values: DoctorPasswordFormState): DoctorPasswordFormErrors {
  const nextErrors: DoctorPasswordFormErrors = {};

  if (!values.currentPassword) {
    nextErrors.currentPassword = "Mevcut şifre zorunludur.";
  }

  if (!values.newPassword) {
    nextErrors.newPassword = "Yeni şifre zorunludur.";
  } else if (values.newPassword.length < 6) {
    nextErrors.newPassword = "Yeni şifre en az 6 karakter olmalıdır.";
  }

  if (!values.confirmPassword) {
    nextErrors.confirmPassword = "Yeni şifre tekrarı zorunludur.";
  } else if (values.newPassword && values.confirmPassword !== values.newPassword) {
    nextErrors.confirmPassword = "Yeni şifreler eşleşmelidir.";
  }

  return nextErrors;
}

export default function DoctorPasswordCard() {
  const [form, setForm] = useState<DoctorPasswordFormState>(initialState);
  const [errors, setErrors] = useState<DoctorPasswordFormErrors>({});

  const updateField = <K extends keyof DoctorPasswordFormState>(
    key: K,
    value: DoctorPasswordFormState[K]
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateDoctorPasswordForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log(form);
    setForm(initialState);
    setErrors({});
  };

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Güvenlik</h2>
      <p className="mt-1 text-sm text-[#667085]">
        Hesap şifrenizi güncelleyerek doktor paneli erişiminizi güvenli tutun.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              {errors.newPassword && (
                <p className="mt-1 text-sm text-[#EF4444]">{errors.newPassword}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
                Yeni Şifre Tekrar
              </label>
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

          <div className="mt-1 flex justify-end">
            <button
              type="submit"
              className="flex h-11 items-center rounded-xl border border-[#EAF0F8] px-6 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
            >
              Şifreyi Güncelle
            </button>
          </div>
        </form>

        <div className="flex h-fit flex-col gap-3 rounded-xl border border-[#EEF2F8] bg-[#F7F8FF] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-[#667085]">Son giriş</span>
            <span className="text-sm font-medium text-[#0B1F55]">{doctorProfileInfo.lastLogin}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-[#667085]">İki aşamalı doğrulama</span>
            <span className="inline-block shrink-0 rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-semibold text-[#667085]">
              {doctorProfileInfo.twoFactorStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
