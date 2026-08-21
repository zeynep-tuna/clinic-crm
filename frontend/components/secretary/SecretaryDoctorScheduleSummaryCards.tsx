type SummaryIcon = "active-doctors" | "today-appointments";

interface SummaryCard {
  id: string;
  icon: SummaryIcon;
  title: string;
  value: number;
}

const colorByCardId: Record<string, string> = {
  "active-doctors": "bg-[#DCFCE7] text-[#16A34A]",
  "today-appointments": "bg-[#DBEAFE] text-[#2563EB]",
};

function SummaryIconGlyph({ icon }: { icon: SummaryIcon }) {
  switch (icon) {
    case "active-doctors":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <circle cx="9" cy="8" r="3" />
          <path strokeLinecap="round" d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
          <path strokeLinecap="round" d="M15.5 5.5a3 3 0 0 1 0 5.8M18 19c-.4-2.3-1.5-4-3.2-4.8" />
        </svg>
      );
    case "today-appointments":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4.5 w-4.5">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    default:
      return null;
  }
}

interface SecretaryDoctorScheduleSummaryCardsProps {
  activeDoctorCount: number;
  todayAppointmentCount: number;
}

export default function SecretaryDoctorScheduleSummaryCards({
  activeDoctorCount,
  todayAppointmentCount,
}: SecretaryDoctorScheduleSummaryCardsProps) {
  const cards: SummaryCard[] = [
    { id: "active-doctors", icon: "active-doctors", title: "Aktif Doktor", value: activeDoctorCount },
    { id: "today-appointments", icon: "today-appointments", title: "Bugünkü Randevu", value: todayAppointmentCount },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 rounded-[20px] border border-[#EAF0F8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-[#EAF0F8]/60">
      {cards.map((card) => (
        <div key={card.id} className="flex items-center gap-3 px-2 py-1.5 sm:px-5">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colorByCardId[card.id]}`}
          >
            <SummaryIconGlyph icon={card.icon} />
          </span>
          <div>
            <p className="text-xl font-bold text-[#0B1F55]">{card.value}</p>
            <p className="text-xs text-[#667085]">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
