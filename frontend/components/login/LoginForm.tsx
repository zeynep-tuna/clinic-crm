"use client";

import { useState } from "react";
import Link from "next/link";

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5B4DE3" strokeWidth={1.75} className="h-7 w-7">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#EEF0FF"
        d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12h2l1-2 2 4 1-2h2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
      />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.6 5.1A9.6 9.6 0 0 1 12 5c6 0 9.5 7 9.5 7a13.6 13.6 0 0 1-2.7 3.4M6.6 6.6C4 8.4 2.5 12 2.5 12s3.5 7 9.5 7a9.5 9.5 0 0 0 3.4-.6"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ email, password, rememberMe });
  }

  return (
    <div className="relative z-10 w-full max-w-md rounded-[20px] border border-[#EAF0F8] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <HeartIcon />
          <span className="text-xl font-bold text-[#0B1F55]">ClinicCRM</span>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-[#0B1F55]">Klinik Paneli Girişi</h1>
        <p className="mt-2 text-sm text-[#667085]">
          Hesabınıza giriş yaparak klinik yönetim paneline erişin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ornek@klinik.com"
            className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Şifre</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Şifrenizi girin"
              className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 pr-11 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#0B1F55]"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-[#0B1F55]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 rounded border-[#EAF0F8] accent-[#5B4DE3] focus:ring-2 focus:ring-[#5B4DE3]/20"
            />
            Beni Hatırla
          </label>

          <a href="#" className="text-sm font-medium text-[#5B4DE3] hover:underline">
            Şifremi Unuttum?
          </a>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
        >
          Giriş Yap
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#667085]">
        Hesabınız yok mu?{" "}
        <Link href="/demo-request" className="font-medium text-[#5B4DE3] hover:underline">
          Demo Talep Et
        </Link>
      </p>
    </div>
  );
}
