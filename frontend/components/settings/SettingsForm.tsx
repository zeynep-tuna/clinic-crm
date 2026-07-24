"use client";

import { useState } from "react";
import { initialSettingsFormState, type SettingsFormState } from "@/data/settings";
import ClinicInfoSection from "@/components/settings/ClinicInfoSection";
import UserRoleSection from "@/components/settings/UserRoleSection";
import NotificationSettingsSection from "@/components/settings/NotificationSettingsSection";
import SecuritySettingsSection from "@/components/settings/SecuritySettingsSection";

export default function SettingsForm() {
  const [form, setForm] = useState<SettingsFormState>(initialSettingsFormState);

  function updateField<K extends keyof SettingsFormState>(key: K, value: SettingsFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <ClinicInfoSection form={form} updateField={updateField} />
        <UserRoleSection form={form} updateField={updateField} />
        <NotificationSettingsSection form={form} updateField={updateField} />
        <SecuritySettingsSection form={form} updateField={updateField} />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-[#5B4DE3] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)] hover:bg-[#4c3fd1]"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}
