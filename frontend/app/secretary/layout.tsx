import SecretarySidebar from "@/components/secretary/SecretarySidebar";
import SecretaryTopbar from "@/components/secretary/SecretaryTopbar";

export default function SecretaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-[#F7F8FF]">
      <SecretarySidebar />

      <div className="flex flex-1 flex-col">
        <SecretaryTopbar />

        <main className="flex-1 overflow-y-auto p-10">{children}</main>
      </div>
    </div>
  );
}
