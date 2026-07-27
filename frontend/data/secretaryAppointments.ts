export type SecretaryAppointmentStatus = "Onaylandı" | "Bekliyor" | "Tamamlandı" | "İptal";

export interface SecretaryAppointmentSummary {
  id: string;
  title: string;
  value: string;
}

export const secretaryAppointmentSummary: SecretaryAppointmentSummary[] = [
  { id: "today", title: "Bugünkü Randevu", value: "15" },
  { id: "confirmed", title: "Onaylandı", value: "9" },
  { id: "pending", title: "Bekliyor", value: "4" },
  { id: "cancelled", title: "İptal", value: "2" },
];

export interface SecretaryAppointmentRow {
  id: string;
  time: string;
  patientName: string;
  doctorName: string;
  department: string;
  dateLabel: string;
  status: SecretaryAppointmentStatus;
}

export const secretaryAppointmentRows: SecretaryAppointmentRow[] = [
  {
    id: "1",
    time: "09:00",
    patientName: "Ayşe Demir",
    doctorName: "Dr. Elif Kaya",
    department: "Diş Hekimliği",
    dateLabel: "Bugün",
    status: "Onaylandı",
  },
  {
    id: "2",
    time: "10:30",
    patientName: "Mehmet Kaya",
    doctorName: "Dr. Ahmet Can",
    department: "Kardiyoloji",
    dateLabel: "Bugün",
    status: "Bekliyor",
  },
  {
    id: "3",
    time: "11:15",
    patientName: "Zeynep Aydın",
    doctorName: "Dr. Selin Arı",
    department: "Dermatoloji",
    dateLabel: "Bugün",
    status: "Onaylandı",
  },
  {
    id: "4",
    time: "14:00",
    patientName: "Ali Yıldız",
    doctorName: "Dr. Mert Koç",
    department: "Ortopedi",
    dateLabel: "Bugün",
    status: "Bekliyor",
  },
  {
    id: "5",
    time: "15:30",
    patientName: "Fatma Öz",
    doctorName: "Dr. Pınar Işık",
    department: "Göz Hastalıkları",
    dateLabel: "Bugün",
    status: "Tamamlandı",
  },
  {
    id: "6",
    time: "16:45",
    patientName: "Elif Arslan",
    doctorName: "Dr. Elif Kaya",
    department: "Diş Hekimliği",
    dateLabel: "Bugün",
    status: "İptal",
  },
];
