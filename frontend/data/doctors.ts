export type DoctorStatus = "Aktif" | "İzinli" | "Pasif";

export interface Doctor {
  id: string;
  fullName: string;
  specialty: string;
  phone: string;
  email: string;
  todayAppointments: number;
  status: DoctorStatus;
}

export const doctors: Doctor[] = [
  {
    id: "1",
    fullName: "Dr. Ali Kaya",
    specialty: "Diş Hekimliği",
    phone: "+90 555 111 22 33",
    email: "ali.kaya@example.com",
    todayAppointments: 8,
    status: "Aktif",
  },
  {
    id: "2",
    fullName: "Dr. Buse Güneş",
    specialty: "Kardiyoloji",
    phone: "+90 555 222 33 44",
    email: "buse.gunes@example.com",
    todayAppointments: 6,
    status: "Aktif",
  },
  {
    id: "3",
    fullName: "Dr. Mehmet Hızlı",
    specialty: "Dermatoloji",
    phone: "+90 555 333 44 55",
    email: "mehmet.hizli@example.com",
    todayAppointments: 4,
    status: "İzinli",
  },
  {
    id: "4",
    fullName: "Dr. Deniz Yılmaz",
    specialty: "Ortopedi",
    phone: "+90 555 444 55 66",
    email: "deniz.yilmaz@example.com",
    todayAppointments: 5,
    status: "Aktif",
  },
  {
    id: "5",
    fullName: "Dr. Elif Aydın",
    specialty: "Göz Hastalıkları",
    phone: "+90 555 555 66 77",
    email: "elif.aydin@example.com",
    todayAppointments: 3,
    status: "Pasif",
  },
  {
    id: "6",
    fullName: "Dr. Hakan Şahin",
    specialty: "Nöroloji",
    phone: "+90 555 666 77 88",
    email: "hakan.sahin@example.com",
    todayAppointments: 2,
    status: "İzinli",
  },
];
