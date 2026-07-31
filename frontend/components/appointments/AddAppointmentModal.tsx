"use client";

import { useEffect, useState } from "react";

const patientOptions = [
  "Ayşe Demir",
  "Mehmet Kaya",
  "Zeynep Aydın",
  "Ali Yıldız",
  "Fatma Öz",
  "Elif Arslan",
];

const doctorOptions = [
  "Dr. Elif Kaya",
  "Dr. Ahmet Can",
  "Dr. Selin Arı",
  "Dr. Mert Koç",
  "Dr. Pınar Işık",
];

const departmentOptions = [
  "Diş Hekimliği",
  "Ortodonti",
  "Endodonti",
  "Periodontoloji",
  "Çocuk Diş Hekimliği",
];

const appointmentTypeOptions = ["Muayene", "Kontrol", "Tedavi", "Konsültasyon"];

const statusOptions = ["Onaylandı", "Bekliyor", "Tamamlandı", "İptal"];

interface AppointmentFormState {
  patient: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  appointmentType: string;
  status: string;
  notes: string;
}

const initialFormState: AppointmentFormState = {
  patient: "",
  doctor: "",
  department: "",
  date: "",
  time: "",
  appointmentType: "",
  status: "",
  notes: "",
};

export default function AddAppointmentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<AppointmentFormState>(initialFormState);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function updateField<K extends keyof AppointmentFormState>(
    key: K,
    value: AppointmentFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setForm(initialFormState);
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-11 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)] transition-colors hover:bg-[#4c3fd1]"
      >
        + Yeni Randevu Ekle
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-appointment-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[20px] border border-[#E3E8F0] bg-white p-8 shadow-[0_8px_16px_rgba(16,24,40,0.08),0_2px_4px_rgba(16,24,40,0.06)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 id="add-appointment-modal-title" className="text-xl font-bold text-[#0B1F55]">
                  Yeni Randevu Oluştur
                </h2>
                <p className="mt-1 text-sm text-[#667085]">Hasta için yeni randevu planlayın.</p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Kapat"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#667085] hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Hasta</label>
                <select
                  value={form.patient}
                  onChange={(event) => updateField("patient", event.target.value)}
                  className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                >
                  <option value="">Hasta seçin</option>
                  {patientOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Doktor</label>
                <select
                  value={form.doctor}
                  onChange={(event) => updateField("doctor", event.target.value)}
                  className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                >
                  <option value="">Doktor seçin</option>
                  {doctorOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Bölüm</label>
                <select
                  value={form.department}
                  onChange={(event) => updateField("department", event.target.value)}
                  className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                >
                  <option value="">Bölüm seçin</option>
                  {departmentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Tarih</label>
                <div className="relative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
                  >
                    <rect x="4" y="5" width="16" height="15" rx="2" />
                    <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
                  </svg>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) => updateField("date", event.target.value)}
                    autoComplete="off"
                    className="w-full rounded-xl border border-[#E3E8F0] py-2.5 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Saat</label>
                <div className="relative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
                  >
                    <circle cx="12" cy="12" r="8.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
                  </svg>
                  <input
                    type="time"
                    step={900}
                    value={form.time}
                    onChange={(event) => updateField("time", event.target.value)}
                    autoComplete="off"
                    className="w-full rounded-xl border border-[#E3E8F0] py-2.5 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Randevu Türü</label>
                <select
                  value={form.appointmentType}
                  onChange={(event) => updateField("appointmentType", event.target.value)}
                  className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                >
                  <option value="">Tür seçin</option>
                  {appointmentTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Durum</label>
                <select
                  value={form.status}
                  onChange={(event) => updateField("status", event.target.value)}
                  className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 sm:max-w-[calc(50%-0.75rem)]"
                >
                  <option value="">Durum seçin</option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Notlar</label>
                <textarea
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Not eklemek için yazın..."
                  rows={4}
                  className="w-full resize-y rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                />
              </div>

              <div className="flex items-center justify-end gap-3 sm:col-span-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-[#E3E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
                >
                  Randevu Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
