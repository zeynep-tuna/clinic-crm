"use client";

import { useState } from "react";
import { secretaryWorkPreferences } from "@/data/secretarySettings";

const durationOptions = ["15 dakika", "30 dakika", "45 dakika", "60 dakika"];
const dailyViewOptions = ["Bugün", "Bu Hafta", "Bu Ay"];
const patientListViewOptions = ["Tablo", "Kart"];

export default function SecretaryWorkPreferences() {
  const [duration, setDuration] = useState(secretaryWorkPreferences.defaultAppointmentDuration);
  const [dailyView, setDailyView] = useState(secretaryWorkPreferences.dailyView);
  const [patientListView, setPatientListView] = useState(secretaryWorkPreferences.patientListView);
  const [autoReminder, setAutoReminder] = useState(secretaryWorkPreferences.autoReminder);

  const handleSave = () => {
    console.log({ duration, dailyView, patientListView, autoReminder });
  };

  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Çalışma Ayarları</h2>

      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
            Varsayılan Randevu Süresi
          </label>
          <select
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          >
            {durationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Günlük Görünüm</label>
          <select
            value={dailyView}
            onChange={(event) => setDailyView(event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          >
            {dailyViewOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
            Hasta Liste Görünümü
          </label>
          <select
            value={patientListView}
            onChange={(event) => setPatientListView(event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          >
            {patientListViewOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-[#0B1F55]">Otomatik Hatırlatma</span>

          <button
            type="button"
            role="switch"
            aria-checked={autoReminder}
            aria-label="Otomatik Hatırlatma"
            onClick={() => setAutoReminder((previous) => !previous)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              autoReminder ? "bg-[#5B4DE3]" : "bg-[#E3E8F0]"
            }`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                autoReminder ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
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
