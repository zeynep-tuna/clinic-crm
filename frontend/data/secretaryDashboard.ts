export interface SecretaryProfile {
  name: string;
  role: string;
}

export const secretaryProfile: SecretaryProfile = {
  name: "Zeynep Kaya",
  role: "Sekreter",
};

export type SecretaryStatIcon = "appointments" | "newPatient" | "payments" | "consent";

export interface SecretaryStatCardData {
  id: string;
  title: string;
  value: string;
  icon: SecretaryStatIcon;
  linkLabel: string;
}

export const secretaryStatCards: SecretaryStatCardData[] = [
  {
    id: "today-appointments",
    title: "Bugünkü Randevular",
    value: "15",
    icon: "appointments",
    linkLabel: "Tüm randevuları gör →",
  },
  {
    id: "new-patients",
    title: "Yeni Hasta",
    value: "7",
    icon: "newPatient",
    linkLabel: "Yeni kayıtları gör →",
  },
  {
    id: "pending-payments",
    title: "Bekleyen Ödeme",
    value: "18",
    icon: "payments",
    linkLabel: "Ödemeleri gör →",
  },
  {
    id: "pending-consent",
    title: "Onam Bekleyen",
    value: "9",
    icon: "consent",
    linkLabel: "Onam formlarını gör →",
  },
];

export type SecretaryAppointmentStatus = "Onaylandı" | "Bekliyor" | "Tamamlandı";

export interface SecretaryTodayAppointment {
  id: string;
  time: string;
  patientName: string;
  doctorName: string;
  status: SecretaryAppointmentStatus;
}

export const secretaryTodayAppointments: SecretaryTodayAppointment[] = [
  { id: "1", time: "09:00", patientName: "Ayşe Demir", doctorName: "Dr. Elif Kaya", status: "Onaylandı" },
  { id: "2", time: "10:30", patientName: "Mehmet Kaya", doctorName: "Dr. Ahmet Can", status: "Bekliyor" },
  { id: "3", time: "11:15", patientName: "Zeynep Aydın", doctorName: "Dr. Selin Arı", status: "Onaylandı" },
  { id: "4", time: "14:00", patientName: "Ali Yıldız", doctorName: "Dr. Mert Koç", status: "Bekliyor" },
  { id: "5", time: "15:30", patientName: "Fatma Öz", doctorName: "Dr. Pınar Işık", status: "Onaylandı" },
];

export interface SecretaryPaymentStatusItem {
  label: string;
  amount: number;
  color: string;
}

export const secretaryPaymentStatus: SecretaryPaymentStatusItem[] = [
  { label: "Tahsil Edildi", amount: 126450, color: "#16A34A" },
  { label: "Bekliyor", amount: 24680, color: "#F59E0B" },
  { label: "Kısmi Ödeme", amount: 12300, color: "#5B4DE3" },
];

export interface SecretaryDoctorScheduleItem {
  id: string;
  name: string;
  department: string;
  appointmentCount: number;
}

export const secretaryDoctorSchedule: SecretaryDoctorScheduleItem[] = [
  { id: "1", name: "Dr. Elif Kaya", department: "Diş Hekimliği", appointmentCount: 6 },
  { id: "2", name: "Dr. Ahmet Can", department: "Kardiyoloji", appointmentCount: 4 },
  { id: "3", name: "Dr. Selin Arı", department: "Dermatoloji", appointmentCount: 3 },
  { id: "4", name: "Dr. Mert Koç", department: "Ortopedi", appointmentCount: 2 },
];

export interface SecretaryRecentPatient {
  id: string;
  name: string;
  addedLabel: string;
}

export const secretaryRecentPatients: SecretaryRecentPatient[] = [
  { id: "1", name: "Ayşe Demir", addedLabel: "Bugün eklendi" },
  { id: "2", name: "Mehmet Kaya", addedLabel: "Bugün eklendi" },
  { id: "3", name: "Zeynep Aydın", addedLabel: "Dün eklendi" },
  { id: "4", name: "Ali Yıldız", addedLabel: "2 gün önce eklendi" },
];

export interface SecretaryUpcomingTask {
  id: string;
  text: string;
}

export const secretaryUpcomingTasks: SecretaryUpcomingTask[] = [
  { id: "1", text: "15:30 randevusu için hasta bilgilendirmesi yapılacak." },
  { id: "2", text: "Bekleyen ödeme hatırlatması gönderilecek." },
  { id: "3", text: "Onam formu eksik olan hastalar kontrol edilecek." },
  { id: "4", text: "Yarınki doktor takvimi hazırlanacak." },
];
