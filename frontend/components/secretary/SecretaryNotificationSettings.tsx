"use client";

import { useState } from "react";
import { secretaryNotificationPreferences } from "@/data/secretarySettings";

export default function SecretaryNotificationSettings() {
  const [preferences, setPreferences] = useState(secretaryNotificationPreferences);

  const toggle = (id: string) => {
    setPreferences((previous) =>
      previous.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  const handleSave = () => {
    console.log(preferences);
  };

  return (
    <div className="flex flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Bildirim Tercihleri</h2>
      <p className="mt-1 text-sm text-[#667085]">
        Sekreter panelinde almak istediğiniz bildirimleri yönetin.
      </p>

      <div className="mt-4 divide-y divide-[#EAF0F8]/60">
        {preferences.map((preference) => (
          <div key={preference.id} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
            <span className="text-sm text-[#0B1F55]">{preference.label}</span>

            <button
              type="button"
              role="switch"
              aria-checked={preference.enabled}
              aria-label={preference.label}
              onClick={() => toggle(preference.id)}
              className={`relative h-5.5 w-10 shrink-0 rounded-full transition-colors ${
                preference.enabled ? "bg-[#5B4DE3]" : "bg-[#EAF0F8]"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow-sm transition-transform ${
                  preference.enabled ? "translate-x-4.5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="flex h-11 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.06)] transition-colors hover:bg-[#4c3fd1]"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}
