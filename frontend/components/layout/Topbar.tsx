import NotificationDropdown, { type NotificationItem } from "@/components/common/NotificationDropdown";

const adminNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Yeni randevu talebi oluşturuldu",
    description: "Ayşe Demir için bugün 14:30 randevusu eklendi.",
    type: "appointment",
    time: "5 dk önce",
    unread: true,
  },
  {
    id: "2",
    title: "Bekleyen ödeme hatırlatması",
    description: "Mehmet Kaya için ₺2.400 ödeme bekliyor.",
    type: "payment",
    time: "18 dk önce",
    unread: true,
  },
  {
    id: "3",
    title: "Yeni onam formu imzalandı",
    description: "Zeynep Aydın implant tedavisi onam formunu imzaladı.",
    type: "consent",
    time: "1 saat önce",
    unread: false,
  },
];

export default function Topbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-end border-b border-[#EAF0F8]/70 bg-white px-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path strokeLinecap="round" d="M20 20l-3.8-3.8" />
          </svg>
          <input
            type="text"
            placeholder="Ara..."
            className="h-9 w-56 rounded-xl border border-[#EAF0F8] bg-[#F7F8FF] pl-9 pr-3.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <NotificationDropdown notifications={adminNotifications} />

        <div className="flex items-center gap-2.5 border-l border-[#EAF0F8]/70 pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
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
