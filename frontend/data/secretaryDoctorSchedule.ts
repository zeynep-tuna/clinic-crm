export type SecretaryDoctorStatus = "Aktif" | "İzinli" | "Pasif";

export type SecretaryDoctorWorkload = "Yoğun" | "Orta" | "Müsait" | "İzinli";

export interface SecretaryDoctorScheduleSummary {
  id: string;
  title: string;
  value: string;
}

export const secretaryDoctorScheduleSummary: SecretaryDoctorScheduleSummary[] = [
  { id: "active-doctors", title: "Aktif Doktor", value: "4" },
  { id: "today-appointments", title: "Bugünkü Randevu", value: "15" },
  { id: "free-slots", title: "Boş Saat", value: "9" },
  { id: "busy-doctors", title: "Yoğun Doktor", value: "2" },
];

export interface SecretaryDoctorScheduleRow {
  id: string;
  name: string;
  specialty: string;
  todayAppointments: number;
  availableSlot: string;
  workload: SecretaryDoctorWorkload;
  status: SecretaryDoctorStatus;
}

export const secretaryDoctorScheduleRows: SecretaryDoctorScheduleRow[] = [
  {
    id: "1",
    name: "Dr. Elif Kaya",
    specialty: "Diş Hekimliği",
    todayAppointments: 6,
    availableSlot: "16:30 - 17:00",
    workload: "Yoğun",
    status: "Aktif",
  },
  {
    id: "2",
    name: "Dr. Ahmet Can",
    specialty: "Ortodontist",
    todayAppointments: 4,
    availableSlot: "14:00 - 15:00",
    workload: "Orta",
    status: "Aktif",
  },
  {
    id: "3",
    name: "Dr. Selin Arı",
    specialty: "Endodontist",
    todayAppointments: 3,
    availableSlot: "13:30 - 15:30",
    workload: "Müsait",
    status: "Aktif",
  },
  {
    id: "4",
    name: "Dr. Mert Koç",
    specialty: "Periodontolog",
    todayAppointments: 2,
    availableSlot: "15:00 - 17:00",
    workload: "Müsait",
    status: "Aktif",
  },
  {
    id: "5",
    name: "Dr. Pınar Işık",
    specialty: "Çocuk Diş Hekimi",
    todayAppointments: 0,
    availableSlot: "Kapalı",
    workload: "İzinli",
    status: "İzinli",
  },
];
