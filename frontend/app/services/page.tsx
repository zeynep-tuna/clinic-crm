import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

function SetupIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5.5 w-5.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.7 6.3a2.5 2.5 0 0 0 3.5 3.5l2.1 2.1-6.4 6.4-2.1-2.1a2.5 2.5 0 0 0-3.5-3.5L4 16.9V20h3.1l4.2-4.2a2.5 2.5 0 0 0 3.5-3.5l2.1-2.1"
      />
    </svg>
  );
}

function TrainingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5.5 w-5.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 8.5 12 4l9.5 4.5-9.5 4.5-9.5-4.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10.8V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.2" />
    </svg>
  );
}

function DataMigrationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5.5 w-5.5">
      <rect x="3.5" y="4" width="7" height="16" rx="1.5" />
      <rect x="13.5" y="4" width="7" height="16" rx="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.5h4M11 7.5l2 2-2 2" />
    </svg>
  );
}

function ProcessAnalysisIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5.5 w-5.5">
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path strokeLinecap="round" d="M7.7 7.6 10.3 16M16.3 7.6 13.7 16M8.2 6h7.6" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5.5 w-5.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 13v-1a8 8 0 1 1 16 0v1" />
      <rect x="3" y="13" width="4" height="5" rx="1.2" />
      <rect x="17" y="13" width="4" height="5" rx="1.2" />
      <path strokeLinecap="round" d="M19 18v1a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}

function ReportingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5.5 w-5.5">
      <path strokeLinecap="round" d="M4 20V10M11 20V4M18 20v-7" />
      <path strokeLinecap="round" d="M3 20h18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const services = [
  {
    title: "Kurulum Desteği",
    description:
      "ClinicCRM panelinizi diş kliniğinizin hasta, randevu, ödeme ve onam süreçlerine uygun şekilde yapılandırıyoruz.",
    Icon: SetupIcon,
  },
  {
    title: "Personel Eğitimi",
    description:
      "Sekreter, diş hekimi ve yönetici rollerinin paneli doğru ve verimli kullanabilmesi için kısa ve uygulanabilir eğitimler sağlıyoruz.",
    Icon: TrainingIcon,
  },
  {
    title: "Veri Taşıma",
    description:
      "Mevcut hasta kayıtları, randevu listeleri ve ödeme bilgilerinin yeni sisteme düzenli şekilde aktarılması için destek sunuyoruz.",
    Icon: DataMigrationIcon,
  },
  {
    title: "Klinik Süreç Analizi",
    description:
      "Diş kliniğinizin hasta kabul, randevu, tedavi planı ve ödeme akışlarını analiz ederek paneli ihtiyaçlarınıza göre planlıyoruz.",
    Icon: ProcessAnalysisIcon,
  },
  {
    title: "Teknik Destek",
    description:
      "Kullanım sırasında oluşabilecek sorular, erişim problemleri ve panel ayarları için destek süreci sağlıyoruz.",
    Icon: SupportIcon,
  },
  {
    title: "Raporlama ve Performans Takibi",
    description:
      "Randevu yoğunluğu, ödeme durumu, hasta hareketleri ve klinik performansını daha görünür hale getiren raporlama süreçleri sunuyoruz.",
    Icon: ReportingIcon,
  },
];

const processSteps = [
  {
    title: "İhtiyaç Analizi",
    description: "Diş kliniğinizin mevcut hasta, randevu ve ödeme süreçleri incelenir.",
  },
  {
    title: "Kurulum ve Yapılandırma",
    description: "Panel rolleriniz, klinik akışınız ve temel modülleriniz hazırlanır.",
  },
  {
    title: "Eğitim ve Kullanıma Geçiş",
    description: "Sekreter, diş hekimi ve yönetici ekipleri için kullanım süreci anlatılır.",
  },
  {
    title: "Destek ve İyileştirme",
    description: "Kullanım sonrası ihtiyaçlar takip edilir ve süreçler geliştirilebilir.",
  },
];

