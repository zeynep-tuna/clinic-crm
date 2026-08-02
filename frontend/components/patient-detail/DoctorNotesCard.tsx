import type { DoctorNote } from "@/data/patient-detail";

export default function DoctorNotesCard({ notes }: { notes: DoctorNote[] }) {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#EAF0F8] bg-white p-7 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#5B4DE3]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
              <path strokeLinecap="round" d="M8.5 10h7M8.5 13.5h7M8.5 17h4" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-[#0B1F55]">Doktor Notları</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Önceki not"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EAF0F8] text-[#667085] hover:bg-[#F7F8FF]"
          >
            &lt;
          </button>
          <button
            type="button"
            aria-label="Sonraki not"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EAF0F8] text-[#667085] hover:bg-[#F7F8FF]"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="mt-5 flex-1 space-y-5">
        {notes.map((note, index) => (
          <div
            key={`${note.date}-${index}`}
            className="border-b border-[#EAF0F8]/60 pb-5 last:border-0 last:pb-0"
          >
            <p className="text-sm font-semibold text-[#0B1F55]">
              {note.date} <span className="text-[#667085]">·</span> {note.doctor}
            </p>
            <p className="mt-2 text-sm text-[#667085]">{note.note}</p>
          </div>
        ))}

        {notes.length === 0 && (
          <p className="py-6 text-center text-sm text-[#667085]">Kayıtlı doktor notu yok.</p>
        )}
      </div>

      <div className="mt-5">
        <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-[#5B4DE3] hover:underline">
          Tüm notları görüntüle
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
