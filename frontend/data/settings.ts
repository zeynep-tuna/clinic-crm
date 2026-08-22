export const defaultRoleOptions = ["Admin", "Diş Hekimi", "Sekreter", "Hemşire"];

export const sessionTimeoutOptions = ["15 dakika", "30 dakika", "1 saat", "2 saat"];

export interface SettingsFormState {
  clinicName: string;
  phone: string;
  email: string;
  address: string;
  defaultRole: string;
  newUserApprovalRequired: boolean;
  accessDescription: string;
  appointmentReminders: boolean;
  paymentNotifications: boolean;
  systemNotifications: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: string;
}

export const initialSettingsFormState: SettingsFormState = {
  clinicName: "ClinicCRM Diş Kliniği",
  phone: "+90 555 000 11 22",
  email: "info@cliniccrm.com",
  address: "Atatürk Cad. No:123 Kadıköy / İstanbul",
  defaultRole: "Sekreter",
  newUserApprovalRequired: true,
  accessDescription:
    "Kullanıcıların sistem içinde erişebileceği alanlar role göre sınırlandırılır.",
  appointmentReminders: true,
  paymentNotifications: true,
  systemNotifications: true,
  twoFactorAuth: false,
  sessionTimeout: "30 dakika",
};
