import { sessionTimeoutOptions, type SettingsFormState } from "@/data/settings";
import ToggleSwitch from "@/components/settings/ToggleSwitch";

interface SecuritySettingsSectionProps {
  form: SettingsFormState;
  updateField: <K extends keyof SettingsFormState>(key: K, value: SettingsFormState[K]) => void;
}

export default function SecuritySettingsSection({
  form,
  updateField,
}: SecuritySettingsSectionProps) {
  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h3 className="text-base font-bold text-[#0B1F55]">Güvenlik Ayarları</h3>
      <p className="mt-1 text-sm text-[#667085]">
        Admin hesabınızın oturum ve şifre güvenliğini yönetin.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-xl border border-[#EEF2F8] bg-[#F7F8FF] p-4">
            <ToggleSwitch
              label="İki aşamalı doğrulama"
              description="Giriş yaparken ek bir doğrulama adımı istenir."
              checked={form.twoFactorAuth}
              onChange={(checked) => updateField("twoFactorAuth", checked)}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
              Oturum Zaman Aşımı
            </label>
            <select
              value={form.sessionTimeout}
              onChange={(event) => updateField("sessionTimeout", event.target.value)}
              className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
            >
              {sessionTimeoutOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Mevcut Şifre</label>
            <input
              type="password"
              value={form.currentPassword}
              onChange={(event) => updateField("currentPassword", event.target.value)}
              className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Yeni Şifre</label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(event) => updateField("newPassword", event.target.value)}
              className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
              Yeni Şifre Tekrar
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(event) => updateField("confirmPassword", event.target.value)}
              className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="flex h-11 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.06)] transition-colors hover:bg-[#4c3fd1]"
        >
          Şifreyi Güncelle
        </button>
      </div>
    </div>
  );
}
