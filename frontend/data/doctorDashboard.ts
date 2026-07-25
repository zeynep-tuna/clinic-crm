export interface DoctorProfile {
  name: string;
  role: string;
}

export const doctorProfile: DoctorProfile = {
  name: "Dr. Elif Kaya",
  role: "Doktor",
};

export type DoctorStatIcon = "appointments" | "patients" | "notes" | "completed";

export interface DoctorStatCardData {
  id: string;
  title: string;
  value: string;
  icon: DoctorStatIcon;
  linkLabel: string;
}

export const doctorStatCards: DoctorStatCardData[] = [
  {
    id: "today-appointments",
    title: "Bugünkü Randevular",
    value: "12",
    icon: "appointments",
    linkLabel: "Tüm randevuları gör →",
  },
  {
    id: "total-patients",
    title: "Toplam Hasta",
    value: "186",
    icon: "patients",
    linkLabel: "Tüm hastaları gör →",
  },
  {
    id: "pending-notes",
    title: "Bekleyen Notlar",
    value: "5",
    icon: "notes",
    linkLabel: "Notları gör →",
  },
  {
    id: "completed-exams",
    title: "Tamamlanan Muayene",
    value: "9",
    icon: "completed",
    linkLabel: "Geçmişi gör →",
  },
];

export type DoctorAppointmentStatus = "Onaylandı" | "Bekliyor" | "Tamamlandı";

export interface DoctorTodayAppointment {
  id: string;
  time: string;
  patientName: string;
  treatment: string;
  status: DoctorAppointmentStatus;
}

export const doctorTodayAppointments: DoctorTodayAppointment[] = [
  {
    id: "1",
    time: "09:00",
    patientName: "Ayşe Demir",
    treatment: "Diş Kontrolü",
    status: "Onaylandı",
  },
  {
    id: "2",
    time: "10:30",
    patientName: "Mehmet Kaya",
    treatment: "Dolgu Tedavisi",
    status: "Bekliyor",
  },
  {
    id: "3",
    time: "11:15",
    patientName: "Zeynep Aydın",
    treatment: "Diş Temizliği",
    status: "Onaylandı",
  },
  {
    id: "4",
    time: "14:00",
    patientName: "Ali Yıldız",
    treatment: "Kontrol Muayenesi",
    status: "Bekliyor",
  },
];

export interface DoctorNote {
  id: string;
  text: string;
}

export const doctorNotes: DoctorNote[] = [
  {
    id: "1",
    text: "Ayşe Demir için diş temizliği sonrası kontrol notu eklendi.",
  },
  {
    id: "2",
    text: "Mehmet Kaya için dolgu tedavisi planı güncellendi.",
  },
  {
    id: "3",
    text: "Zeynep Aydın için düzenli kontrol önerildi.",
  },
];

export interface DoctorWeeklyLoadItem {
  day: string;
  count: number;
}

export const doctorWeeklyLoad: DoctorWeeklyLoadItem[] = [
  { day: "Pazartesi", count: 8 },
  { day: "Salı", count: 10 },
  { day: "Çarşamba", count: 12 },
  { day: "Perşembe", count: 9 },
  { day: "Cuma", count: 11 },
  { day: "Cumartesi", count: 6 },
];

export interface DoctorRecentPatient {
  id: string;
  name: string;
  lastVisit: string;
}

export const doctorRecentPatients: DoctorRecentPatient[] = [
  { id: "1", name: "Ayşe Demir", lastVisit: "Bugün" },
  { id: "2", name: "Mehmet Kaya", lastVisit: "Dün" },
  { id: "3", name: "Zeynep Aydın", lastVisit: "2 gün önce" },
];

export interface DoctorUpcomingAppointment {
  id: string;
  time: string;
  patientName: string;
  treatment: string;
}

export const doctorUpcomingAppointments: DoctorUpcomingAppointment[] = [
  { id: "1", time: "15:30", patientName: "Fatma Öz", treatment: "Diş Kontrolü" },
  { id: "2", time: "16:15", patientName: "Elif Arslan", treatment: "Muayene" },
  { id: "3", time: "Yarın 09:30", patientName: "Burak Demir", treatment: "Tedavi Planı" },
];
