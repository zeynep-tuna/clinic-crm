export interface DoctorProfileInfo {
  fullName: string;
  role: string;
  specialty: string;
  phone: string;
  email: string;
  clinic: string;
  experience: string;
  patientCount: number;
  todayAppointments: number;
  status: string;
  bio: string;
}

export const doctorProfileInfo: DoctorProfileInfo = {
  fullName: "Dr. Elif Kaya",
  role: "Doktor",
  specialty: "Diş Hekimliği",
  phone: "+90 555 111 22 33",
  email: "elif.kaya@cliniccrm.com",
  clinic: "ClinicCRM Sağlık Merkezi",
  experience: "8 yıl",
  patientCount: 186,
  todayAppointments: 12,
  status: "Aktif",
  bio: "Diş sağlığı, koruyucu tedaviler ve hasta takip süreçlerinde deneyimli diş hekimi.",
};

export interface DoctorWorkingHourItem {
  day: string;
  hours: string;
  isClosed: boolean;
}

export const doctorWorkingHours: DoctorWorkingHourItem[] = [
  { day: "Pazartesi", hours: "09:00 - 17:00", isClosed: false },
  { day: "Salı", hours: "09:00 - 17:00", isClosed: false },
  { day: "Çarşamba", hours: "09:00 - 17:00", isClosed: false },
  { day: "Perşembe", hours: "09:00 - 17:00", isClosed: false },
  { day: "Cuma", hours: "09:00 - 16:00", isClosed: false },
  { day: "Cumartesi", hours: "Kapalı", isClosed: true },
  { day: "Pazar", hours: "Kapalı", isClosed: true },
];
