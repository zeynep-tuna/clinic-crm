import type { Appointment, AppointmentStatus } from "@/lib/appointments-api";

type UiStatus = "Bekliyor" | "Onaylandı" | "Tamamlandı" | "İptal Edildi" | "Gelmedi";

const STATUS_LABELS: Record<AppointmentStatus, UiStatus> = {
  SCHEDULED: "Bekliyor",
  CONFIRMED: "Onaylandı",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal Edildi",
  NO_SHOW: "Gelmedi",
};

const statusOrder: AppointmentStatus[] = ["CONFIRMED", "SCHEDULED", "COMPLETED", "CANCELLED", "NO_SHOW"];

const statusColor: Record<UiStatus, string> = {
  Onaylandı: "#16A34A",
  Bekliyor: "#F59E0B",
  Tamamlandı: "#2563EB",
  "İptal Edildi": "#EF4444",
  Gelmedi: "#667085",
};

interface AppointmentStatusDistributionProps {
  appointments: Appointment[];
}

export default function AppointmentStatusDistribution({ appointments }: AppointmentStatusDistributionProps) {
  const activeAppointments = appointments.filter((appointment) => appointment.isActive);
  const total = activeAppointments.length;

  const distribution = statusOrder.map((status) => {
    const count = activeAppointments.filter((appointment) => appointment.status === status).length;
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    return { status: STATUS_LABELS[status], count, percent };
  });

  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#0B1F55]">Randevu Durum Dağılımı</h3>
        <span className="text-xs font-medium text-[#667085]">Toplam {total} randevu</span>
      </div>

      <div className="mt-5 flex-1 space-y-4">
        {distribution.map((item) => (
          <div key={item.status}>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-medium text-[#0B1F55]">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: statusColor[item.status] }}
                />
                {item.status}
              </span>
              <span className="text-[#667085]">
                {item.count} · %{item.percent}
              </span>
            </div>

            <div className="mt-2 h-2 w-full rounded-full bg-[#F3F4F6]">
              <div
                className="h-2 rounded-full"
                style={{ width: `${item.percent}%`, backgroundColor: statusColor[item.status] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
