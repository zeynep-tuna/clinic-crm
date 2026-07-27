export type DoctorAppointmentStatus = "Onaylandı" | "Bekliyor" | "Tamamlandı" | "İptal";

export interface DoctorAppointmentSummary {
  id: string;
  title: string;
  value: string;
}

export const doctorAppointmentSummary: DoctorAppointmentSummary[] = [
  { id: "today", title: "Bugünkü Randevu", value: "12" },
  { id: "confirmed", title: "Onaylanan", value: "8" },
  { id: "pending", title: "Bekleyen", value: "3" },
  { id: "completed", title: "Tamamlanan", value: "5" },
];

export interface DoctorAppointmentRow {
  id: string;
  time: string;
  patientName: string;
  treatment: string;
  dateLabel: string;
  status: DoctorAppointmentStatus;
}

export const doctorAppointmentRows: DoctorAppointmentRow[] = [
  { id: "1", time: "09:00", patientName: "Ayşe Demir", treatment: "Diş Kontrolü", dateLabel: "Bugün", status: "Onaylandı" },
  { id: "2", time: "10:30", patientName: "Mehmet Kaya", treatment: "Dolgu Tedavisi", dateLabel: "Bugün", status: "Bekliyor" },
  { id: "3", time: "11:15", patientName: "Zeynep Aydın", treatment: "Diş Temizliği", dateLabel: "Bugün", status: "Onaylandı" },
  { id: "4", time: "14:00", patientName: "Ali Yıldız", treatment: "Kontrol Muayenesi", dateLabel: "Bugün", status: "Bekliyor" },
  { id: "5", time: "15:30", patientName: "Fatma Öz", treatment: "Diş Kontrolü", dateLabel: "Bugün", status: "Onaylandı" },
  { id: "6", time: "Yarın 09:30", patientName: "Burak Demir", treatment: "Tedavi Planı", dateLabel: "Yarın", status: "Tamamlandı" },
];
