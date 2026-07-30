import Link from "next/link";
import DashboardPreviewMock from "@/components/landing/DashboardPreviewMock";

const badges = ["KVKK Uyumlu", "Bulut Tabanlı", "7/24 Erişim"];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={2} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function LandingHero() {
  return (
    <section className="relative flex min-h-[calc(100vh-71px)] flex-col justify-center overflow-hidden bg-[#F7F8FF] px-6 py-12 lg:px-10 lg:py-16">
      <div className="pointer-events-none absolute -right-32 -top-32 z-0 h-104 w-104 rounded-full bg-[#DCD8FF] opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 z-0 h-104 w-104 rounded-full bg-[#DCD8FF] opacity-60 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-[#0B1F55] sm:text-5xl">
            Diş Klinikleri İçin Modern CRM Yazılımı
          </h1>

          <p className="mt-6 max-w-xl text-base text-[#667085] sm:text-lg">
            Hasta kayıtlarından randevu yönetimine, diş hekimi takibinden ödeme süreçlerine kadar tüm
            diş kliniği operasyonlarınızı tek panelden yönetin.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/demo-request"
              className="rounded-xl bg-[#5B4DE3] px-6 py-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)] hover:bg-[#4c3fd1]"
            >
              Demo Talep Et
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-[#E3E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
            >
              Paneli İncele
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {badges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 text-sm font-medium text-[#0B1F55]"
              >
                <CheckIcon />
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-180">
          <DashboardPreviewMock />
        </div>
      </div>
    </section>
  );
}
