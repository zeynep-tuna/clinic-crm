import { secretaryProfile } from "@/data/secretaryDashboard";

export default function SecretaryTopbar() {
  return (
    <header className="flex min-h-18 shrink-0 flex-wrap items-center justify-end gap-4 border-b border-[#E3E8F0]/60 bg-white px-6 py-3">
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path strokeLinecap="round" d="M20 20l-3.8-3.8" />
          </svg>
          <input
            type="text"
            placeholder="Genel arama..."
            className="w-56 rounded-xl border border-[#E3E8F0] bg-[#F7F8FF] py-1.5 pl-9 pr-4 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <button
          type="button"
          aria-label="Bildirimler"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E3E8F0] text-[#667085] transition-colors hover:bg-[#F7F8FF] hover:text-[#0B1F55]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <button
          type="button"
          className="flex items-center gap-2.5 rounded-lg border-l border-[#E3E8F0]/60 py-1 pl-4 pr-1.5 transition-colors hover:bg-[#F7F8FF]"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-sm font-semibold text-[#5B4DE3]">
            ZK
          </div>
          <div className="text-left leading-tight">
            <p className="text-sm font-medium text-[#0B1F55]">{secretaryProfile.name}</p>
            <p className="text-xs text-[#667085]">{secretaryProfile.role}</p>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4 shrink-0 text-[#667085]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </header>
  );
}
