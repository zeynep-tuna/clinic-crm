import DoctorProfileCard from "@/components/doctor/DoctorProfileCard";
import DoctorProfileForm from "@/components/doctor/DoctorProfileForm";
import DoctorWorkingHoursCard from "@/components/doctor/DoctorWorkingHoursCard";
import DoctorPasswordCard from "@/components/doctor/DoctorPasswordCard";

export default function DoctorProfilePage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F55]">Profilim</h1>
        <p className="mt-1 text-sm text-[#667085]">
          Doktor profil bilgilerinizi görüntüleyin ve güncelleyin.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr]">
        <DoctorProfileCard />
        <DoctorProfileForm />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <DoctorWorkingHoursCard />
        <DoctorPasswordCard />
      </div>
    </div>
  );
}
