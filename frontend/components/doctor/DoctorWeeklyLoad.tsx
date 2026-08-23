import type { Appointment } from "@/lib/appointments-api";

const dayShortLabels = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

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
  isToday: boolean;
}

function buildWeeklyLoad(appointments: Appointment[]): WeeklyLoadItem[] {
  const monday = startOfWeek(new Date());
  const today = new Date();

  return dayShortLabels.map((label, index) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + index);

    const count = appointments.filter((appointment) => isSameDay(new Date(appointment.startAt), day)).length;

    return { key: day.toISOString(), label, count, isToday: isSameDay(day, today) };
  });
}

interface DoctorWeeklyLoadProps {
  appointments: Appointment[];
}

export default function DoctorWeeklyLoad({ appointments }: DoctorWeeklyLoadProps) {
  const activeAppointments = appointments.filter((appointment) => appointment.isActive);
  const weeklyLoad = buildWeeklyLoad(activeAppointments);
  const max = Math.max(1, ...weeklyLoad.map((item) => item.count));
  const weekTotal = weeklyLoad.reduce((total, item) => total + item.count, 0);

  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-[#0B1F55]">Haftalık Yoğunluk</h2>
          <p className="mt-0.5 text-xs text-[#667085]">Bu hafta planlanan randevu yoğunluğu</p>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-semibold text-[#5B4DE3]">
          Bu hafta {weekTotal} randevu
        </span>
      </div>

      <div className="mt-6 flex flex-1 items-end justify-between gap-1.5">
        {weeklyLoad.map((item) => {
          const barHeightPercent = item.count > 0 ? Math.max((item.count / max) * 100, 14) : 6;

          return (
            <div
              key={item.key}
              className={`flex flex-1 flex-col items-center gap-1.5 rounded-xl py-2 ${
                item.isToday ? "bg-[#F7F8FF]" : ""
              }`}
            >
              <span className={`text-[11px] font-semibold ${item.count > 0 ? "text-[#5B4DE3]" : "text-[#C7CBE0]"}`}>
                {item.count}
              </span>
              <div className="flex h-24 w-full items-end px-1">
                <div
                  className={`w-full rounded-t-md transition-[height] ${
                    item.count > 0 ? "bg-[#5B4DE3]" : "bg-[#EEF0FF]"
                  }`}
                  style={{ height: `${barHeightPercent}%` }}
                />
              </div>
              <span className={`text-[11px] ${item.isToday ? "font-bold text-[#5B4DE3]" : "text-[#667085]"}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
