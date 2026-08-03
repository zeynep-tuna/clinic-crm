"use client";

import { useEffect, useRef, useState } from "react";

export type NotificationType = "appointment" | "payment" | "consent" | "message" | "patient";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  time: string;
  unread: boolean;
}

function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className="h-4.5 w-4.5"
    >
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

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path strokeLinecap="round" d="M8.5 10h7M8.5 13.5h7M8.5 17h4" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5.5h16v10.5a1 1 0 0 1-1 1H9l-4 3.5V17a1 1 0 0 1-1-1V5.5Z"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <circle cx="12" cy="8.5" r="3" />
      <path strokeLinecap="round" d="M4.5 19.5c.7-3.5 3.3-5.8 7.5-5.8s6.8 2.3 7.5 5.8" />
    </svg>
  );
}

const typeBadgeClass: Record<NotificationType, string> = {
  appointment: "bg-[#EEF0FF] text-[#5B4DE3]",
  payment: "bg-[#FEF3C7] text-[#F59E0B]",
  consent: "bg-[#DCFCE7] text-[#16A34A]",
  message: "bg-[#DBEAFE] text-[#2563EB]",
  patient: "bg-[#DCFCE7] text-[#16A34A]",
};

const typeIcon: Record<NotificationType, React.ReactNode> = {
  appointment: <CalendarIcon />,
  payment: <WalletIcon />,
  consent: <DocumentIcon />,
  message: <MessageIcon />,
  patient: <UserIcon />,
};

interface NotificationDropdownProps {
  notifications: NotificationItem[];
}

export default function NotificationDropdown({ notifications: initialNotifications }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const unreadCount = notifications.filter((notification) => notification.unread).length;

  function markAllAsRead() {
    setNotifications((previous) => previous.map((notification) => ({ ...notification, unread: false })));
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label="Bildirimler"
        onClick={() => setIsOpen((previous) => !previous)}
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#EAF0F8] text-[#667085] transition-colors hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#EF4444] ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[360px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[24px] border border-[#EEF2F8] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
          <div className="flex items-center justify-between border-b border-[#EEF2F8] px-5 py-4">
            <h2 className="text-sm font-bold text-[#0B1F55]">Bildirimler</h2>
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-xs font-semibold text-[#5B4DE3] hover:underline"
            >
              Tümünü okundu işaretle
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex gap-3 border-b border-[#EEF2F8] px-5 py-3.5 transition-colors last:border-0 hover:bg-[#F7F8FF] ${
                  notification.unread ? "bg-[#F9F9FF]" : ""
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${typeBadgeClass[notification.type]}`}
                >
                  {typeIcon[notification.type]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-[#0B1F55]">{notification.title}</p>
                    {notification.unread && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#5B4DE3]" />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-[#667085]">{notification.description}</p>
                  <p className="mt-1 text-[11px] text-[#98A2B3]">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#EEF2F8] px-5 py-3 text-center">
            <a href="#" className="text-xs font-semibold text-[#5B4DE3] hover:underline">
              Tüm bildirimleri görüntüle
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
