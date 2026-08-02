function MiniHeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={1.75} className="h-5 w-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#EEF0FF"
        d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9Z"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3.5 w-3.5">
      <circle cx="11" cy="11" r="6.5" />
      <path strokeLinecap="round" d="M20 20l-3.8-3.8" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3.5 w-3.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7v11a2 2 0 0 0 2 2h12a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-4a2 2 0 1 0 0 4h5"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <circle cx="9" cy="8" r="3" />
      <path strokeLinecap="round" d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
      <path strokeLinecap="round" d="M15.5 5.5a3 3 0 0 1 0 5.8M18 19c-.4-2.3-1.5-4-3.2-4.8" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function WindowDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
      <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
      <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
    </div>
  );
}

function StatMini({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#EAF0F8] p-2.5">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EEF0FF] text-[#5B4DE3]">
        {icon}
      </div>
      <p className="mt-1.5 text-[11px] text-[#667085]">{label}</p>
      <p className="text-sm font-bold text-[#0B1F55]">{value}</p>
    </div>
  );
}

const sidebarNavIcons = [<GridIcon key="grid" />, <UsersIcon key="users" />, <CalendarIcon key="cal" />, <WalletIcon key="wallet" />];

const appointmentRows = [
  { time: "09:00", name: "Ayşe Demir", doctor: "Dr. Elif Kaya", statusColor: "#16A34A" },
  { time: "10:30", name: "Mehmet Kaya", doctor: "Dr. Ahmet Can", statusColor: "#F59E0B" },
];

const chartPoints = [18, 32, 26, 44, 38, 55, 62];

function MiniLineChart() {
  const width = 260;
  const height = 44;
  const max = Math.max(...chartPoints);
  const step = width / (chartPoints.length - 1);
  const linePoints = chartPoints
    .map((value, index) => `${index * step},${height - (value / max) * (height - 6)}`)
    .join(" ");
  const areaPoints = `0,${height} ${linePoints} ${width},${height}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="mt-1.5 h-11 w-full">
      <polygon points={areaPoints} fill="#5B4DE3" fillOpacity={0.08} />
      <polyline
        points={linePoints}
        fill="none"
        stroke="#5B4DE3"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const patientRows: { name: string; status: "Aktif" | "Bekliyor" }[] = [
  { name: "Ayşe Demir", status: "Aktif" },
  { name: "Zeynep Aydın", status: "Bekliyor" },
];

const patientStatusClass: Record<"Aktif" | "Bekliyor", string> = {
  Aktif: "bg-[#DCFCE7] text-[#16A34A]",
  Bekliyor: "bg-[#FEF3C7] text-[#F59E0B]",
};

function PatientsMiniMockup() {
  return (
    <div className="absolute -bottom-8 -left-8 z-20 hidden w-96 rounded-2xl border border-[#EAF0F8] bg-white p-4 shadow-[0_18px_32px_rgba(16,24,40,0.16),0_4px_10px_rgba(16,24,40,0.08)] lg:block">
      <div className="flex items-center justify-between border-b border-[#EAF0F8] pb-2.5">
        <WindowDots />
        <span className="text-sm font-bold text-[#0B1F55]">Hastalar</span>
      </div>

      <div className="mt-3 space-y-2">
        {patientRows.map((patient) => (
          <div key={patient.name} className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-xs font-semibold text-[#5B4DE3]">
                {patient.name.charAt(0)}
              </span>
              <span className="truncate text-sm font-medium text-[#0B1F55]">{patient.name}</span>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${patientStatusClass[patient.status]}`}
            >
              {patient.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPreviewMock() {
  return (
    <div className="relative w-full pb-10 lg:pb-14">
      {/* soft purple glow wrapping the whole showcase */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-[#5B4DE3]/12 blur-3xl" />

      {/* main dashboard mockup: wide, landscape aspect ratio so it reads as a browser/tablet screen, not a tall poster */}
      <div className="relative z-10 flex w-full overflow-hidden rounded-[28px] border border-[#EAF0F8] bg-white shadow-[0_20px_40px_rgba(16,24,40,0.12),0_4px_10px_rgba(16,24,40,0.06)] sm:aspect-16/10 sm:max-h-115">
          <div className="hidden w-16 shrink-0 flex-col items-center gap-4 border-r border-[#EAF0F8] bg-[#F7F8FF] py-4 sm:flex">
            <MiniHeartIcon />
            <div className="flex flex-col gap-2">
              {sidebarNavIcons.map((icon, index) => (
                <div
                  key={index}
                  className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                    index === 0 ? "bg-[#EEF0FF] text-[#5B4DE3]" : "text-[#98A2B3]"
                  }`}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-[#EAF0F8] pb-3">
              <div className="flex items-center gap-3">
                <WindowDots />
                <span className="text-sm font-bold text-[#0B1F55]">Dashboard</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-1.5 rounded-lg border border-[#EAF0F8] px-2.5 py-1.5 text-xs text-[#98A2B3] md:flex">
                  <SearchIcon />
                  Ara...
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#EAF0F8] text-[#667085]">
                  <BellIcon />
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EEF0FF] text-[11px] font-semibold text-[#5B4DE3]">
                  A
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2.5">
              <StatMini icon={<CalendarIcon />} label="Bugünkü Randevu" value="28" />
              <StatMini icon={<WalletIcon />} label="Bekleyen Ödeme" value="₺24.680" />
              <StatMini icon={<UsersIcon />} label="Toplam Hasta" value="1.248" />
            </div>

            <div className="mt-3">
              <p className="text-xs font-semibold text-[#0B1F55]">Bugünkü Randevular</p>
              <div className="mt-2 space-y-1.5">
                {appointmentRows.map((row) => (
                  <div
                    key={row.time}
                    className="flex items-center justify-between rounded-lg border border-[#EAF0F8] px-2.5 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF0FF] text-[9px] font-semibold text-[#5B4DE3]">
                        {row.name.charAt(0)}
                      </span>
                      <span className="text-[11px] font-semibold text-[#0B1F55]">{row.time}</span>
                      <span className="text-[11px] text-[#0B1F55]">{row.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden text-[11px] text-[#667085] md:inline">{row.doctor}</span>
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: row.statusColor }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-[#EAF0F8] p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#0B1F55]">Gelir Özeti</p>
                <p className="text-xs font-bold text-[#5B4DE3]">₺186.450</p>
              </div>
              <MiniLineChart />
            </div>
          </div>
      </div>

      {/* second screen: Hastalar mini mockup, overlapping front/bottom-left, kept compact so it stays fully on-screen */}
      <PatientsMiniMockup />
    </div>
  );
}
