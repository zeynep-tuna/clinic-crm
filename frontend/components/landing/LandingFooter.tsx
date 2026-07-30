import Link from "next/link";

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={1.75} className="h-6 w-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#EEF0FF"
        d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12h2l1-2 2 4 1-2h2" />
    </svg>
  );
}

const footerLinks = [
  { label: "Özellikler", href: "/features" },
  { label: "Hizmetler", href: "/services" },
  { label: "Fiyatlandırma", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/contact" },
];

const legalLinks = [
  { label: "KVKK", href: "#" },
  { label: "Gizlilik Politikası", href: "#" },
  { label: "Kullanım Şartları", href: "#" },
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-[#E3E8F0] bg-white px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div className="max-w-xs">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <HeartIcon />
            <span className="text-lg font-bold text-[#0B1F55]">ClinicCRM</span>
          </div>
          <p className="mt-3 text-sm text-[#667085]">
            Diş klinikleri için hasta, randevu, ödeme ve onam süreçlerini tek panelde yöneten modern CRM
            çözümü.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#0B1F55] hover:text-[#5B4DE3]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center gap-4 border-t border-[#E3E8F0] pt-6 sm:flex-row sm:justify-between">
        <p className="text-xs text-[#98A2B3]">© 2026 ClinicCRM. Tüm hakları saklıdır.</p>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
          {legalLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-xs text-[#667085] hover:text-[#5B4DE3]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
