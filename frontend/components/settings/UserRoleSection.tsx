import { defaultRoleOptions, type SettingsFormState } from "@/data/settings";
import ToggleSwitch from "@/components/settings/ToggleSwitch";

interface UserRoleSectionProps {
  form: SettingsFormState;
  updateField: <K extends keyof SettingsFormState>(key: K, value: SettingsFormState[K]) => void;
}

export default function UserRoleSection({ form, updateField }: UserRoleSectionProps) {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h3 className="text-base font-bold text-[#0B1F55]">Kullanıcı ve Rol Ayarları</h3>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Varsayılan Rol</label>
          <select
            value={form.defaultRole}
            onChange={(event) => updateField("defaultRole", event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          >
            {defaultRoleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <ToggleSwitch
          label="Yeni kullanıcı onayı"
          description="Yeni eklenen kullanıcılar admin onayı bekler."
          checked={form.newUserApprovalRequired}
          onChange={(checked) => updateField("newUserApprovalRequired", checked)}
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
            Rol Bazlı Erişim Açıklaması
          </label>
          <textarea
            value={form.accessDescription}
            onChange={(event) => updateField("accessDescription", event.target.value)}
            rows={3}
            className="w-full resize-y rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>
      </div>
    </div>
  );
}
