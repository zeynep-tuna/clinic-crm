import type { Appointment } from "@/lib/appointments-api";

const dayShortLabels = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

function startOfWeek(date: Date) {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = result.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diffToMonday);
  return result;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

interface WeeklyLoadItem {
  key: string;
  label: string;
  count: number;
}

function buildWeeklyLoad(appointments: Appointment[]): WeeklyLoadItem[] {
  const monday = startOfWeek(new Date());

  return dayShortLabels.map((label, index) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + index);

    const count = appointments.filter((appointment) => isSameDay(new Date(appointment.startAt), day)).length;

    return { key: day.toISOString(), label, count };
  });
}

interface DoctorWeeklyLoadProps {
  appointments: Appointment[];
}

export default function DoctorWeeklyLoad({ appointments }: DoctorWeeklyLoadProps) {
  const weeklyLoad = buildWeeklyLoad(appointments.filter((appointment) => appointment.isActive));
  const max = Math.max(1, ...weeklyLoad.map((item) => item.count));

  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Haftalık Yoğunluk</h2>
      <p className="mt-0.5 text-xs text-[#667085]">Bu hafta planlanan randevu yoğunluğu</p>

      <div className="mt-5 flex flex-1 items-end justify-between gap-2">
        {weeklyLoad.map((item) => (
          <div key={item.key} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[#5B4DE3]">{item.count}</span>
            <div className="flex h-24 w-full items-end">
              <div
                className="w-full rounded-t-md bg-[#5B4DE3]"
                style={{ height: `${(item.count / max) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-[#667085]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
