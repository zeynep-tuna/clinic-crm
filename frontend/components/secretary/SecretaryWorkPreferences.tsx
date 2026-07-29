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
    <div className="flex flex-col rounded-[20px] border border-[#E3E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Çalışma Ayarları</h2>
      <p className="mt-1 text-sm text-[#667085]">
        Randevu ve liste görünümü tercihlerinizi düzenleyin.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
            Varsayılan Randevu Süresi
          </label>
          <select
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          >
            {patientListViewOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Otomatik Hatırlatma</span>
          <div className="flex h-9.5 items-center justify-between rounded-xl border border-[#E3E8F0] px-4">
            <span className="text-sm text-[#667085]">{autoReminder ? "Açık" : "Kapalı"}</span>

            <button
              type="button"
              role="switch"
              aria-checked={autoReminder}
              aria-label="Otomatik Hatırlatma"
              onClick={() => setAutoReminder((previous) => !previous)}
              className={`relative h-5.5 w-10 shrink-0 rounded-full transition-colors ${
                autoReminder ? "bg-[#5B4DE3]" : "bg-[#E3E8F0]"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow-sm transition-transform ${
                  autoReminder ? "translate-x-4.5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
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
