"use client";

import { useState } from "react";
import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";

const clinicTypeOptions = [
  "Diş Kliniği",
  "Genel Poliklinik",
  "Estetik ve Güzellik",
  "Fizik Tedavi",
  "Veteriner Kliniği",
  "Diğer",
];

const preferredTimeOptions = [
  "Sabah (09:00 - 12:00)",
  "Öğleden Sonra (12:00 - 17:00)",
  "Akşam (17:00 - 19:00)",
];

interface DemoRequestFormState {
  fullName: string;
  clinicName: string;
  email: string;
  phone: string;
  clinicType: string;
  preferredTime: string;
  note: string;
}

const initialState: DemoRequestFormState = {
  fullName: "",
  clinicName: "",
  email: "",
  phone: "",
  clinicType: clinicTypeOptions[0],
  preferredTime: preferredTimeOptions[0],
  note: "",
};

const infoItems = [
  "30 dakikalık demo görüşmesi",
  "Canlı panel tanıtımı",
  "Klinik ihtiyaç analizi",
  "Paket önerisi",
  "Kurulum ve eğitim süreci hakkında bilgilendirme",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={2} className="mt-0.5 h-4 w-4 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-7 w-7">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
    </svg>
  );
}

export default function DemoRequestPage() {
  const [form, setForm] = useState<DemoRequestFormState>(initialState);
  const [consentChecked, setConsentChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof DemoRequestFormState>(key: K, value: DemoRequestFormState[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consentChecked) return;
    setSubmitted(true);
  };

  return (
    <main>
      <LandingNavbar />

      <div className="relative overflow-hidden bg-[#F7F8FF]">
        <div className="pointer-events-none absolute -left-40 top-32 z-0 h-105 w-105 rounded-full bg-[#DCD8FF] opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 z-0 h-120 w-120 rounded-full bg-[#DCD8FF] opacity-40 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold leading-tight text-[#0B1F55] sm:text-4xl">
              ClinicCRM demosu talep edin
            </h1>
            <p className="mt-3 text-base text-[#667085]">
              Kliniğiniz için en uygun yönetim paneli çözümünü birlikte planlayalım.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_12px_rgba(16,24,40,0.06)] sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center gap-3 rounded-xl bg-[#DCFCE7] p-6 text-center sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#16A34A]">
                    <CheckCircleIcon />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-[#16A34A]">Demo talebiniz alındı!</h2>
                    <p className="mt-1.5 max-w-sm text-sm text-[#16A34A]">
                      Demo talebiniz alındı. Ekibimiz 24 saat içinde sizinle iletişime geçecek.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Ad Soyad</label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(event) => updateField("fullName", event.target.value)}
                        placeholder="Ad Soyad"
                        className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Klinik Adı</label>
                      <input
                        type="text"
                        required
                        value={form.clinicName}
                        onChange={(event) => updateField("clinicName", event.target.value)}
                        placeholder="Klinik Adı"
                        className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">E-posta</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        placeholder="ornek@klinik.com"
                        className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Telefon</label>
                      <input
                        type="text"
                        required
                        value={form.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        placeholder="+90 5xx xxx xx xx"
                        className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Klinik Türü</label>
                      <select
                        value={form.clinicType}
                        onChange={(event) => updateField("clinicType", event.target.value)}
                        className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                      >
                        {clinicTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
                        Tercih Edilen Görüşme Zamanı
                      </label>
                      <select
                        value={form.preferredTime}
                        onChange={(event) => updateField("preferredTime", event.target.value)}
                        className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                      >
                        {preferredTimeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Mesaj / Not</label>
                    <textarea
                      value={form.note}
                      onChange={(event) => updateField("note", event.target.value)}
                      rows={3}
                      placeholder="Kliniğiniz hakkında kısaca bilgi verin..."
                      className="w-full resize-none rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 text-xs text-[#667085]">
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(event) => setConsentChecked(event.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#E3E8F0] accent-[#5B4DE3] focus:ring-2 focus:ring-[#5B4DE3]/20"
                    />
                    <span>
                      <Link href="#" className="font-medium text-[#5B4DE3] hover:underline">
                        KVKK Aydınlatma Metni
                      </Link>
                      &rsquo;ni okudum ve demo talebim için iletişime geçilmesini kabul ediyorum.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!consentChecked}
                    className={`flex h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)] transition-colors sm:w-auto ${
                      consentChecked
                        ? "bg-[#5B4DE3] hover:bg-[#4c3fd1]"
                        : "cursor-not-allowed bg-[#5B4DE3]/40"
                    }`}
                  >
                    Demo Talebi Gönder
                  </button>
                </form>
              )}
            </div>

            <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_12px_rgba(16,24,40,0.06)]">
              <h2 className="text-lg font-bold text-[#0B1F55]">Demo görüşmesinde neler olacak?</h2>

              <ul className="mt-5 space-y-3.5">
                {infoItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#0B1F55]">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
