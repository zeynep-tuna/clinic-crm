"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Hastalar", href: "/patients" },
  { label: "Randevular", href: "/appointments" },
  { label: "Doktorlar", href: "/doctors" },
  { label: "Ödemeler", href: "/payments" },
  { label: "Onam Formları", href: "/consent-forms" },
  { label: "Raporlar", href: "/reports" },
  { label: "Ayarlar", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-border bg-white">
      <div className="flex h-[84px] items-center border-b border-border px-6">
        <span className="text-lg font-bold text-heading">ClinicCRM</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-soft text-primary"
                  : "text-muted hover:bg-page hover:text-heading"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
