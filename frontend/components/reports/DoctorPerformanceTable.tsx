import type { Doctor } from "@/lib/doctors-api";
import type { Appointment } from "@/lib/appointments-api";
import type { Payment } from "@/lib/payments-api";

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

interface DoctorPerformanceTableProps {
  doctors: Doctor[];
  appointments: Appointment[];
  payments: Payment[];
}

export default function DoctorPerformanceTable({ doctors, appointments, payments }: DoctorPerformanceTableProps) {
  const activeDoctors = doctors.filter((doctor) => doctor.isActive);
  const activeAppointments = appointments.filter((appointment) => appointment.isActive);
  const activePayments = payments.filter((payment) => payment.isActive);

  const rows = activeDoctors.map((doctor) => {
    const doctorAppointments = activeAppointments.filter((appointment) => appointment.doctorId === doctor.id);
    const doctorAppointmentIds = new Set(doctorAppointments.map((appointment) => appointment.id));

    const totalRevenue = activePayments
      .filter((payment) => payment.appointmentId !== null && doctorAppointmentIds.has(payment.appointmentId))
      .reduce((total, payment) => {
        const value = Number(payment.amount);
        return total + (Number.isFinite(value) ? value : 0);
      }, 0);

    return {
      id: doctor.id,
      fullName: doctor.fullName,
      specialty: doctor.specialty ?? "—",
      totalAppointments: doctorAppointments.length,
      totalRevenue,
    };
  });

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h3 className="text-base font-bold text-[#0B1F55]">Hekim Özeti</h3>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-150 table-fixed text-left">
          <thead>
            <tr className="border-b border-[#EAF0F8]/70 text-xs font-semibold tracking-wide text-[#667085] uppercase">
              <th className="w-56 pb-2.5 pr-4 font-medium">Hekim</th>
              <th className="w-40 pb-2.5 pr-4 font-medium">Uzmanlık</th>
              <th className="w-32 pb-2.5 pr-4 text-center font-medium">Toplam Randevu</th>
              <th className="w-36 pb-2.5 font-medium">Toplam Gelir</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((doctor) => (
              <tr
                key={doctor.id}
                className="border-b border-[#EAF0F8]/60 transition-colors last:border-0 hover:bg-[#F8F9FF]"
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
                <td className="py-4 text-sm font-semibold text-[#0B1F55]">
                  {formatCurrency(doctor.totalRevenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
