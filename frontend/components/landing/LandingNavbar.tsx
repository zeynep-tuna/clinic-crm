import Link from "next/link";

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={1.75} className="h-7 w-7">
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

const navLinks = [
  { label: "Anasayfa", href: "/" },
  { label: "Özellikler", href: "/features" },
  { label: "Hizmetler", href: "/services" },
  { label: "Fiyatlandırma", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/contact" },
];

type LandingNavbarProps = {
  activeHref?: string;
};

export default function LandingNavbar({ activeHref }: LandingNavbarProps) {
  return (
    <header className="border-b border-[#E3E8F0] bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <HeartIcon />
          <span className="text-xl font-bold text-[#0B1F55]">ClinicCRM</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === activeHref;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium ${
                  isActive
                    ? "border-b-2 border-[#5B4DE3] pb-1 text-[#5B4DE3]"
                    : "text-[#0B1F55] hover:text-[#5B4DE3]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl border border-[#E3E8F0] px-4 py-2 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
          >
            Giriş Yap
          </Link>
          <Link
            href="/demo-request"
            className="rounded-xl bg-[#5B4DE3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
          >
            Demo Talep Et
          </Link>
        </div>
      </div>
    </header>
  );
}
