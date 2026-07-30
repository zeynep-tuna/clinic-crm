export type TrendDirection = "up" | "down";

export type StatIcon = "patients" | "appointments" | "payments" | "doctors";

export interface StatCardData {
  id: string;
  title: string;
  value: string;
  trendDirection: TrendDirection;
  trendLabel: string;
  icon: StatIcon;
  iconVariant?: "primary" | "warning";
}

export const statCards: StatCardData[] = [
  {
    id: "total-patients",
    title: "Toplam Hasta",
    value: "1,248",
    trendDirection: "up",
    trendLabel: "12.5% geçen aya göre",
    icon: "patients",
  },
  {
    id: "today-appointments",
    title: "Bugünkü Randevu",
    value: "28",
    trendDirection: "up",
    trendLabel: "7.2% düne göre",
    icon: "appointments",
  },
  {
    id: "pending-payment",
    title: "Bekleyen Ödeme",
    value: "₺24,680",
    trendDirection: "down",
    trendLabel: "8.1% geçen aya göre",
    icon: "payments",
    iconVariant: "warning",
  },
  {
    id: "active-doctors",
    title: "Aktif Doktor",
    value: "14",
    trendDirection: "up",
    trendLabel: "3 yeni doktor bu ay",
    icon: "doctors",
  },
];

export type AppointmentStatus = "Onaylandı" | "Bekliyor";

export interface TodayAppointment {
  id: string;
  time: string;
  patientName: string;
  doctorName: string;
  department: string;
  status: AppointmentStatus;
}

export const todayAppointments: TodayAppointment[] = [
  {
    id: "1",
    time: "09:00",
    patientName: "Ayşe Demir",
    doctorName: "Dr. Elif Yılmaz",
    department: "Diş Hekimliği",
    status: "Onaylandı",
  },
  {
    id: "2",
    time: "10:30",
    patientName: "Mehmet Kaya",
    doctorName: "Dr. Ahmet Can",
    department: "Ortodonti",
    status: "Onaylandı",
  },
  {
    id: "3",
    time: "11:15",
    patientName: "Zeynep Aydın",
    doctorName: "Dr. Selin Arı",
    department: "Endodonti",
    status: "Bekliyor",
  },
  {
    id: "4",
    time: "14:00",
    patientName: "Ali Yıldız",
    doctorName: "Dr. Mert Koç",
    department: "Periodontoloji",
    status: "Bekliyor",
  },
  {
    id: "5",
    time: "15:30",
    patientName: "Fatma Öz",
    doctorName: "Dr. Pınar Işık",
    department: "Çocuk Diş Hekimliği",
    status: "Onaylandı",
  },
];

export type PatientGender = "Kadın" | "Erkek";

export interface RecentPatient {
  id: string;
  name: string;
  age: number;
  gender: PatientGender;
  addedDate: string;
}

export const recentPatients: RecentPatient[] = [
  {
    id: "1",
    name: "Sibel Kara",
    age: 32,
    gender: "Kadın",
    addedDate: "26 May 2025",
  },
  {
    id: "2",
    name: "Emre Yılmaz",
    age: 45,
    gender: "Erkek",
    addedDate: "26 May 2025",
  },
  {
    id: "3",
    name: "Tuğba Çelik",
    age: 28,
    gender: "Kadın",
    addedDate: "25 May 2025",
  },
  {
    id: "4",
    name: "Burak Demir",
    age: 38,
    gender: "Erkek",
    addedDate: "25 May 2025",
  },
];

export interface PaymentSummaryData {
  collected: number;
  pending: number;
  refunded: number;
}

export const paymentSummary: PaymentSummaryData = {
  collected: 126450,
  pending: 24680,
  refunded: 35320,
};
