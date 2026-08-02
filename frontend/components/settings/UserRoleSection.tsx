import { defaultRoleOptions, type SettingsFormState } from "@/data/settings";
import ToggleSwitch from "@/components/settings/ToggleSwitch";

interface UserRoleSectionProps {
  form: SettingsFormState;
  updateField: <K extends keyof SettingsFormState>(key: K, value: SettingsFormState[K]) => void;
}

const roleInfoCards = [
  {
    title: "Admin",
    description: "Tüm sistem ayarlarına ve raporlara erişebilir.",
  },
  {
    title: "Diş Hekimi",
    description: "Kendi hastalarını, randevularını ve tedavi süreçlerini takip eder.",
  },
  {
    title: "Sekreter",
    description: "Hasta kayıtları, randevular, ödemeler ve onam süreçlerini yönetir.",
  },
];

export default function UserRoleSection({ form, updateField }: UserRoleSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <h3 className="text-base font-bold text-[#0B1F55]">Kullanıcı ve Rol Ayarları</h3>
        <p className="mt-1 text-sm text-[#667085]">
          Diş kliniğinizdeki kullanıcı rollerini ve erişim kurallarını yönetin.
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Varsayılan Rol</label>
            <select
              value={form.defaultRole}
              onChange={(event) => updateField("defaultRole", event.target.value)}
              className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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
              rows={2}
              className="w-full resize-none rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {roleInfoCards.map((role) => (
          <div
            key={role.title}
            className="rounded-[20px] border border-[#EAF0F8] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
          >
            <p className="text-sm font-semibold text-[#0B1F55]">{role.title}</p>
            <p className="mt-1 text-xs text-[#667085]">{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
