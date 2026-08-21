import Link from "next/link";

export type DoctorStatIcon = "appointments" | "treatments" | "review" | "messages";

export interface DoctorStatCardProps {
  title: string;
  value: string;
  icon: DoctorStatIcon;
  href: string;
  linkLabel: string;
}

const iconColorByType: Record<DoctorStatIcon, string> = {
  appointments: "bg-[#EEF0FF] text-[#5B4DE3]",
  treatments: "bg-[#DCFCE7] text-[#16A34A]",
  review: "bg-[#FEF3C7] text-[#F59E0B]",
  messages: "bg-[#DBEAFE] text-[#2563EB]",
};

const linkColorByType: Record<DoctorStatIcon, string> = {
  appointments: "text-[#5B4DE3]",
  treatments: "text-[#16A34A]",
  review: "text-[#F59E0B]",
  messages: "text-[#2563EB]",
};

function StatIconGlyph({ icon }: { icon: DoctorStatIcon }) {
  switch (icon) {
    case "appointments":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "treatments":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v6M9 6h6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11h10l-1.2 8.4a2 2 0 0 1-2 1.6H10.2a2 2 0 0 1-2-1.6L7 11Z" />
        </svg>
      );
    case "review":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <circle cx="12" cy="12" r="8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
        </svg>
      );
    case "messages":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4 3.5V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function DoctorStatCard({ title, value, icon, href, linkLabel }: DoctorStatCardProps) {
  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#667085]">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-[#0B1F55]">{value}</p>
        </div>

        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconColorByType[icon]}`}>
          <StatIconGlyph icon={icon} />
        </div>
      </div>

      <Link href={href} className={`mt-3 block text-xs font-medium ${linkColorByType[icon]} hover:underline`}>
        {linkLabel}
      </Link>
    </div>
  );
}
