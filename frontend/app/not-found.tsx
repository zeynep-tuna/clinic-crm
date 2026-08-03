import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8FF] p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-[24px] border border-[#EEF2F8] bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <p className="text-5xl font-bold text-[#5B4DE3]">404</p>

        <div>
          <h1 className="text-lg font-bold text-[#0B1F55]">Sayfa bulunamadı</h1>
          <p className="mt-1 text-sm text-[#667085]">
            Aradığınız sayfa kaldırılmış, taşınmış veya hiç oluşturulmamış olabilir.
          </p>
        </div>

        <Link
          href="/"
          className="mt-2 flex h-11 items-center justify-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#4c3fd1]"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
