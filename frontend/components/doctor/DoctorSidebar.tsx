"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavIcon =
  | "dashboard"
  | "patients"
  | "appointments"
  | "treatments"
  | "payments"
  | "consent"
  | "messages"
  | "profile";

const navItems: { label: string; href: string; icon: NavIcon }[] = [
  { label: "Dashboard", href: "/doctor/dashboard", icon: "dashboard" },
  { label: "Hastalarım", href: "/doctor/patients", icon: "patients" },
  { label: "Randevularım", href: "/doctor/appointments", icon: "appointments" },
  { label: "Tedavi Planlarım", href: "/doctor/treatment-plans", icon: "treatments" },
  { label: "Ödemeler", href: "/doctor/payments", icon: "payments" },
  { label: "Onam Formları", href: "/doctor/consent-forms", icon: "consent" },
  { label: "Mesajlar", href: "/doctor/messages", icon: "messages" },
  { label: "Profilim", href: "/doctor/profile", icon: "profile" },
];

const STORAGE_KEY = "doctor-sidebar-collapsed";

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
    case "treatments":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v6M9 6h6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11h10l-1.2 8.4a2 2 0 0 1-2 1.6H10.2a2 2 0 0 1-2-1.6L7 11Z" />
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
    case "messages":
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4 3.5V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"
          />
        </svg>
      );
    case "profile":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path strokeLinecap="round" d="M5 20c.7-3.8 3.4-6 7-6s6.3 2.2 7 6" />
        </svg>
      );
    default:
      return null;
  }
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 16l4-4-4-4M20 12H9" />
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

function isRouteActive(pathname: string, href: string) {
  if (href === "/doctor/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DoctorSidebar() {
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
      className={`flex h-screen shrink-0 flex-col border-r border-[#E3E8F0]/60 bg-white transition-all duration-200 ease-in-out ${
        collapsed ? "w-20" : "w-65"
      }`}
    >
      <div
        className={`flex h-18 items-center gap-2.5 border-b border-[#E3E8F0]/60 transition-all duration-200 ease-in-out ${
          collapsed ? "justify-center px-2" : "px-5"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={1.75} className="h-7 w-7 shrink-0">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#EEF0FF"
            d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9Z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12h2l1-2 2 4 1-2h2" />
        </svg>
        <span
          className={`overflow-hidden whitespace-nowrap text-lg font-bold text-[#0B1F55] transition-all duration-200 ease-in-out ${
            collapsed ? "max-w-0 opacity-0" : "max-w-40 opacity-100"
          }`}
        >
          ClinicCRM
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = isRouteActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex h-11 items-center rounded-xl text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#5B4DE3]/20 ${
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

      <div className="border-t border-[#F1F4FA] px-3 pt-4 pb-4">
        <Link
          href="/login"
          className={`group relative flex h-11 items-center rounded-xl text-sm font-medium text-[#667085] outline-none transition-colors hover:bg-[#FEF2F2] hover:text-[#EF4444] focus-visible:ring-2 focus-visible:ring-[#5B4DE3]/20 ${
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

        <div className={`mt-2 ${collapsed ? "flex justify-center" : "flex justify-end"}`}>
          <button
            type="button"
            onClick={() => setCollapsed((previous) => !previous)}
            aria-label={collapsed ? "Sidebar'ı genişlet" : "Sidebar'ı daralt"}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E3E8F0] text-[#667085] transition-colors hover:bg-[#F7F8FF]"
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        </div>
      </div>
    </aside>
  );
}
