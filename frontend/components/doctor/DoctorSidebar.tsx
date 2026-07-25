"use client";

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

function isRouteActive(pathname: string, href: string) {
  if (href === "/doctor/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DoctorSidebar() {
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
