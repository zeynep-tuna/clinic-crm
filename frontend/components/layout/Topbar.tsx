"use client";

import { usePathname } from "next/navigation";

const pageTitles: { href: string; title: string }[] = [
  { href: "/dashboard", title: "Dashboard" },
  { href: "/patients", title: "Hastalar" },
  { href: "/appointments", title: "Randevular" },
  { href: "/doctors", title: "Doktorlar" },
  { href: "/payments", title: "Ödemeler" },
  { href: "/consent-forms", title: "Onam Formları" },
  { href: "/reports", title: "Raporlar" },
  { href: "/settings", title: "Ayarlar" },
];

function isRouteActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Topbar() {
  const pathname = usePathname();
  const title =
    pageTitles.find((item) => isRouteActive(pathname, item.href))?.title ?? "Dashboard";

  return (
    <header className="flex h-21 shrink-0 items-center justify-between border-b border-[#E3E8F0] bg-white px-8">
      <h1 className="text-xl font-semibold text-[#0B1F55]">{title}</h1>

      <div className="flex items-center gap-6">
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path strokeLinecap="round" d="M20 20l-3.8-3.8" />
          </svg>
          <input
            type="text"
            placeholder="Ara..."
            className="w-64 rounded-xl border border-[#E3E8F0] bg-[#F7F8FF] py-2 pl-10 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <button
          type="button"
          aria-label="Bildirimler"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E3E8F0] text-[#667085] transition-colors hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <div className="flex items-center gap-3 border-l border-[#E3E8F0] pl-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
            BT
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-[#0B1F55]">Beyza Tuncer</p>
            <p className="text-xs text-[#667085]">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
