"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

type BlogCategory =
  | "Klinik Yönetimi"
  | "Hasta Deneyimi"
  | "Dijitalleşme"
  | "KVKK"
  | "Ödeme Takibi"
  | "Ürün Güncellemeleri";

type FilterValue = "Tümü" | Exclude<BlogCategory, "Ödeme Takibi">;

interface BlogPost {
  id: string;
  category: BlogCategory;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

const filters: FilterValue[] = [
  "Tümü",
  "Klinik Yönetimi",
  "Hasta Deneyimi",
  "Dijitalleşme",
  "KVKK",
  "Ürün Güncellemeleri",
];

const categoryBadgeClass: Record<BlogCategory, string> = {
  "Klinik Yönetimi": "bg-[#EEF0FF] text-[#5B4DE3]",
  "Hasta Deneyimi": "bg-[#DBEAFE] text-[#2563EB]",
  Dijitalleşme: "bg-[#EEF0FF] text-[#5B4DE3]",
  KVKK: "bg-[#F1F4FA] text-[#667085]",
  "Ödeme Takibi": "bg-[#FEF3C7] text-[#F59E0B]",
  "Ürün Güncellemeleri": "bg-[#DCFCE7] text-[#16A34A]",
};

function ClinicManagementIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5.5 w-5.5">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 14.5l2 2 4-4" />
    </svg>
  );
}

function PatientExperienceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5.5 w-5.5">
      <circle cx="12" cy="8" r="3" />
      <path strokeLinecap="round" d="M5.5 19.5c.7-3.4 3.2-5.5 6.5-5.5s5.8 2.1 6.5 5.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 8.2h1.2l.8-1.4 1.4 2.8.8-1.4h1" />
    </svg>
  );
}

function DigitalizationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5.5 w-5.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 18.5a4 4 0 0 1-.5-7.97A5 5 0 0 1 16.2 8.3 4.2 4.2 0 0 1 16 16.7"
      />
      <path strokeLinecap="round" d="M9.5 18.5h5.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1.5M15.5 5.3l-1 1.3M8.5 5.3l1 1.3" />
    </svg>
  );
}

function KvkkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5.5 w-5.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5 19 6v5.5c0 4.2-3 7.3-7 9-4-1.7-7-4.8-7-9V6l7-2.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5.5 w-5.5">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path strokeLinecap="round" d="M3 10.5h18" />
      <path strokeLinecap="round" d="M6.5 14.5h4" />
    </svg>
  );
}

function ProductUpdateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5.5 w-5.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3.5l1.8 3.7 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L12 3.5Z"
      />
    </svg>
  );
}

const categoryIconMap: Record<BlogCategory, () => React.ReactElement> = {
  "Klinik Yönetimi": ClinicManagementIcon,
  "Hasta Deneyimi": PatientExperienceIcon,
  Dijitalleşme: DigitalizationIcon,
  KVKK: KvkkIcon,
  "Ödeme Takibi": PaymentIcon,
  "Ürün Güncellemeleri": ProductUpdateIcon,
};

function CalendarReminderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={1.6} className="h-10 w-10">
      <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
      <path strokeLinecap="round" d="M4 10.5h16M8 3.5v4M16 3.5v4" />
      <circle cx="16" cy="15.5" r="3.6" fill="white" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 13.7v1.8l1.2 1" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={1.9} className="h-3.5 w-3.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"
      />
    </svg>
  );
}

function UserCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={1.9} className="h-3.5 w-3.5">
      <circle cx="9" cy="8" r="3" />
      <path strokeLinecap="round" d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.5l1.5 1.5 3-3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={1.9} className="h-3.5 w-3.5">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}

const featuredPost: BlogPost = {
  id: "featured",
  category: "Klinik Yönetimi",
  title: "Diş kliniğinizde randevu iptallerini azaltmanın 5 yolu",
  description:
    "Randevu hatırlatmaları, sekreter iş akışları ve hasta iletişimiyle iptal oranlarını nasıl azaltabileceğinizi keşfedin.",
  date: "12 Mayıs 2026",
  readTime: "5 dk okuma",
};

