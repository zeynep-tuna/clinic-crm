import { doctorPerformance } from "@/data/reports";

function formatCurrency(amount: number) {
  return `₺${amount.toLocaleString("tr-TR")}`;
}

function getInitials(fullName: string) {
  const nameWithoutTitle = fullName.replace(/^Dr\.\s*/i, "").trim();
  const parts = nameWithoutTitle.split(/\s+/).filter(Boolean);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

export default function DoctorPerformanceTable() {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h3 className="text-base font-bold text-[#0B1F55]">Doktor Performansı</h3>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed text-left">
          <thead>
            <tr className="border-b border-[#E3E8F0] text-sm text-[#667085]">
              <th className="w-56 pb-3 pr-4 font-medium">Doktor Adı</th>
              <th className="w-40 pb-3 pr-4 font-medium">Uzmanlık</th>
              <th className="w-32 pb-3 pr-4 text-center font-medium">Toplam Randevu</th>
              <th className="w-36 pb-3 pr-4 font-medium">Toplam Gelir</th>
              <th className="pb-3 font-medium">Performans</th>
            </tr>
          </thead>
          <tbody>
            {doctorPerformance.map((doctor) => (
              <tr key={doctor.id} className="border-b border-[#E3E8F0]/60 last:border-0">
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
                      {getInitials(doctor.fullName)}
                    </div>
                    <span className="truncate text-sm font-medium text-[#0B1F55]">
                      {doctor.fullName}
                    </span>
                  </div>
                </td>
                <td className="truncate py-5 pr-4 text-sm text-[#0B1F55]">{doctor.specialty}</td>
                <td className="py-5 pr-4 text-center text-sm text-[#0B1F55]">
                  {doctor.totalAppointments}
                </td>
                <td className="py-5 pr-4 text-sm font-medium text-[#0B1F55]">
                  {formatCurrency(doctor.totalRevenue)}
                </td>
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-full max-w-32 rounded-full bg-[#F3F4F6]">
                      <div
                        className="h-2 rounded-full bg-[#5B4DE3]"
                        style={{ width: `${doctor.performance}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#0B1F55]">
                      %{doctor.performance}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
