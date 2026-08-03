"use client";

type ConfirmDialogVariant = "danger" | "warning";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantIconWrapClass: Record<ConfirmDialogVariant, string> = {
  danger: "bg-[#FEE2E2] text-[#EF4444]",
  warning: "bg-[#FEF3C7] text-[#F59E0B]",
};

const variantConfirmButtonClass: Record<ConfirmDialogVariant, string> = {
  danger: "bg-[#EF4444] hover:bg-[#DC2626]",
  warning: "bg-[#F59E0B] hover:bg-[#D97706]",
};

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5 21 19.5H3L12 3.5Z" />
      <path strokeLinecap="round" d="M12 10v3.5" />
      <circle cx="12" cy="16.3" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Vazgeç",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-[24px] border border-[#EEF2F8] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
      >
        <div className="flex items-start gap-3.5">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${variantIconWrapClass[variant]}`}
          >
            <WarningIcon />
          </span>
          <div className="min-w-0">
            <h2 id="confirm-dialog-title" className="text-base font-bold text-[#0B1F55]">
              {title}
            </h2>
            <p id="confirm-dialog-description" className="mt-1.5 text-sm text-[#667085]">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-11 items-center justify-center rounded-xl border border-[#EAF0F8] bg-white px-5 text-sm font-semibold text-[#0B1F55] transition-colors hover:bg-[#F7F8FF]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition-colors ${variantConfirmButtonClass[variant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
