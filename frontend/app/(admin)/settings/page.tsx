import SettingsForm from "@/components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F55]">Ayarlar</h2>
        <p className="mt-2 text-sm text-[#667085]">
          Klinik, kullanıcı, bildirim ve güvenlik ayarlarını yönetin.
        </p>
      </div>

      <SettingsForm />
    </div>
  );
}