const trustPoints = [
  {
    title: "Diş kliniği süreçlerine uygun yapı",
    description:
      "Hasta kabul, randevu, tedavi planı, ödeme ve onam süreçleri diş kliniklerinin günlük işleyişine göre planlanır.",
  },
  {
    title: "Rol bazlı kullanım desteği",
    description:
      "Sekreter, diş hekimi ve yönetici rollerinin paneli doğru kullanması için süreçler ayrı ayrı ele alınır.",
  },
  {
    title: "Kurulumdan sonra sürdürülebilir destek",
    description:
      "Kullanım başladıktan sonra ihtiyaçlar takip edilir, panel ayarları ve süreç iyileştirmeleri desteklenir.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <LandingNavbar activeHref="/services" />

      <div className="relative overflow-hidden bg-[#F7F8FF]">
        <div className="pointer-events-none absolute -left-40 top-20 z-0 h-105 w-105 rounded-full bg-[#DCD8FF] opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 z-0 h-120 w-120 rounded-full bg-[#DCD8FF] opacity-40 blur-3xl" />

        <section className="relative z-10 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-[#EEF0FF] px-4 py-1.5 text-sm font-semibold text-[#5B4DE3]">
              Hizmetlerimiz
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#0B1F55] sm:text-5xl">
              Diş kliniğinizin dijital dönüşüm sürecinde yanınızdayız
            </h1>

            <p className="mt-5 text-base text-[#667085] sm:text-lg">
              ClinicCRM ile kurulumdan eğitime, veri taşıma desteğinden operasyon danışmanlığına kadar diş
              kliniklerinin ihtiyaç duyduğu hizmetleri tek süreçte planlıyoruz.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/demo-request"
                className="rounded-xl bg-[#5B4DE3] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-colors hover:bg-[#4c3fd1]"
              >
                Demo Talep Et
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-[#EAF0F8] bg-white px-6 py-3 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
              >
                Fiyatlandırmayı İncele
              </Link>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-6 pb-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold text-[#0B1F55]">Diş klinikleri için uçtan uca destek</h2>
              <p className="mt-3 text-base text-[#667085]">
                ClinicCRM&apos;i sadece bir yazılım olarak değil, kliniğinizin günlük operasyonlarına uyum
                sağlayan bir dijital yönetim süreci olarak konumlandırıyoruz.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="flex items-start gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_12px_32px_rgba(15,23,42,0.07)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#5B4DE3]">
                    <service.Icon />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#0B1F55]">{service.title}</h3>
                    <p className="mt-1.5 text-sm text-[#667085]">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold text-[#0B1F55]">
            ClinicCRM hizmet süreci nasıl ilerler?
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-[20px] border border-[#EAF0F8] bg-[#F7F8FF] p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5B4DE3] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-bold text-[#0B1F55]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#667085]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F8FF] px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-extrabold text-[#0B1F55]">Neden ClinicCRM hizmet desteği?</h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <div
                key={point.title}
                className="flex flex-col items-center rounded-[20px] border border-[#EAF0F8] bg-white p-6 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#5B4DE3]">
                  <CheckIcon />
                </span>
                <p className="mt-4 text-sm font-semibold text-[#0B1F55]">{point.title}</p>
                <p className="mt-2 text-sm text-[#667085]">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-16 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-[20px] border border-[#EAF0F8] bg-[#F7F8FF] p-8 text-center sm:p-10">
          <h2 className="text-2xl font-extrabold text-[#0B1F55] sm:text-3xl">
            Diş kliniğiniz için doğru kurulumu birlikte planlayalım.
          </h2>
          <p className="mt-3 text-base text-[#667085]">
            ClinicCRM demo görüşmesinde kliniğinizin ihtiyaçlarını analiz ederek size uygun paket ve hizmet
            sürecini önerebiliriz.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/demo-request"
              className="rounded-xl bg-[#5B4DE3] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-colors hover:bg-[#4c3fd1]"
            >
              Demo Talep Et
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
