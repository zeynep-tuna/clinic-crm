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
      className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]"
    >
      <h2 className="text-base font-semibold text-[#0B1F55]">Güvenlik / Şifre</h2>

      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Mevcut Şifre</label>
          <input
            type="password"
            value={form.currentPassword}
            onChange={(event) => updateField("currentPassword", event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Yeni Şifre</label>
          <input
            type="password"
            value={form.newPassword}
            onChange={(event) => updateField("newPassword", event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="rounded-xl border border-[#E3E8F0] px-6 py-2.5 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
        >
          Şifreyi Güncelle
        </button>
      </div>
    </form>
  );
}
