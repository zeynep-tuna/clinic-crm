import Link from "next/link";
import { doctorPerformance } from "@/data/reports";

const avatarPalette = [
  "bg-[#EEF0FF] text-[#5B4DE3]",
  "bg-[#DBEAFE] text-[#2563EB]",
  "bg-[#CCFBF1] text-[#0F766E]",
  "bg-[#FFEDD5] text-[#C2410C]",
  "bg-[#F3F4F6] text-[#475467]",
];

function getAvatarColor(id: string) {
  const sum = id.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return avatarPalette[sum % avatarPalette.length];
}

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
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h3 className="text-base font-bold text-[#0B1F55]">Hekim Performansı</h3>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-236 table-fixed text-left">
          <thead>
            <tr className="border-b border-[#E3E8F0]/70 text-xs font-semibold tracking-wide text-[#667085] uppercase">
              <th className="w-56 pb-2.5 pr-4 font-medium">Hekim</th>
              <th className="w-40 pb-2.5 pr-4 font-medium">Uzmanlık</th>
              <th className="w-32 pb-2.5 pr-4 text-center font-medium">Toplam Randevu</th>
              <th className="w-36 pb-2.5 pr-4 font-medium">Toplam Gelir</th>
              <th className="w-40 pb-2.5 pr-4 font-medium">
                <span className="group relative inline-flex items-center gap-1 normal-case">
                  <span className="uppercase">Performans</span>
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#98A2B3] text-[9px] font-bold text-[#98A2B3]">
                    i
                  </span>
                  <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-lg bg-[#0B1F55] px-3 py-2 text-[11px] font-normal leading-snug text-white opacity-0 shadow-[0_4px_12px_rgba(16,24,40,0.18)] transition-opacity duration-150 group-hover:opacity-100">
                    Performans; tamamlanan randevu oranı, hasta devamlılığı ve gelir katkısı dikkate
                    alınarak hesaplanan demo skordur.
                  </span>
                </span>
              </th>
              <th className="w-32 pb-2.5 font-medium">Detay</th>
            </tr>
          </thead>
          <tbody>
            {doctorPerformance.map((doctor) => (
              <tr
                key={doctor.id}
                className="group border-b border-[#E3E8F0]/60 transition-colors last:border-0 hover:bg-[#F8F9FF]"
              >
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarColor(doctor.id)}`}
                    >
                      {getInitials(doctor.fullName)}
                    </div>
                    <span className="truncate text-sm font-medium text-[#0B1F55]">
                      {doctor.fullName}
                    </span>
                  </div>
                </td>
                <td className="truncate py-4 pr-4 text-sm text-[#0B1F55]">{doctor.specialty}</td>
                <td className="py-4 pr-4 text-center text-sm text-[#0B1F55]">
                  {doctor.totalAppointments}
                </td>
                <td className="py-4 pr-4 text-sm font-semibold text-[#0B1F55]">
                  {formatCurrency(doctor.totalRevenue)}
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-full max-w-24 rounded-full bg-[#F3F4F6]">
                      <div
                        className="h-2 rounded-full bg-[#5B4DE3]"
                        style={{ width: `${doctor.performance}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-sm font-medium text-[#0B1F55]">
                      %{doctor.performance}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <Link
                    href="/doctors"
                    className="text-sm font-medium text-[#5B4DE3] transition-colors group-hover:underline"
                  >
                    Detay raporu →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
