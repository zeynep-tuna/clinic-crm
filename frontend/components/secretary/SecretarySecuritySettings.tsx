"use client";

import { useState } from "react";

interface SecretaryPasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialState: SecretaryPasswordFormState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function SecretarySecuritySettings() {
  const [form, setForm] = useState<SecretaryPasswordFormState>(initialState);

  const updateField = <K extends keyof SecretaryPasswordFormState>(
    key: K,
    value: SecretaryPasswordFormState[K]
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col rounded-[20px] border border-[#E3E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#5B4DE3]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
            <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
            <path strokeLinecap="round" d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
          </svg>
        </span>
        <h2 className="text-base font-semibold text-[#0B1F55]">Güvenlik / Şifre</h2>
      </div>
      <p className="mt-1 text-sm text-[#667085]">
        Hesap güvenliğiniz için şifrenizi düzenli olarak güncelleyin.
      </p>

      <div className="mt-4 space-y-3.5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Mevcut Şifre</label>
          <input
            type="password"
            value={form.currentPassword}
            onChange={(event) => updateField("currentPassword", event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Yeni Şifre</label>
          <input
            type="password"
            value={form.newPassword}
            onChange={(event) => updateField("newPassword", event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
            Yeni Şifre Tekrar
          </label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(event) => updateField("confirmPassword", event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="flex h-11 items-center justify-center rounded-xl border border-[#E3E8F0] px-5 text-sm font-semibold text-[#0B1F55] transition-colors hover:border-[#DCD8FF] hover:bg-[#F7F8FF]"
        >
          Şifreyi Güncelle
        </button>
      </div>
    </form>
  );
}
