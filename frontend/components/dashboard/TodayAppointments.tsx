import { todayAppointments } from "@/data/dashboard";

export default function TodayAppointments() {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#E3E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#0B1F55]">Bugünkü Randevular</h3>
        <button
          type="button"
          className="rounded-xl border border-[#E3E8F0] px-4 py-2 text-sm font-medium text-[#0B1F55] hover:bg-[#F7F8FF]"
        >
          Tümünü Gör
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#E3E8F0] text-sm text-[#667085]">
              <th className="pb-3 font-medium">Saat</th>
              <th className="pb-3 font-medium">Hasta</th>
              <th className="pb-3 font-medium">Doktor</th>
              <th className="pb-3 font-medium">Bölüm</th>
              <th className="pb-3 font-medium">Durum</th>
            </tr>
          </thead>
          <tbody>
            {todayAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-[#E3E8F0]/60 last:border-0">
                <td className="py-5 text-sm text-[#0B1F55]">{appointment.time}</td>
                <td className="py-5 text-sm font-medium text-[#0B1F55]">
                  {appointment.patientName}
                </td>
                <td className="py-5 text-sm text-[#0B1F55]">{appointment.doctorName}</td>
                <td className="py-5 text-sm text-[#667085]">{appointment.department}</td>
                <td className="py-5">
                  <span
                    className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                      appointment.status === "Onaylandı"
                        ? "bg-[#DCFCE7] text-[#16A34A]"
                        : "bg-[#FEF3C7] text-[#F59E0B]"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-auto pt-8 text-center">
        <a href="#" className="text-sm font-medium text-[#5B4DE3] hover:underline">
          Tüm randevuları görüntüle →
        </a>
      </div>
    </div>
  );
}
