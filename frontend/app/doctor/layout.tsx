import DoctorSidebar from "@/components/doctor/DoctorSidebar";
import DoctorTopbar from "@/components/doctor/DoctorTopbar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function DoctorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard allowedRole="DOCTOR">
      <div className="flex h-screen bg-[#F7F8FF]">
        <DoctorSidebar />

        <div className="flex flex-1 flex-col">
          <DoctorTopbar />

          <main className="flex-1 overflow-y-auto p-10">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
