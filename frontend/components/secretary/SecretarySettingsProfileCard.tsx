import { secretarySettingsProfile } from "@/data/secretarySettings";

export default function SecretarySettingsProfileCard() {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-lg font-bold text-[#5B4DE3]">
          ZK
        </div>

        <div className="min-w-0">
          <p className="truncate text-base font-bold text-[#0B1F55]">{secretarySettingsProfile.fullName}</p>
          <p className="text-sm text-[#667085]">{secretarySettingsProfile.role}</p>
        </div>
      </div>

      <span className="mt-3 inline-block rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#16A34A]">
        {secretarySettingsProfile.workStatus}
      </span>

      <div className="mt-4 space-y-2 border-t border-[#E3E8F0] pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#667085]">Bugünkü İşlem</span>
          <span className="text-sm font-semibold text-[#0B1F55]">{secretarySettingsProfile.todayTasks}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#667085]">Yönetilen Randevu</span>
          <span className="text-sm font-semibold text-[#0B1F55]">
            {secretarySettingsProfile.managedAppointments}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#667085]">Bekleyen Görev</span>
          <span className="text-sm font-semibold text-[#0B1F55]">{secretarySettingsProfile.pendingTasks}</span>
        </div>
      </div>
    </div>
  );
}
