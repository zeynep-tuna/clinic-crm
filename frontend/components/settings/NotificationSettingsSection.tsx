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
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h3 className="text-base font-bold text-[#0B1F55]">Bildirim Ayarları</h3>
      <p className="mt-1 text-sm text-[#667085]">
        Diş kliniğinizdeki randevu, ödeme ve sistem bildirimlerini yönetin.
      </p>

      <div className="mt-4 divide-y divide-[#EEF2F8]">
        <div className="py-3.5 first:pt-0 last:pb-0">
          <ToggleSwitch
            label="Randevu hatırlatmaları"
            description="Yaklaşan randevular için hastalara ve diş hekimlerine hatırlatma gönderilir."
            checked={form.appointmentReminders}
            onChange={(checked) => updateField("appointmentReminders", checked)}
          />
        </div>

        <div className="py-3.5 first:pt-0 last:pb-0">
          <ToggleSwitch
            label="Ödeme bildirimleri"
            description="Ödeme alındığında veya beklemede olduğunda bildirim gönderilir."
            checked={form.paymentNotifications}
            onChange={(checked) => updateField("paymentNotifications", checked)}
          />
        </div>

        <div className="py-3.5 first:pt-0 last:pb-0">
          <ToggleSwitch
            label="Sistem bildirimleri"
            description="Sistem güncellemeleri ve genel duyurular için bildirim gönderilir."
            checked={form.systemNotifications}
            onChange={(checked) => updateField("systemNotifications", checked)}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="flex h-11 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.06)] transition-colors hover:bg-[#4c3fd1]"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}
