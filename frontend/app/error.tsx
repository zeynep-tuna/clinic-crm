"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8FF] p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-[24px] border border-[#EEF2F8] bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE2E2]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            className="h-7 w-7 text-[#EF4444]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5 21 19.5H3L12 3.5Z" />
            <path strokeLinecap="round" d="M12 10v3.5" />
            <circle cx="12" cy="16.3" r="0.9" fill="currentColor" stroke="none" />
          </svg>
        </div>

        <div>
          <h1 className="text-lg font-bold text-[#0B1F55]">Bir şeyler ters gitti</h1>
          <p className="mt-1 text-sm text-[#667085]">
            Sayfa yüklenirken beklenmeyen bir sorun oluştu. Tekrar deneyebilir veya ana sayfaya
            dönebilirsiniz.
          </p>
        </div>

        <div className="mt-2 flex w-full flex-col-reverse gap-2.5 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="flex h-11 items-center justify-center rounded-xl border border-[#EAF0F8] bg-white px-5 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            Tekrar Dene
          </button>
          <Link
            href="/"
            className="flex h-11 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#4c3fd1]"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
