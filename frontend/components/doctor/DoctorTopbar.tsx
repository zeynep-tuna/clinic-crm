import { doctorProfile } from "@/data/doctorDashboard";
import NotificationDropdown, { type NotificationItem } from "@/components/common/NotificationDropdown";

const doctorNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Yeni hasta mesajı",
    description: "Ayşe Demir kontrol randevusu hakkında mesaj gönderdi.",
    type: "message",
    time: "6 dk önce",
    unread: true,
  },
  {
    id: "2",
    title: "Bugünkü randevu hatırlatması",
    description: "11:15 randevunuz için hasta dosyası hazırlandı.",
    type: "appointment",
    time: "30 dk önce",
    unread: true,
  },
  {
    id: "3",
    title: "Onam formu tamamlandı",
    description: "Mehmet Kaya dolgu tedavisi onam formunu imzaladı.",
    type: "consent",
    time: "2 saat önce",
    unread: false,
  },
];

export default function DoctorTopbar() {
  return (
    <header className="flex min-h-18 shrink-0 flex-wrap items-center justify-end gap-4 border-b border-[#EAF0F8]/60 bg-white px-6 py-3">
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
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
            placeholder="Hasta ara..."
            className="w-56 rounded-xl border border-[#EAF0F8] bg-[#F7F8FF] py-1.5 pl-9 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <NotificationDropdown notifications={doctorNotifications} />

        <button
          type="button"
          className="flex items-center gap-2.5 rounded-lg border-l border-[#EAF0F8]/60 py-1 pl-4 pr-1.5 transition-colors hover:bg-[#F7F8FF]"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
            EK
          </div>
          <div className="text-left leading-tight">
            <p className="text-sm font-medium text-[#0B1F55]">{doctorProfile.name}</p>
            <p className="text-xs text-[#667085]">{doctorProfile.role}</p>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4 shrink-0 text-[#667085]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </header>
  );
}
