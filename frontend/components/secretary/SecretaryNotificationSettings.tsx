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
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Bildirim Tercihleri</h2>

      <div className="mt-4 space-y-3">
        {preferences.map((preference) => (
          <div key={preference.id} className="flex items-center justify-between gap-3">
            <span className="text-sm text-[#0B1F55]">{preference.label}</span>

            <button
              type="button"
              role="switch"
              aria-checked={preference.enabled}
              aria-label={preference.label}
              onClick={() => toggle(preference.id)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                preference.enabled ? "bg-[#5B4DE3]" : "bg-[#E3E8F0]"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  preference.enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-[#5B4DE3] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}
