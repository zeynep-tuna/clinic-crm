import { patientGrowth } from "@/data/reports";

const VIEW_WIDTH = 1100;
const VIEW_HEIGHT = 160;
const TOP_PADDING = 16;

export default function PatientGrowthChart() {
  const maxCount = Math.max(...patientGrowth.map((point) => point.count));
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
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-bold text-[#0B1F55]">Hasta Artış Grafiği</h3>
        <p className="text-sm text-[#667085]">
          Bu ay <span className="font-semibold text-[#5B4DE3]">{last.count}</span> yeni hasta
        </p>
      </div>

      <div className="mt-6">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          preserveAspectRatio="none"
          className="h-40 w-full"
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
            <circle key={point.month} cx={point.x} cy={point.y} r={4} fill="#5B4DE3" />
          ))}
        </svg>

        <div className="mt-2 flex justify-between text-xs text-[#667085]">
          {patientGrowth.map((point) => (
            <span key={point.month}>{point.month}</span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-[#667085]">
        {first.month}: <span className="font-medium text-[#0B1F55]">{first.count}</span> hasta →{" "}
        {last.month}: <span className="font-medium text-[#0B1F55]">{last.count}</span> hasta
      </p>
    </div>
  );
}
