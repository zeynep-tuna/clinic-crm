import SecretarySettingsProfileCard from "@/components/secretary/SecretarySettingsProfileCard";
import SecretarySettingsForm from "@/components/secretary/SecretarySettingsForm";
import SecretaryNotificationSettings from "@/components/secretary/SecretaryNotificationSettings";
import SecretaryWorkPreferences from "@/components/secretary/SecretaryWorkPreferences";
import SecretarySecuritySettings from "@/components/secretary/SecretarySecuritySettings";

export default function SecretarySettingsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Ayarlar</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Sekreter profil bilgilerinizi, bildirim tercihlerinizi ve çalışma ayarlarınızı yönetin.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr]">
        <SecretarySettingsProfileCard />
        <SecretarySettingsForm />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <SecretaryNotificationSettings />
        <SecretaryWorkPreferences />
        <SecretarySecuritySettings />
      </div>
    </div>
  );
}
