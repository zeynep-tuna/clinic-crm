import DoctorMessagesPanel from "@/components/doctor/DoctorMessagesPanel";

export default function DoctorMessagesPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Mesajlar</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Sekreter ve klinik yönetimiyle olan mesajlarınızı takip edin ve yanıtlayın.
        </p>
      </div>

      <DoctorMessagesPanel />
    </div>
  );
}
