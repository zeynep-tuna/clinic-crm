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

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth={1.75} className="h-7 w-7">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.3 2.3 4.7-5.1" />
    </svg>
  );
}

function validateEmail(value: string): string | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return "E-posta adresi zorunludur.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Geçerli bir e-posta adresi girin.";
  }

  return null;
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleEmailChange(value: string) {
    setEmail(value);
    if (error) {
      setError(null);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    console.log("Şifre sıfırlama talebi:", email);
    setSubmitted(true);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F8FF] px-4 py-12">
      <div className="pointer-events-none absolute -right-32 -top-32 z-0 h-104 w-104 rounded-full bg-[#DCD8FF] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 z-0 h-104 w-104 rounded-full bg-[#DCD8FF] opacity-70 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-[24px] border border-[#EEF2F8] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <HeartIcon />
            <span className="text-xl font-bold text-[#0B1F55]">ClinicCRM</span>
          </div>

          {submitted ? (
            <>
              <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#DCFCE7]">
                <CheckCircleIcon />
              </div>
              <h1 className="mt-4 text-2xl font-bold text-[#0B1F55]">
                Şifre sıfırlama bağlantısı gönderildi
              </h1>
              <p className="mt-2 text-sm text-[#667085]">
                Eğer bu e-posta sistemde kayıtlıysa, şifre sıfırlama adımları e-posta adresinize
                gönderilecektir.
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-6 text-2xl font-bold text-[#0B1F55]">Şifrenizi mi unuttunuz?</h1>
              <p className="mt-2 text-sm text-[#667085]">
                Kayıtlı e-posta adresinizi girin. Şifre sıfırlama bağlantısı demo ortamında
                gönderilmiş gibi gösterilecektir.
              </p>
            </>
          )}
        </div>

        {!submitted && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
                E-posta adresi
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => handleEmailChange(event.target.value)}
                placeholder="ornek@klinik.com"
                className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
                  error ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
                }`}
              />
              {error && <p className="mt-1 text-sm text-[#EF4444]">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#5B4DE3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
            >
              Sıfırlama Bağlantısı Gönder
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-[#667085]">
          <Link href="/login" className="font-medium text-[#5B4DE3] hover:underline">
            Giriş ekranına dön
          </Link>
        </p>
      </div>
    </div>
  );
}
