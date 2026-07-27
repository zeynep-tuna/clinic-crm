import SecretaryMessageSummaryCards from "@/components/secretary/SecretaryMessageSummaryCards";
import SecretaryMessagesPanel from "@/components/secretary/SecretaryMessagesPanel";

export default function SecretaryMessagesPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Mesajlar</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Hasta, doktor ve klinik içi mesajları görüntüleyin ve takip edin.
        </p>
      </div>

      <SecretaryMessageSummaryCards />

      <SecretaryMessagesPanel />
    </div>
  );
}
