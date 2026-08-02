"use client";

import { useState } from "react";
import SecretarySettingsProfileCard from "@/components/secretary/SecretarySettingsProfileCard";
import SecretarySettingsForm from "@/components/secretary/SecretarySettingsForm";
import SecretaryNotificationSettings from "@/components/secretary/SecretaryNotificationSettings";
import SecretaryWorkPreferences from "@/components/secretary/SecretaryWorkPreferences";
import SecretarySecuritySettings from "@/components/secretary/SecretarySecuritySettings";

const tabs = ["Profil", "Bildirimler", "Çalışma Ayarları", "Güvenlik"] as const;

type TabValue = (typeof tabs)[number];

export default function SecretarySettingsPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("Profil");

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[20px] border border-[#EAF0F8] bg-white px-6 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-1.5 text-xs text-[#98A2B3]">
          <span>ClinicCRM</span>
          <span className="text-[#D0D5DD]">&gt;</span>
          <span className="font-medium text-[#0B1F55]">Ayarlar</span>
        </div>

        <h1 className="mt-2 text-2xl font-bold text-[#0B1F55]">Ayarlar</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Sekreter profil bilgilerinizi, bildirim tercihlerinizi ve çalışma ayarlarınızı yönetin.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-[#5B4DE3] bg-[#5B4DE3] text-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_6px_rgba(91,77,227,0.25)]"
                  : "border-[#EAF0F8] text-[#0B1F55] hover:border-[#DCD8FF] hover:bg-[#F7F8FF]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {activeTab === "Profil" && (
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_2fr]">
          <SecretarySettingsProfileCard />
          <SecretarySettingsForm />
        </div>
      )}

      {activeTab === "Bildirimler" && <SecretaryNotificationSettings />}

      {activeTab === "Çalışma Ayarları" && <SecretaryWorkPreferences />}

      {activeTab === "Güvenlik" && (
        <div className="max-w-xl">
          <SecretarySecuritySettings />
        </div>
      )}
    </div>
  );
}
