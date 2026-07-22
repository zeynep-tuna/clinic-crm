export type PatientGender = "Kadın" | "Erkek";

export type PatientStatus = "Aktif" | "Kontrol Bekliyor" | "Pasif";

export interface Patient {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  birthDate: string;
  gender: PatientGender;
  lastVisit: string;
  status: PatientStatus;
}

export const patients: Patient[] = [
  {
    id: "1",
    fullName: "Ayşe Demir",
    phone: "+90 555 123 45 67",
    email: "ayse.demir@example.com",
    birthDate: "12.06.1988",
    gender: "Kadın",
    lastVisit: "15.05.2024",
    status: "Aktif",
  },
  {
    id: "2",
    fullName: "Mehmet Kaya",
    phone: "+90 555 234 56 78",
    email: "mehmet.kaya@example.com",
    birthDate: "03.09.1985",
    gender: "Erkek",
    lastVisit: "10.05.2024",
    status: "Aktif",
  },
  {
    id: "3",
    fullName: "Zeynep Aydın",
    phone: "+90 555 345 67 89",
    email: "zeynep.aydin@example.com",
    birthDate: "21.11.1992",
    gender: "Kadın",
    lastVisit: "02.05.2024",
    status: "Kontrol Bekliyor",
  },
  {
    id: "4",
    fullName: "Ali Yıldız",
    phone: "+90 555 456 78 90",
    email: "ali.yildiz@example.com",
    birthDate: "07.02.1980",
    gender: "Erkek",
    lastVisit: "18.04.2024",
    status: "Aktif",
  },
  {
    id: "5",
    fullName: "Fatma Öz",
    phone: "+90 555 567 89 01",
    email: "fatma.oz@example.com",
    birthDate: "14.03.1995",
    gender: "Kadın",
    lastVisit: "05.04.2024",
    status: "Pasif",
  },
  {
    id: "6",
    fullName: "Elif Arslan",
    phone: "+90 555 678 90 12",
    email: "elif.arslan@example.com",
    birthDate: "30.08.1990",
    gender: "Kadın",
    lastVisit: "20.03.2024",
    status: "Kontrol Bekliyor",
  },
];
