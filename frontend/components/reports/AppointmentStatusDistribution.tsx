import {
  appointmentStatusDistribution,
  type AppointmentDistributionStatus,
} from "@/data/reports";

const statusColor: Record<AppointmentDistributionStatus, string> = {
  Onaylandı: "#16A34A",
  Bekliyor: "#F59E0B",
  Tamamlandı: "#2563EB",
  İptal: "#EF4444",
};

export default function AppointmentStatusDistribution() {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#E3E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h3 className="text-base font-bold text-[#0B1F55]">Randevu Durum Dağılımı</h3>

      <div className="mt-6 flex-1 space-y-5">
        {appointmentStatusDistribution.map((item) => (
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
