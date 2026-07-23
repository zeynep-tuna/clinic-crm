import ConsentFormSummaryCards from "@/components/consent-forms/ConsentFormSummaryCards";
import ConsentFormsTable from "@/components/consent-forms/ConsentFormsTable";

export default function ConsentFormsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F55]">Onam Formları</h2>
          <p className="mt-2 text-sm text-[#667085]">
            Hasta onam formlarını görüntüleyin, takip edin ve yönetin.
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)] hover:bg-[#4c3fd1]"
        >
          + Yeni Onam Formu Ekle
        </button>
      </div>

      <ConsentFormSummaryCards />

      <ConsentFormsTable />
    </div>
  );
}
