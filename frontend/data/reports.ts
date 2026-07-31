export type ReportStatFormat = "currency" | "number";

export interface ReportSummaryStat {
  id: string;
  title: string;
  value: number;
  format: ReportStatFormat;
  trendPercent: number;
}

export const reportSummaryStats: ReportSummaryStat[] = [
  {
    id: "total-revenue",
    title: "Toplam Gelir",
    value: 186450,
    format: "currency",
    trendPercent: 12.5,
  },
  {
    id: "total-appointments",
    title: "Toplam Randevu",
    value: 248,
    format: "number",
    trendPercent: 8.2,
  },
  {
    id: "new-patients",
    title: "Yeni Hasta",
    value: 64,
    format: "number",
    trendPercent: 5.4,
  },
  {
    id: "active-doctors",
    title: "Aktif Hekim",
    value: 14,
    format: "number",
    trendPercent: 3.1,
  },
];

export interface MonthlyRevenuePoint {
  month: string;
  amount: number;
}

export const monthlyRevenue: MonthlyRevenuePoint[] = [
  { month: "Ocak", amount: 24500 },
  { month: "Şubat", amount: 32800 },
  { month: "Mart", amount: 41600 },
  { month: "Nisan", amount: 38200 },
  { month: "Mayıs", amount: 49450 },
  { month: "Haziran", amount: 58200 },
];

export type AppointmentDistributionStatus = "Onaylandı" | "Bekliyor" | "Tamamlandı" | "İptal";

export interface AppointmentStatusDistributionItem {
  status: AppointmentDistributionStatus;
  count: number;
  percent: number;
}

export const appointmentStatusDistribution: AppointmentStatusDistributionItem[] = [
  { status: "Onaylandı", count: 128, percent: 52 },
  { status: "Bekliyor", count: 54, percent: 22 },
  { status: "Tamamlandı", count: 48, percent: 19 },
  { status: "İptal", count: 18, percent: 7 },
];

export interface PatientGrowthPoint {
  month: string;
  count: number;
}

export const patientGrowth: PatientGrowthPoint[] = [
  { month: "Ocak", count: 18 },
  { month: "Şubat", count: 24 },
  { month: "Mart", count: 31 },
  { month: "Nisan", count: 42 },
  { month: "Mayıs", count: 53 },
  { month: "Haziran", count: 64 },
];

export interface DoctorPerformanceEntry {
  id: string;
  fullName: string;
  specialty: string;
  totalAppointments: number;
  totalRevenue: number;
  performance: number;
}

export const doctorPerformance: DoctorPerformanceEntry[] = [
  {
    id: "1",
    fullName: "Dr. Ali Kaya",
    specialty: "Diş Hekimi",
    totalAppointments: 48,
    totalRevenue: 38400,
    performance: 92,
  },
  {
    id: "2",
    fullName: "Dr. Buse Güneş",
    specialty: "Ortodontist",
    totalAppointments: 36,
    totalRevenue: 45200,
    performance: 88,
  },
  {
    id: "3",
    fullName: "Dr. Mehmet Hızlı",
    specialty: "Endodontist",
    totalAppointments: 28,
    totalRevenue: 21400,
    performance: 76,
  },
  {
    id: "4",
    fullName: "Dr. Deniz Yılmaz",
    specialty: "Periodontolog",
    totalAppointments: 32,
    totalRevenue: 35600,
    performance: 84,
  },
  {
    id: "5",
    fullName: "Dr. Elif Aydın",
    specialty: "Çocuk Diş Hekimi",
    totalAppointments: 24,
    totalRevenue: 18250,
    performance: 72,
  },
];
