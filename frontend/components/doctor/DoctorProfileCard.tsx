import { doctorProfileInfo } from "@/data/doctorProfile";

export default function DoctorProfileCard() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-xl font-bold text-[#5B4DE3]">
          EK
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-bold text-[#0B1F55]">{doctorProfileInfo.fullName}</p>
            <span className="inline-block rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-semibold text-[#16A34A]">
              {doctorProfileInfo.status}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-[#667085]">
            {doctorProfileInfo.role} · {doctorProfileInfo.specialty}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-xl border border-[#EAF0F8] bg-[#F7F8FF] px-4 py-2 text-center">
          <p className="text-xs text-[#667085]">Deneyim</p>
          <p className="text-sm font-semibold text-[#0B1F55]">{doctorProfileInfo.experience}</p>
        </div>
        <div className="rounded-xl border border-[#EAF0F8] bg-[#F7F8FF] px-4 py-2 text-center">
          <p className="text-xs text-[#667085]">Hasta Sayısı</p>
          <p className="text-sm font-semibold text-[#0B1F55]">{doctorProfileInfo.patientCount}</p>
        </div>
        <div className="rounded-xl border border-[#EAF0F8] bg-[#F7F8FF] px-4 py-2 text-center">
          <p className="text-xs text-[#667085]">Bugünkü Randevu</p>
          <p className="text-sm font-semibold text-[#0B1F55]">{doctorProfileInfo.todayAppointments}</p>
        </div>
      </div>
    </div>
  );
}
