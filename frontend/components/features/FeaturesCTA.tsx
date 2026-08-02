import Link from "next/link";

export default function FeaturesCTA() {
  return (
    <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_12px_rgba(16,24,40,0.06)] sm:flex-row sm:items-center">
      <p className="text-lg font-bold text-[#0B1F55]">
        ClinicCRM ile kliniğinizi dijital olarak yönetmeye başlayın.
      </p>

      <Link
        href="/demo-request"
        className="shrink-0 rounded-xl bg-[#5B4DE3] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:bg-[#4c3fd1]"
      >
        Demo Talep Et
      </Link>
    </div>
  );
}
