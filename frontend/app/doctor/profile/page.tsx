import DoctorProfileCard from "@/components/doctor/DoctorProfileCard";
import DoctorProfileTabs from "@/components/doctor/DoctorProfileTabs";

export default function DoctorProfilePage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Profilim</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Diş hekimi profil bilgilerinizi, çalışma saatlerinizi ve güvenlik ayarlarınızı yönetin.
        </p>
      </div>

      <DoctorProfileCard />

      <DoctorProfileTabs />
    </div>
  );
}
