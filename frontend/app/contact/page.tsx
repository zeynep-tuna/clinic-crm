"use client";

import { useState } from "react";
import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

const subjectOptions = ["Genel Soru", "Demo Talebi", "Fiyatlandırma", "Teknik Destek", "İş Birliği"];

interface ContactFormState {
  fullName: string;
  clinicName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialState: ContactFormState = {
  fullName: "",
  clinicName: "",
  email: "",
  phone: "",
  subject: subjectOptions[0],
  message: "",
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5.5h16a1 1 0 0 1 1 1V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.5 4h2.4l1.3 4-2 1.5a11 11 0 0 0 5.3 5.3l1.5-2 4 1.3v2.4a1.6 1.6 0 0 1-1.7 1.6A15.5 15.5 0 0 1 4.9 5.7 1.6 1.6 0 0 1 6.5 4Z"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z"
      />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}

function ResponseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
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

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
      <path d="M6.94 8.5H4.1V19h2.84V8.5ZM5.52 4a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3ZM19.9 19h-2.84v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V19H10.2V8.5h2.72v1.43h.04c.38-.72 1.31-1.48 2.7-1.48 2.89 0 3.42 1.9 3.42 4.38V19Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={1.6} className="h-9 w-9">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z"
      />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

const contactInfo = [
  {
    Icon: MailIcon,
    label: "E-posta",
    value: "info@cliniccrm.com",
    href: "mailto:info@cliniccrm.com",
  },
  {
    Icon: PhoneIcon,
    label: "Telefon",
    value: "+90 555 000 00 00",
    href: "tel:+905550000000",
  },
  {
    Icon: LocationIcon,
    label: "Konum",
    value: "İstanbul, Türkiye",
  },
  {
    Icon: ClockIcon,
    label: "Çalışma Saatleri",
    value: "Hafta içi 09:00 - 18:00",
  },
  {
    Icon: ResponseIcon,
    label: "Yanıt Süresi",
    value: "Taleplere genellikle 24 saat içinde dönüş yapılır.",
  },
];

const socialLinks = [
  { label: "LinkedIn", Icon: LinkedInIcon },
  { label: "Instagram", Icon: InstagramIcon },
];

const faqItems = [
  {
    question: "Demo görüşmesi ücretsiz mi?",
    answer:
      "Evet. Demo görüşmesinde ClinicCRM'in diş kliniğinizin süreçlerine nasıl uyarlanabileceğini ücretsiz olarak değerlendiriyoruz.",
  },
  {
    question: "Kurulum süreci ne kadar sürer?",
    answer:
      "Klinik büyüklüğüne ve aktarılacak veri kapsamına göre değişmekle birlikte temel kurulum süreci kısa sürede planlanabilir.",
  },
  {
    question: "ClinicCRM sadece diş klinikleri için mi?",
    answer:
      "Evet. Ürün metinleri, modüller ve örnek süreçler diş kliniklerinin hasta, randevu, ödeme ve onam akışlarına göre hazırlanmıştır.",
  },
  {
    question: "Demo talebinden sonra ne olur?",
    answer:
      "Ekibimiz sizinle iletişime geçer, ihtiyaçlarınızı dinler ve uygun paket/hizmet süreci hakkında bilgi verir.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [consentChecked, setConsentChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consentChecked) return;
    setSubmitted(true);
  };

  return (
    <main>
      <LandingNavbar activeHref="/contact" />

      <div className="relative overflow-hidden bg-[#F7F8FF]">
        <div className="pointer-events-none absolute -left-40 top-20 z-0 h-105 w-105 rounded-full bg-[#DCD8FF] opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 z-0 h-120 w-120 rounded-full bg-[#DCD8FF] opacity-40 blur-3xl" />

        <section className="relative z-10 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-[#EEF0FF] px-4 py-1.5 text-sm font-semibold text-[#5B4DE3]">
              İletişim
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#0B1F55] sm:text-5xl">
              Diş kliniğinizle ilgili sorularınızı bekliyoruz
            </h1>

            <p className="mt-5 text-base text-[#667085] sm:text-lg">
              Ürün, fiyatlandırma veya demo hakkında sorularınız için formu doldurun, size en kısa sürede
              dönüş yapalım.
            </p>
          </div>
        </section>

        <section className="relative z-10 px-6 pb-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
              <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_12px_rgba(16,24,40,0.06)] sm:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center gap-3 rounded-xl bg-[#DCFCE7] p-6 text-center sm:p-8">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#16A34A]">
                      <CheckCircleIcon />
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-[#16A34A]">Mesajınız alındı</h2>
                      <p className="mt-1.5 max-w-sm text-sm text-[#16A34A]">
                        Mesajınız alındı. Ekibimiz en kısa sürede sizinle iletişime geçecek.
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
                          className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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
                          className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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
                          className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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
                          className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Konu</label>
                      <select
                        value={form.subject}
                        onChange={(event) => updateField("subject", event.target.value)}
                        className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                      >
                        {subjectOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Mesaj</label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(event) => updateField("message", event.target.value)}
                        rows={4}
                        placeholder="Mesajınızı yazın..."
                        className="w-full resize-none rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                      />
                    </div>

                    <label className="flex items-start gap-2.5 text-xs text-[#667085]">
                      <input
                        type="checkbox"
                        checked={consentChecked}
                        onChange={(event) => setConsentChecked(event.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#EAF0F8] accent-[#5B4DE3] focus:ring-2 focus:ring-[#5B4DE3]/20"
                      />
                      <span>
                        <Link href="#" className="font-medium text-[#5B4DE3] hover:underline">
                          KVKK Aydınlatma Metni
                        </Link>
                        &rsquo;ni okudum ve iletişim talebim için benimle iletişime geçilmesini kabul
                        ediyorum.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={!consentChecked}
                      className={`flex h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-semibold transition-colors sm:w-auto ${
                        consentChecked
                          ? "bg-[#5B4DE3] text-white hover:bg-[#4c3fd1]"
                          : "cursor-not-allowed bg-[#DCD8FF] text-[#667085]"
                      }`}
                    >
                      Gönder
                    </button>
                  </form>
                )}
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_12px_rgba(16,24,40,0.06)]">
                  <h2 className="text-lg font-bold text-[#0B1F55]">ClinicCRM ekibine ulaşın</h2>
                  <p className="mt-2 text-sm text-[#667085]">
                    Diş kliniğiniz için doğru çözümü planlamak veya sorularınızı iletmek için aşağıdaki
                    kanallardan bize ulaşabilirsiniz.
                  </p>

                  <div className="mt-5 space-y-4">
                    {contactInfo.map((item) => {
                      const content = (
                        <>
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#5B4DE3]">
                            <item.Icon />
                          </span>
                          <div>
                            <p className="text-xs text-[#98A2B3]">{item.label}</p>
                            <p className="text-sm font-medium text-[#0B1F55]">{item.value}</p>
                          </div>
                        </>
                      );

                      return item.href ? (
                        <a key={item.label} href={item.href} className="flex items-start gap-3">
                          {content}
                        </a>
                      ) : (
                        <div key={item.label} className="flex items-start gap-3">
                          {content}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 border-t border-[#EAF0F8] pt-5">
                    <p className="text-sm font-semibold text-[#0B1F55]">Bizi takip edin</p>
                    <div className="mt-3 flex items-center gap-3">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href="#"
                          aria-label={social.label}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF0FF] text-[#5B4DE3] transition-colors hover:bg-[#5B4DE3] hover:text-white"
                        >
                          <social.Icon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold text-[#0B1F55]">Konum Bilgisi</p>

                  <div className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-[20px] border border-[#EAF0F8] bg-linear-to-br from-[#EEF0FF] via-[#F5F3FF] to-[#DBEAFE] p-6">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-60"
                      style={{
                        backgroundImage:
                          "linear-gradient(#C7D2FE 1px, transparent 1px), linear-gradient(90deg, #C7D2FE 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-40"
                      style={{
                        backgroundImage: "radial-gradient(#A5B4FC 1.5px, transparent 1.5px)",
                        backgroundSize: "28px 28px",
                        backgroundPosition: "14px 14px",
                      }}
                    />

                    <div className="absolute right-4 top-4 z-10 flex flex-col overflow-hidden rounded-lg border border-[#EAF0F8] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_8px_rgba(16,24,40,0.08)]">
                      <span className="flex h-8 w-8 items-center justify-center border-b border-[#EAF0F8] text-sm font-semibold text-[#0B1F55]">
                        +
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center text-sm font-semibold text-[#0B1F55]">
                        −
                      </span>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(91,77,227,0.18)]">
                        <MapPinIcon />
                      </span>

                      <div className="mt-3 rounded-xl border border-[#EAF0F8] bg-white px-4 py-3 text-center shadow-[0_1px_2px_rgba(16,24,40,0.06),0_4px_12px_rgba(16,24,40,0.1)]">
                        <p className="text-sm font-bold text-[#0B1F55]">ClinicCRM iletişim merkezi</p>
                        <p className="mt-0.5 text-xs text-[#667085]">İstanbul, Türkiye</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-6 pb-16 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#0B1F55]">Sıkça sorulan sorular</h2>
              <p className="mt-3 text-base text-[#667085]">
                Demo ve kurulum süreciyle ilgili en çok merak edilen konular.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                >
                  <h3 className="text-base font-bold text-[#0B1F55]">{item.question}</h3>
                  <p className="mt-2 text-sm text-[#667085]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <LandingFooter />
    </main>
  );
}
