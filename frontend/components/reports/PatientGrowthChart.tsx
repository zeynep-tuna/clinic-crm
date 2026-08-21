import type { Patient } from "@/lib/patients-api";

const monthLabelFormatter = new Intl.DateTimeFormat("tr-TR", { month: "long" });

const VIEW_WIDTH = 1100;
const VIEW_HEIGHT = 130;
const TOP_PADDING = 16;

interface PatientGrowthPoint {
  key: string;
  month: string;
  count: number;
}

function buildLastSixMonths(patients: Patient[]): PatientGrowthPoint[] {
  const now = new Date();
  const months: PatientGrowthPoint[] = [];

  for (let offset = 5; offset >= 0; offset -= 1) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const label = monthLabelFormatter.format(monthDate);

    const count = patients.filter((patient) => {
      const createdAt = new Date(patient.createdAt);
      return createdAt.getFullYear() === year && createdAt.getMonth() === month;
    }).length;

    months.push({ key: `${year}-${month}`, month: label.charAt(0).toUpperCase() + label.slice(1), count });
  }

  return months;
}

interface PatientGrowthChartProps {
  patients: Patient[];
}

export default function PatientGrowthChart({ patients }: PatientGrowthChartProps) {
  const patientGrowth = buildLastSixMonths(patients);
  const maxCount = Math.max(1, ...patientGrowth.map((point) => point.count));
  const stepX = VIEW_WIDTH / (patientGrowth.length - 1);

  const points = patientGrowth.map((point, index) => {
    const x = index * stepX;
    const y = VIEW_HEIGHT - (point.count / maxCount) * (VIEW_HEIGHT - TOP_PADDING);
    return { x, y, ...point };
  });

  const linePath = points.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPath = `0,${VIEW_HEIGHT} ${linePath} ${VIEW_WIDTH},${VIEW_HEIGHT}`;

  const first = points[0];
  const last = points[points.length - 1];

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-bold text-[#0B1F55]">Hasta Artış Grafiği</h3>
        <span className="inline-flex items-center rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-semibold text-[#5B4DE3]">
          Bu ay {last.count} yeni hasta
        </span>
      </div>

      <div className="mt-5">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          preserveAspectRatio="none"
          className="h-32 w-full"
        >
          <polygon points={areaPath} fill="#5B4DE3" fillOpacity={0.1} />
          <polyline
            points={linePath}
            fill="none"
            stroke="#5B4DE3"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((point) => (
            <circle
              key={point.key}
              cx={point.x}
              cy={point.y}
              r={3.5}
              fill="#5B4DE3"
              stroke="white"
              strokeWidth={1.5}
            />
          ))}
        </svg>

        <div className="mt-2 flex justify-between text-xs text-[#667085]">
          {patientGrowth.map((point) => (
            <span key={point.key}>{point.month}</span>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-[#667085]">
        Son 6 ayda yeni hasta sayısı{" "}
        <span className="font-medium text-[#0B1F55]">{first.count}</span>&apos;den{" "}
        <span className="font-medium text-[#0B1F55]">{last.count}</span>&apos;e değişti.
      </p>
    </div>
  );
}
