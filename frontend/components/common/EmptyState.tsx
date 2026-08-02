import type { ReactNode } from "react";

type EmptyStateVariant = "empty" | "search";

function InboxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 12h4.2l1.3 2.5h5.5l1.3-2.5h4.2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.5 6.5h13l2 5.5v6a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 3.5 18v-6l2-5.5Z"
      />
    </svg>
  );
}

function SearchOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path strokeLinecap="round" d="M20 20l-4.3-4.3" />
    </svg>
  );
}

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ variant = "empty", icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-[20px] border border-[#EEF2F8] px-6 py-14 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF0FF] text-[#5B4DE3]">
        {icon ?? (variant === "search" ? <SearchOffIcon /> : <InboxIcon />)}
      </span>
      <p className="text-base font-bold text-[#0B1F55]">{title}</p>
      <p className="mt-1.5 max-w-sm text-sm text-[#667085]">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
