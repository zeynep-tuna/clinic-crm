"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavIcon =
  | "dashboard"
  | "patients"
  | "appointments"
  | "doctors"
  | "payments"
  | "consent"
  | "reports"
  | "settings";

const navItems: { label: string; href: string; icon: NavIcon }[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Hastalar", href: "/patients", icon: "patients" },
  { label: "Randevular", href: "/appointments", icon: "appointments" },
  { label: "Doktorlar", href: "/doctors", icon: "doctors" },
  { label: "Ödemeler", href: "/payments", icon: "payments" },
  { label: "Onam Formları", href: "/consent-forms", icon: "consent" },
  { label: "Raporlar", href: "/reports", icon: "reports" },
  { label: "Ayarlar", href: "/settings", icon: "settings" },
];

const STORAGE_KEY = "admin-sidebar-collapsed";

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={1.75} className="h-6 w-6 shrink-0">
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

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 16l4-4-4-4" />
      <path strokeLinecap="round" d="M19 12H9" />
    </svg>
  );
}

function NavIconGlyph({ icon }: { icon: NavIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    className: "h-5 w-5 shrink-0",
  };

  switch (icon) {
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "patients":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path strokeLinecap="round" d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
          <path strokeLinecap="round" d="M15.5 5.5a3 3 0 0 1 0 5.8M18 19c-.4-2.3-1.5-4-3.2-4.8" />
        </svg>
      );
    case "appointments":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "doctors":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5v5.5a3.5 3.5 0 0 0 7 0V3.5" />
          <path strokeLinecap="round" d="M7 3.5H5.7M14 3.5h1.3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12v2.5a4.5 4.5 0 0 0 9 0v-1" />
          <circle cx="19.5" cy="13.5" r="1.5" />
        </svg>
      );
    case "payments":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "consent":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
          <path strokeLinecap="round" d="M9 12.5l2 2 4-4.5" />
        </svg>
      );
    case "reports":
      return (
        <svg {...common}>
          <path strokeLinecap="round" d="M4 20V10M11 20V4M18 20v-7" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path strokeLinecap="round" d="M12 3v2M12 19v2M4.2 6.2l1.4 1.4M18.4 16.4l1.4 1.4M3 12h2M19 12h2M4.2 17.8l1.4-1.4M18.4 7.6l1.4-1.4" />
        </svg>
      );
    default:
      return null;
  }
}

function isRouteActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setCollapsed(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col border-r border-[#EAF0F8]/70 bg-white transition-all duration-200 ease-in-out ${
        collapsed ? "w-20" : "w-60"
      }`}
    >
      <div
        className={`flex h-16 items-center gap-2 border-b border-[#EAF0F8]/70 transition-all duration-200 ease-in-out ${
          collapsed ? "justify-center px-2" : "px-5"
        }`}
      >
        <HeartIcon />
        <span
          className={`overflow-hidden whitespace-nowrap text-base font-bold text-[#0B1F55] transition-all duration-200 ease-in-out ${
            collapsed ? "max-w-0 opacity-0" : "max-w-40 opacity-100"
          }`}
        >
          ClinicCRM
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3.5">
        {navItems.map((item) => {
          const isActive = isRouteActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center rounded-xl py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#5B4DE3]/20 ${
                collapsed ? "justify-center px-0" : "gap-2.5 px-3.5"
              } ${
                isActive
                  ? "bg-[#EEF0FF] text-[#5B4DE3]"
                  : "text-[#667085] hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
              }`}
            >
              <NavIconGlyph icon={item.icon} />
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-200 ease-in-out ${
                  collapsed ? "max-w-0 opacity-0" : "max-w-40 opacity-100"
                }`}
              >
                {item.label}
              </span>

              {collapsed && (
                <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0B1F55] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-[0_4px_12px_rgba(16,24,40,0.18)] transition-opacity duration-150 group-hover:opacity-100">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#EEF2F8] p-3.5">
        <Link
          href="/login"
          className={`group relative flex items-center rounded-xl py-2 text-sm font-medium text-[#667085] outline-none transition-colors hover:bg-[#FEF2F2] hover:text-[#EF4444] focus-visible:ring-2 focus-visible:ring-[#5B4DE3]/20 ${
            collapsed ? "justify-center px-0" : "gap-2.5 px-3.5"
          }`}
        >
          <LogoutIcon />
          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-200 ease-in-out ${
              collapsed ? "max-w-0 opacity-0" : "max-w-40 opacity-100"
            }`}
          >
            Çıkış Yap
          </span>

          {collapsed && (
            <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0B1F55] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-[0_4px_12px_rgba(16,24,40,0.18)] transition-opacity duration-150 group-hover:opacity-100">
              Çıkış Yap
            </span>
          )}
        </Link>

        <div className={`mt-3 ${collapsed ? "flex justify-center" : "flex justify-end"}`}>
          <button
            type="button"
            onClick={() => setCollapsed((previous) => !previous)}
            aria-label={collapsed ? "Sidebar'ı genişlet" : "Sidebar'ı daralt"}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EAF0F8] text-[#667085] transition-colors hover:bg-[#F7F8FF]"
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        </div>
      </div>
    </aside>
  );
}
