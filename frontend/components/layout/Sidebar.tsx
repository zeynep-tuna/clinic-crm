"use client";

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

function NavIconGlyph({ icon }: { icon: NavIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    className: "h-5 w-5",
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v5a4 4 0 0 0 8 0V3M12 15v2m0 0a4 4 0 1 0 0 4.001" />
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

  return (
    <aside className="flex h-screen w-65 shrink-0 flex-col border-r border-[#E3E8F0] bg-white">
      <div className="flex h-21 items-center border-b border-[#E3E8F0] px-6">
        <span className="text-lg font-bold text-[#0B1F55]">ClinicCRM</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = isRouteActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#5B4DE3]/20 ${
                isActive
                  ? "bg-[#EEF0FF] text-[#5B4DE3]"
                  : "text-[#667085] hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
              }`}
            >
              <NavIconGlyph icon={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
