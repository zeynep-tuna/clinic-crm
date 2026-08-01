import { doctorNotes } from "@/data/doctorDashboard";

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
      />
      <path strokeLinecap="round" d="M9 11h6M9 15h6" />
    </svg>
  );
}

export default function DoctorNotes() {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]">
      <h2 className="text-base font-semibold text-[#0B1F55]">Tedavi Notları</h2>

      <div className="mt-3 divide-y divide-[#EEF2F8]">
        {doctorNotes.map((note) => (
          <div key={note.id} className="flex items-start gap-3 py-3 first:pt-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FF] text-[#5B4DE3]">
              <NoteIcon />
            </span>
            <p className="text-sm text-[#0B1F55]">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
