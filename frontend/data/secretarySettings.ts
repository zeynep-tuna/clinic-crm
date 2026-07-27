export interface SecretarySettingsProfile {
  fullName: string;
  role: string;
  phone: string;
  email: string;
  clinic: string;
  department: string;
  workStatus: string;
  todayTasks: number;
  managedAppointments: number;
  pendingTasks: number;
  note: string;
}

export const secretarySettingsProfile: SecretarySettingsProfile = {
  fullName: "Zeynep Kaya",
  role: "Sekreter",
  phone: "+90 555 222 33 44",
  email: "zeynep.kaya@cliniccrm.com",
  clinic: "ClinicCRM Sağlık Merkezi",
  department: "Ön Büro",
  workStatus: "Aktif",
  todayTasks: 27,
  managedAppointments: 15,
  pendingTasks: 6,
  note: "Hasta kayıtları, randevu planlama ve klinik içi operasyon süreçlerinden sorumludur.",
};

export interface SecretaryNotificationPreference {
  id: string;
  label: string;
  enabled: boolean;
}

export const secretaryNotificationPreferences: SecretaryNotificationPreference[] = [
  { id: "new-appointment", label: "Yeni randevu bildirimi", enabled: true },
  { id: "payment-reminder", label: "Ödeme hatırlatması", enabled: true },
  { id: "consent-alert", label: "Onam formu uyarısı", enabled: true },
  { id: "doctor-schedule-change", label: "Doktor takvimi değişikliği", enabled: false },
  { id: "end-of-day-report", label: "Gün sonu raporu bildirimi", enabled: true },
];

export interface SecretaryWorkPreferencesData {
  defaultAppointmentDuration: string;
  dailyView: string;
  patientListView: string;
  autoReminder: boolean;
}

export const secretaryWorkPreferences: SecretaryWorkPreferencesData = {
  defaultAppointmentDuration: "30 dakika",
  dailyView: "Bugün",
  patientListView: "Tablo",
  autoReminder: true,
};
