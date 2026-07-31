"use client";

import { useState } from "react";
import { initialSettingsFormState, type SettingsFormState } from "@/data/settings";
import ClinicInfoSection from "@/components/settings/ClinicInfoSection";
import UserRoleSection from "@/components/settings/UserRoleSection";
import NotificationSettingsSection from "@/components/settings/NotificationSettingsSection";
import SecuritySettingsSection from "@/components/settings/SecuritySettingsSection";

const tabs = ["Klinik Bilgileri", "Kullanıcı ve Roller", "Bildirimler", "Güvenlik"] as const;

type TabValue = (typeof tabs)[number];

export default function SettingsForm() {
  const [activeTab, setActiveTab] = useState<TabValue>("Klinik Bilgileri");
  const [form, setForm] = useState<SettingsFormState>(initialSettingsFormState);

  function updateField<K extends keyof SettingsFormState>(key: K, value: SettingsFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(form);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex h-10 items-center rounded-xl border px-4 text-sm font-medium transition-colors ${
                isActive
                  ? "border-[#5B4DE3] bg-[#5B4DE3] text-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_6px_rgba(91,77,227,0.25)]"
                  : "border-[#E3E8F0] text-[#0B1F55] hover:border-[#DCD8FF] hover:bg-[#F7F8FF]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {activeTab === "Klinik Bilgileri" && <ClinicInfoSection form={form} updateField={updateField} />}
      {activeTab === "Kullanıcı ve Roller" && <UserRoleSection form={form} updateField={updateField} />}
      {activeTab === "Bildirimler" && (
        <NotificationSettingsSection form={form} updateField={updateField} />
      )}
      {activeTab === "Güvenlik" && <SecuritySettingsSection form={form} updateField={updateField} />}
    </form>
  );
}
