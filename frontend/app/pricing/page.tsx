import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  includesPrevious?: string;
  features: string[];
  priceValue: string;
  priceSuffix?: string;
  highlighted?: boolean;
  badge?: string;
}

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Başlangıç",
    description: "Küçük diş klinikleri için temel dijital yönetim paketi.",
    features: [
      "Hasta kayıt yönetimi",
      "Randevu takibi",
      "Temel ödeme takibi",
      "Sekreter paneli",
      "Dijital hasta listesi",
    ],
    priceValue: "₺2.990",
    priceSuffix: "/ ay'dan başlayan",
  },
  {
    id: "professional",
    name: "Profesyonel",
    description: "Büyüyen diş klinikleri için randevu, hasta, ödeme ve onam süreçlerini kapsayan paket.",
    includesPrevious: "Başlangıç paketindeki her şey",
    features: [
      "Diş hekimi paneli",
      "Dijital onam formları",
      "Gelişmiş ödeme takibi",
      "Rol bazlı yönetim",
      "Raporlama",
      "Hatırlatma ve görev takibi",
    ],
    priceValue: "₺5.990",
    priceSuffix: "/ ay'dan başlayan",
    highlighted: true,
    badge: "En Çok Tercih Edilen",
  },
  {
    id: "enterprise",
    name: "Kurumsal",
    description: "Çok hekimli veya çok şubeli diş klinikleri için gelişmiş çözüm.",
    includesPrevious: "Profesyonel paketindeki her şey",
    features: [
      "Çoklu klinik desteği",
      "Veri taşıma desteği",
      "Öncelikli destek",
      "Özel entegrasyon planı",
      "Kurumsal eğitim",
      "Gelişmiş raporlama",
    ],
    priceValue: "Özel Teklif",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={2} className="mt-0.5 h-4 w-4 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <main>
      <LandingNavbar activeHref="/pricing" />

      <div className="relative overflow-hidden bg-[#F7F8FF]">
        <div className="pointer-events-none absolute -left-40 top-32 z-0 h-105 w-105 rounded-full bg-[#DCD8FF] opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 z-0 h-120 w-120 rounded-full bg-[#DCD8FF] opacity-40 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold leading-tight text-[#0B1F55] sm:text-4xl">
              Diş kliniğiniz için uygun paketi seçin
            </h1>
            <p className="mt-3 text-base text-[#667085]">
              Hasta yönetimi, randevu takibi, ödeme süreçleri ve dijital onam formlarını tek panelde yönetin.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`flex flex-col rounded-[20px] border bg-white p-6 sm:p-7 ${
                  plan.highlighted
                    ? "border-[#5B4DE3] shadow-[0_4px_16px_rgba(91,77,227,0.18),0_1px_2px_rgba(16,24,40,0.04)] lg:-translate-y-2"
                    : "border-[#EAF0F8] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_12px_rgba(16,24,40,0.06)]"
                }`}
              >
                {plan.badge && (
                  <span className="mb-3 inline-flex w-fit items-center rounded-full bg-[#5B4DE3] px-3 py-1 text-xs font-semibold text-white">
                    {plan.badge}
                  </span>
                )}

                <h2 className="text-xl font-bold text-[#0B1F55]">{plan.name}</h2>
                <p className="mt-1.5 text-sm text-[#667085]">{plan.description}</p>

                <ul className="mt-5 space-y-2.5">
                  {plan.includesPrevious && (
                    <li className="flex items-start gap-2.5 border-b border-dashed border-[#EAF0F8] pb-2.5 text-sm font-semibold text-[#0B1F55]">
                      <CheckIcon />
                      <span>{plan.includesPrevious}</span>
                    </li>
                  )}
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#0B1F55]">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-[#EAF0F8] pt-5">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`text-2xl font-extrabold ${
                        plan.highlighted ? "text-[#5B4DE3]" : "text-[#0B1F55]"
                      }`}
                    >
                      {plan.priceValue}
                    </span>
                    {plan.priceSuffix && (
                      <span className="text-sm text-[#667085]">{plan.priceSuffix}</span>
                    )}
                  </div>

                  <Link
                    href="/demo-request"
                    className={`mt-4 flex h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold transition-colors ${
                      plan.highlighted
                        ? "bg-[#5B4DE3] text-white hover:bg-[#4c3fd1]"
                        : "border border-[#EAF0F8] text-[#0B1F55] hover:bg-[#F7F8FF]"
                    }`}
                  >
                    Demo Talep Et
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center text-sm text-[#667085]">
            <p>
              Paket fiyatları klinik büyüklüğü, kullanıcı sayısı ve ihtiyaç duyulan hizmetlere göre
              değişebilir.
            </p>
            <p className="mt-1.5">Kurulum, eğitim ve destek süreçleri ihtiyaçlarınıza göre planlanır.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
