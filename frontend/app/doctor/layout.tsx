import DoctorSidebar from "@/components/doctor/DoctorSidebar";
import DoctorTopbar from "@/components/doctor/DoctorTopbar";

export default function DoctorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-[#F7F8FF]">
      <DoctorSidebar />

      <div className="flex flex-1 flex-col">
        <DoctorTopbar />

        <main className="flex-1 overflow-y-auto p-10">{children}</main>
      </div>
    </div>
  );
}
