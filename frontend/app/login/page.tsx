import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F8FF] px-4 py-12">
      <div className="pointer-events-none absolute -right-32 -top-32 z-0 h-104 w-104 rounded-full bg-[#DCD8FF] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 z-0 h-104 w-104 rounded-full bg-[#DCD8FF] opacity-70 blur-3xl" />

      <LoginForm />
    </div>
  );
}
