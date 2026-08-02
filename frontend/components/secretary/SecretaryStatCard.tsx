import type { SecretaryStatCardData, SecretaryStatIcon } from "@/data/secretaryDashboard";

const iconColorByType: Record<SecretaryStatIcon, string> = {
  appointments: "bg-[#EEF0FF] text-[#5B4DE3]",
  newPatient: "bg-[#DCFCE7] text-[#16A34A]",
  payments: "bg-[#FEF3C7] text-[#F59E0B]",
  consent: "bg-[#DBEAFE] text-[#2563EB]",
};

const linkColorByType: Record<SecretaryStatIcon, string> = {
  appointments: "text-[#5B4DE3]",
  newPatient: "text-[#16A34A]",
  payments: "text-[#F59E0B]",
  consent: "text-[#2563EB]",
};

function StatIconGlyph({ icon }: { icon: SecretaryStatIcon }) {
  switch (icon) {
    case "appointments":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "newPatient":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <circle cx="9" cy="8" r="3" />
          <path strokeLinecap="round" d="M2.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
          <path strokeLinecap="round" d="M18 8v5M15.5 10.5h5" />
        </svg>
      );
    case "payments":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "consent":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
          />
          <path strokeLinecap="round" d="M9 12.5l2 2 4-4.5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SecretaryStatCard({ title, value, icon, linkLabel }: SecretaryStatCardData) {
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

      <p className={`mt-3 text-xs font-medium ${linkColorByType[icon]}`}>{linkLabel}</p>
    </div>
  );
}
