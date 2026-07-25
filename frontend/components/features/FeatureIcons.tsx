export function PatientIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-7 w-7">
      <circle cx="12" cy="8" r="3.5" />
      <path strokeLinecap="round" d="M5 20c.7-3.8 3.4-6 7-6s6.3 2.2 7 6" />
    </svg>
  );
}

export function AppointmentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-7 w-7">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M4 10h16M8 3v4M16 3v4" />
      <path strokeLinecap="round" d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
    </svg>
  );
}

export function DoctorPanelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-7 w-7">
      <circle cx="9" cy="8" r="3" />
      <path strokeLinecap="round" d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5" />
      <path strokeLinecap="round" d="M15.5 5.5a3 3 0 0 1 0 5.8M18 19c-.4-2.3-1.5-4-3.2-4.8" />
    </svg>
  );
}

export function PaymentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-7 w-7">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path strokeLinecap="round" d="M3 10h18" />
      <path strokeLinecap="round" d="M7 15h4" />
    </svg>
  );
}

export function ConsentFormIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-7 w-7">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 3.5h5l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 6 19V5a1.5 1.5 0 0 1 1.5-1.5Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 3.5V8h4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l1.8 1.8L15 11.5" />
    </svg>
  );
}

export function ReportingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-7 w-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V10M10 20V4M16 20v-7M4 20h16" />
    </svg>
  );
}
