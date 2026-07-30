export type AppointmentStatus = "Onaylandı" | "Bekliyor" | "Tamamlandı" | "İptal";

export interface Appointment {
  id: string;
  time: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  department: string;
  date: string;
  weekday: string;
  status: AppointmentStatus;
}

export const appointments: Appointment[] = [
  {
    id: "1",
    time: "09:00",
    patientName: "Ayşe Demir",
    patientPhone: "+90 555 123 45 67",
    doctorName: "Dr. Elif Kaya",
    department: "Diş Hekimliği",
    date: "30.05.2024",
    weekday: "Perşembe",
    status: "Onaylandı",
  },
  {
    id: "2",
    time: "10:30",
    patientName: "Mehmet Kaya",
    patientPhone: "+90 555 234 56 78",
    doctorName: "Dr. Ahmet Can",
    department: "Ortodonti",
    date: "30.05.2024",
    weekday: "Perşembe",
    status: "Onaylandı",
  },
  {
    id: "3",
    time: "11:15",
    patientName: "Zeynep Aydın",
    patientPhone: "+90 555 345 67 89",
    doctorName: "Dr. Selin Arı",
    department: "Endodonti",
    date: "30.05.2024",
    weekday: "Perşembe",
    status: "Bekliyor",
  },
  {
    id: "4",
    time: "14:00",
    patientName: "Ali Yıldız",
    patientPhone: "+90 555 456 78 90",
    doctorName: "Dr. Mert Koç",
    department: "Periodontoloji",
    date: "30.05.2024",
    weekday: "Perşembe",
    status: "Bekliyor",
  },
  {
    id: "5",
    time: "15:30",
    patientName: "Fatma Öz",
    patientPhone: "+90 555 567 89 01",
    doctorName: "Dr. Pınar Işık",
    department: "Çocuk Diş Hekimliği",
    date: "30.05.2024",
    weekday: "Perşembe",
    status: "Tamamlandı",
  },
  {
    id: "6",
    time: "16:45",
    patientName: "Elif Arslan",
    patientPhone: "+90 555 678 90 12",
    doctorName: "Dr. Elif Kaya",
    department: "Diş Hekimliği",
    date: "30.05.2024",
    weekday: "Perşembe",
    status: "İptal",
  },
];
