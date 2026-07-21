export default function Topbar() {
  return (
    <header className="flex h-[84px] shrink-0 items-center justify-between border-b border-border bg-white px-8">
      <h1 className="text-xl font-semibold text-heading">Dashboard</h1>

      <div className="flex items-center gap-6">
        <input
          type="text"
          placeholder="Ara..."
          className="w-64 rounded-lg border border-border bg-page px-4 py-2 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          type="button"
          aria-label="Bildirimler"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:text-heading"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <div className="flex items-center gap-3 border-l border-border pl-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
            BT
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-heading">Beyza Tuncer</p>
            <p className="text-xs text-muted">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
