import SecretarySidebar from "@/components/secretary/SecretarySidebar";
import SecretaryTopbar from "@/components/secretary/SecretaryTopbar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function SecretaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard allowedRole="SECRETARY">
      <div className="flex h-screen bg-[#F7F8FF]">
        <SecretarySidebar />

        <div className="flex flex-1 flex-col">
          <SecretaryTopbar />

          <main className="flex-1 overflow-y-auto px-10 pt-6 pb-10">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
