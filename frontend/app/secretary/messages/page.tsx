import SecretaryMessageSummaryCards from "@/components/secretary/SecretaryMessageSummaryCards";
import SecretaryMessagesPanel from "@/components/secretary/SecretaryMessagesPanel";

export default function SecretaryMessagesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#E3E8F0] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#DBEAFE] text-[#2563EB]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4 3.5V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"
              />
            </svg>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#0B1F55]">
              Hasta, doktor ve klinik içi iletişimi tek ekrandan yönetin.
            </p>
            <p className="mt-0.5 text-sm text-[#667085]">
              Öncelikli konuşmaları takip edin ve hızlı yanıt verin.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-xl bg-[#5B4DE3] px-4 py-2 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)] transition-colors hover:bg-[#4c3fd1]"
        >
          + Yeni Mesaj
        </button>
      </div>

      <SecretaryMessageSummaryCards />

      <SecretaryMessagesPanel />
    </div>
  );
}
