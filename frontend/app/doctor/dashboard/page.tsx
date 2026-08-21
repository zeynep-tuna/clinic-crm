"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import DoctorStatCard from "@/components/doctor/DoctorStatCard";
import DoctorTodayAppointments from "@/components/doctor/DoctorTodayAppointments";
import DoctorUpcomingAppointments from "@/components/doctor/DoctorUpcomingAppointments";
import DoctorWeeklyLoad from "@/components/doctor/DoctorWeeklyLoad";
import DoctorRecentPatients from "@/components/doctor/DoctorRecentPatients";
import { getCurrentUser, type AuthUser } from "@/lib/auth";
import { listAppointments, type Appointment, type AppointmentStatus } from "@/lib/appointments-api";
import { listTreatmentPlans, type TreatmentPlan } from "@/lib/treatment-plans-api";
import { listMessages, type Message } from "@/lib/messages-api";

const OPERATIONAL_STATUSES: AppointmentStatus[] = ["SCHEDULED", "CONFIRMED"];

function isOperational(appointment: Appointment) {
  return OPERATIONAL_STATUSES.includes(appointment.status);
}

function isToday(value: string) {
  const date = new Date(value);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function BannerCalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
    </svg>
  );
}

const todayLabelFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
});

export default function DoctorDashboardPage() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [user, appointmentsData, treatmentPlansData, messagesData] = await Promise.all([
        getCurrentUser(),
        listAppointments({ includeInactive: true }),
        listTreatmentPlans({ includeInactive: true }),
        listMessages(),
      ]);
      setCurrentUser(user);
      setAppointments(appointmentsData);
      setTreatmentPlans(treatmentPlansData);
      setMessages(messagesData);
    } catch {
      setError("Dashboard verileri yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const activeAppointments = useMemo(() => appointments.filter((a) => a.isActive), [appointments]);

  const operationalAppointments = useMemo(
    () => activeAppointments.filter(isOperational),
    [activeAppointments]
  );

  const todayAppointments = useMemo(
    () => operationalAppointments.filter((appointment) => isToday(appointment.startAt)),
    [operationalAppointments]
  );

  const upcomingAppointments = useMemo(() => {
    const now = new Date();
    return [...operationalAppointments]
      .filter((appointment) => new Date(appointment.startAt) > now)
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
      .slice(0, 5);
  }, [operationalAppointments]);

  const activeTreatmentPlanCount = useMemo(
    () => treatmentPlans.filter((plan) => plan.isActive && plan.status === "ACTIVE").length,
    [treatmentPlans]
  );

  const reviewPendingPlanCount = useMemo(
    () => treatmentPlans.filter((plan) => plan.isActive && plan.status === "REVIEW_PENDING").length,
    [treatmentPlans]
  );

  const unreadMessageCount = useMemo(() => {
    if (!currentUser) return 0;
    return messages.filter((message) => message.receiverId === currentUser.id && !message.isRead).length;
  }, [messages, currentUser]);

  const todayLabel = todayLabelFormatter.format(new Date());

  if (isLoading) {
    return (
      <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <p className="text-sm text-[#667085]">Dashboard verileri yükleniyor...</p>
      </div>
    );
  }

  if (error || !currentUser) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[20px] border border-[#EAF0F8] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <p className="text-sm text-[#EF4444]">{error ?? "Dashboard verileri yüklenirken bir hata oluştu."}</p>
        <button
          type="button"
          onClick={loadDashboardData}
          className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#DCD8FF] bg-linear-to-r from-white to-[#F7F8FF] px-6 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            🦷
          </span>

          <div>
            <p className="text-base font-semibold text-[#0B1F55]">Hoş geldiniz, {currentUser.fullName}!</p>
            <p className="mt-0.5 text-sm text-[#667085]">
              Bugünkü randevularınızı ve tedavi süreçlerinizi buradan hızlıca takip edebilirsiniz.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-[#667085]">
            <BannerCalendarIcon />
            <span>{todayLabel}</span>
          </div>
          <span className="inline-flex items-center rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-semibold text-[#5B4DE3]">
            Bugün {todayAppointments.length} randevu
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DoctorStatCard
          title="Bugünkü Randevularım"
          value={todayAppointments.length.toLocaleString("tr-TR")}
          icon="appointments"
          href="/doctor/appointments"
          linkLabel="Tüm randevuları gör →"
        />
        <DoctorStatCard
          title="Aktif Tedavi Planlarım"
          value={activeTreatmentPlanCount.toLocaleString("tr-TR")}
          icon="treatments"
          href="/doctor/treatment-plans"
          linkLabel="Tedavi planlarını gör →"
        />
        <DoctorStatCard
          title="Kontrol Bekleyen Planlar"
          value={reviewPendingPlanCount.toLocaleString("tr-TR")}
          icon="review"
          href="/doctor/treatment-plans"
          linkLabel="Planları gör →"
        />
        <DoctorStatCard
          title="Okunmamış Mesajlar"
          value={unreadMessageCount.toLocaleString("tr-TR")}
          icon="messages"
          href="/doctor/messages"
          linkLabel="Mesajları gör →"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <DoctorTodayAppointments appointments={todayAppointments} />
        <DoctorWeeklyLoad appointments={operationalAppointments} />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <DoctorRecentPatients appointments={activeAppointments} />
        <DoctorUpcomingAppointments appointments={upcomingAppointments} />
      </div>
    </div>
  );
}