const blogPosts: BlogPost[] = [
  {
    id: "1",
    category: "Dijitalleşme",
    title: "Dijital onam formlarına geçiş: Nelere dikkat etmeli?",
    description:
      "Diş kliniklerinde onam formlarını dijitalleştirirken dikkat edilmesi gereken süreçleri ve hasta iletişimini inceleyin.",
    date: "8 Mayıs 2026",
    readTime: "4 dk okuma",
  },
  {
    id: "2",
    category: "Hasta Deneyimi",
    title: "Hasta memnuniyetini artıran sekreter iş akışları",
    description:
      "Hasta karşılama, randevu planlama ve takip süreçlerinde sekreter panelinin nasıl değer kattığını görün.",
    date: "3 Mayıs 2026",
    readTime: "6 dk okuma",
  },
  {
    id: "3",
    category: "KVKK",
    title: "KVKK ve diş klinikleri: Hasta verisi nasıl korunur?",
    description:
      "Hasta bilgilerinin dijital ortamda saklanması, erişim yetkileri ve veri güvenliği için temel noktalar.",
    date: "28 Nisan 2026",
    readTime: "5 dk okuma",
  },
  {
    id: "4",
    category: "Klinik Yönetimi",
    title: "Diş hekimi ve sekreter paneli neden ayrı olmalı?",
    description:
      "Rol bazlı panel yapısının klinik operasyonlarında verimlilik ve güvenlik açısından neden önemli olduğunu anlatıyoruz.",
    date: "21 Nisan 2026",
    readTime: "4 dk okuma",
  },
  {
    id: "5",
    category: "Ödeme Takibi",
    title: "Diş kliniklerinde ödeme takibini kolaylaştırmanın yolları",
    description:
      "Bekleyen, tahsil edilen ve kısmi ödemeleri daha görünür hale getirerek finansal takip süreçlerini sadeleştirin.",
    date: "15 Nisan 2026",
    readTime: "5 dk okuma",
  },
  {
    id: "6",
    category: "Ürün Güncellemeleri",
    title: "ClinicCRM'de dijital klinik yönetimi için yeni modüller",
    description:
      "Hasta yönetimi, randevu planlama, ödeme takibi ve dijital onam süreçlerini tek panelde birleştiren yapıya genel bakış.",
    date: "9 Nisan 2026",
    readTime: "3 dk okuma",
  },
];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tümü");
  const [email, setEmail] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = useMemo(() => {
    if (activeFilter === "Tümü") return blogPosts;
    return blogPosts.filter((post) => post.category === activeFilter);
  }, [activeFilter]);

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !consentChecked) return;
    setSubscribed(true);
  };

  return (
    <main>
      <LandingNavbar activeHref="/blog" />

      <div className="relative overflow-hidden bg-[#F7F8FF]">
        <div className="pointer-events-none absolute -left-40 top-20 z-0 h-105 w-105 rounded-full bg-[#DCD8FF] opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 z-0 h-120 w-120 rounded-full bg-[#DCD8FF] opacity-40 blur-3xl" />

        <section className="relative z-10 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-[#EEF0FF] px-4 py-1.5 text-sm font-semibold text-[#5B4DE3]">
              Blog
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#0B1F55] sm:text-5xl">
              Diş kliniğiniz için bilgi ve öneriler
            </h1>

            <p className="mt-5 text-base text-[#667085] sm:text-lg">
              Randevu yönetimi, hasta deneyimi, dijital onam formları ve klinik operasyonları hakkında
              pratik içerikler.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-xl border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-[#5B4DE3] bg-[#5B4DE3] text-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_6px_rgba(91,77,227,0.25)]"
                      : "border-[#E3E8F0] bg-white text-[#0B1F55] hover:border-[#DCD8FF] hover:bg-[#F7F8FF]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </section>

        <section className="relative z-10 px-6 pb-10 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col overflow-hidden rounded-[24px] border border-[#E3E8F0] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_16px_rgba(16,24,40,0.06)] lg:flex-row">
              <div className="flex flex-1 flex-col justify-center p-8 sm:p-10">
                <span
                  className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${categoryBadgeClass[featuredPost.category]}`}
                >
                  {featuredPost.category}
                </span>

                <h2 className="mt-4 text-2xl font-bold leading-snug text-[#0B1F55] sm:text-3xl">
                  {featuredPost.title}
                </h2>

                <p className="mt-3 text-base text-[#667085]">{featuredPost.description}</p>

                <p className="mt-4 text-xs text-[#98A2B3]">
                  {featuredPost.date} · {featuredPost.readTime}
                </p>

                <Link
                  href="#"
                  className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-semibold text-[#5B4DE3] hover:underline"
                >
                  Devamını oku →
                </Link>
              </div>

              <div className="relative flex w-full items-center justify-center overflow-hidden bg-linear-to-br from-[#EEF0FF] via-[#F5F3FF] to-[#DBEAFE] p-10 lg:w-96 lg:shrink-0">
                <div
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{
                    backgroundImage: "radial-gradient(#C7D2FE 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />

                <span className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-[0_4px_16px_rgba(91,77,227,0.18)]">
                  <CalendarReminderIcon />
                </span>

                <span className="absolute left-6 top-7 z-10 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#0B1F55] shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_8px_rgba(16,24,40,0.1)]">
                  <BellIcon />
                  Randevu hatırlatma
                </span>

                <span className="absolute bottom-8 right-6 z-10 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#0B1F55] shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_8px_rgba(16,24,40,0.1)]">
                  <UserCheckIcon />
                  Hasta takibi
                </span>

                <span className="absolute bottom-6 left-8 z-10 hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#0B1F55] shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_8px_rgba(16,24,40,0.1)] sm:flex">
                  <ClockIcon />
                  5 dk okuma
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-6 pb-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => {
                const CategoryIcon = categoryIconMap[post.category];

                return (
                  <div
                    key={post.id}
                    className="flex flex-col rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(16,24,40,0.08)]"
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${categoryBadgeClass[post.category]}`}
                    >
                      <CategoryIcon />
                    </span>

                    <span
                      className={`mt-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${categoryBadgeClass[post.category]}`}
                    >
                      {post.category}
                    </span>

                    <h3 className="mt-3 text-base font-bold text-[#0B1F55]">{post.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-[#667085]">{post.description}</p>

                    <p className="mt-4 text-xs text-[#98A2B3]">
                      {post.date} · {post.readTime}
                    </p>

                    <Link
                      href="#"
                      className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-semibold text-[#5B4DE3] hover:underline"
                    >
                      Devamını oku →
                    </Link>
                  </div>
                );
              })}

              {filteredPosts.length === 0 && (
                <p className="col-span-full py-10 text-center text-sm text-[#667085]">
                  Bu kategoride henüz yazı bulunmuyor.
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col items-center gap-1 border-t border-[#E3E8F0] pt-6 text-center">
              <p className="text-sm font-medium text-[#0B1F55]">Toplam {blogPosts.length} yazı</p>
              <p className="text-xs text-[#98A2B3]">Yeni içerikler yakında eklenecek.</p>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-6 pb-16 lg:px-10">
          <div className="mx-auto max-w-5xl rounded-[24px] border border-[#E3E8F0] bg-white p-8 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_16px_rgba(16,24,40,0.06)] sm:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-[#0B1F55] sm:text-3xl">
                Diş kliniği yönetimiyle ilgili içerikleri kaçırmayın
              </h2>
              <p className="mt-3 text-base text-[#667085]">
                Yeni blog yazıları, ürün güncellemeleri ve klinik dijitalleşme önerileri e-postanıza
                gelsin.
              </p>

              {subscribed ? (
                <p className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#DCFCE7] px-5 py-3 text-sm font-semibold text-[#16A34A]">
                  Bülten kaydınız alındı.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-6 flex flex-col items-center gap-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="ornek@klinik.com"
                    className="w-full max-w-sm rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
                  />

                  <label className="flex max-w-sm items-start gap-2.5 text-left text-xs text-[#667085]">
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(event) => setConsentChecked(event.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#E3E8F0] accent-[#5B4DE3] focus:ring-2 focus:ring-[#5B4DE3]/20"
                    />
                    <span>
                      <Link href="#" className="font-medium text-[#5B4DE3] hover:underline">
                        Gizlilik Politikası
                      </Link>
                      &apos;nı okudum ve blog bülteni için e-posta almayı kabul ediyorum.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!consentChecked}
                    className={`flex h-11 w-full max-w-sm items-center justify-center rounded-xl px-6 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)] transition-colors ${
                      consentChecked ? "bg-[#5B4DE3] hover:bg-[#4c3fd1]" : "cursor-not-allowed bg-[#5B4DE3]/40"
                    }`}
                  >
                    Abone Ol
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>

      <LandingFooter />
    </main>
  );
}
