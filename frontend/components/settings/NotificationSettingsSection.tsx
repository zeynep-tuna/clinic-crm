import type { SettingsFormState } from "@/data/settings";
import ToggleSwitch from "@/components/settings/ToggleSwitch";

interface NotificationSettingsSectionProps {
  form: SettingsFormState;
  updateField: <K extends keyof SettingsFormState>(key: K, value: SettingsFormState[K]) => void;
}

export default function NotificationSettingsSection({
  form,
  updateField,
}: NotificationSettingsSectionProps) {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h3 className="text-base font-bold text-[#0B1F55]">Bildirim Ayarları</h3>

      <div className="mt-6 space-y-5">
        <ToggleSwitch
          label="Randevu hatırlatmaları"
          description="Yaklaşan randevular için hastalara ve doktorlara hatırlatma gönderilir."
          checked={form.appointmentReminders}
          onChange={(checked) => updateField("appointmentReminders", checked)}
        />

        <ToggleSwitch
          label="Ödeme bildirimleri"
          description="Ödeme alındığında veya beklemede olduğunda bildirim gönderilir."
          checked={form.paymentNotifications}
          onChange={(checked) => updateField("paymentNotifications", checked)}
        />

        <ToggleSwitch
          label="Sistem bildirimleri"
          description="Sistem güncellemeleri ve genel duyurular için bildirim gönderilir."
          checked={form.systemNotifications}
          onChange={(checked) => updateField("systemNotifications", checked)}
        />
      </div>
    </div>
  );
}
