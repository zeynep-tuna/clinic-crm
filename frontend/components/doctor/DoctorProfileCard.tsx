import { doctorProfileInfo } from "@/data/doctorProfile";

export default function DoctorProfileCard() {
  return (
    <div className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF0FF] text-2xl font-bold text-[#5B4DE3]">
          EK
        </div>

        <p className="mt-4 text-lg font-bold text-[#0B1F55]">{doctorProfileInfo.fullName}</p>
        <p className="text-sm text-[#667085]">
          {doctorProfileInfo.role} / {doctorProfileInfo.specialty}
        </p>

        <span className="mt-3 inline-block rounded-full bg-[#DCFCE7] px-3.5 py-1.5 text-xs font-semibold text-[#16A34A]">
          {doctorProfileInfo.status}
        </span>
      </div>

      <div className="mt-6 space-y-3 border-t border-[#E3E8F0] pt-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#667085]">Deneyim</span>
          <span className="text-sm font-semibold text-[#0B1F55]">{doctorProfileInfo.experience}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#667085]">Hasta Sayısı</span>
          <span className="text-sm font-semibold text-[#0B1F55]">{doctorProfileInfo.patientCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#667085]">Bugünkü Randevu</span>
          <span className="text-sm font-semibold text-[#0B1F55]">{doctorProfileInfo.todayAppointments}</span>
        </div>
      </div>
    </div>
  );
}
