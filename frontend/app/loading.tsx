export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8FF] p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-[24px] border border-[#EEF2F8] bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 animate-spin rounded-full border-4 border-[#EEF0FF] border-t-[#5B4DE3]" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            className="h-6 w-6 text-[#5B4DE3]"
          >
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </div>

        <div>
          <h1 className="text-lg font-bold text-[#0B1F55]">ClinicCRM yükleniyor</h1>
          <p className="mt-1 text-sm text-[#667085]">Klinik verileri hazırlanıyor, lütfen bekleyin.</p>
        </div>
      </div>
    </div>
  );
}
