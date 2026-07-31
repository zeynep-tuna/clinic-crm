import ConsentFormsTable from "@/components/consent-forms/ConsentFormsTable";
import AddConsentFormModal from "@/components/consent-forms/AddConsentFormModal";

export default function ConsentFormsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F55]">Onam Formları</h2>
          <p className="mt-2 text-sm text-[#667085]">
            Diş kliniğinizdeki dijital onam formlarını, imza durumlarını ve dosya süreçlerini takip edin.
          </p>
        </div>

        <AddConsentFormModal />
      </div>

      <ConsentFormsTable />
    </div>
  );
}
