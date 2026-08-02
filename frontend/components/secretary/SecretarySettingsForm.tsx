"use client";

import { useState } from "react";
import { secretarySettingsProfile } from "@/data/secretarySettings";

interface SecretarySettingsFormState {
  fullName: string;
  phone: string;
  email: string;
  clinic: string;
  department: string;
  note: string;
}

export default function SecretarySettingsForm() {
  const [form, setForm] = useState<SecretarySettingsFormState>({
    fullName: secretarySettingsProfile.fullName,
    phone: secretarySettingsProfile.phone,
    email: secretarySettingsProfile.email,
    clinic: secretarySettingsProfile.clinic,
    department: secretarySettingsProfile.department,
    note: secretarySettingsProfile.note,
  });

  const updateField = <K extends keyof SecretarySettingsFormState>(
    key: K,
    value: SecretarySettingsFormState[K]
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
      className="rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
    >
      <h2 className="text-base font-semibold text-[#0B1F55]">Profil Bilgileri</h2>

      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Ad Soyad</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Telefon</label>
          <input
            type="text"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">E-posta</label>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Klinik</label>
          <input
            type="text"
            value={form.clinic}
            onChange={(event) => updateField("clinic", event.target.value)}
            className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Departman</label>
          <input
            type="text"
            value={form.department}
            onChange={(event) => updateField("department", event.target.value)}
            className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Kısa Not</label>
          <textarea
            value={form.note}
            onChange={(event) => updateField("note", event.target.value)}
            rows={2}
            className="w-full resize-none rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="flex h-11 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.06)] transition-colors hover:bg-[#4c3fd1]"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}
