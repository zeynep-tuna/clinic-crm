export type SecretaryPatientStatus = "Aktif" | "Kontrol Bekliyor" | "Pasif";

export interface SecretaryPatientRow {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  lastVisit: string;
  registeredDate: string;
  status: SecretaryPatientStatus;
}

export const secretaryPatientRows: SecretaryPatientRow[] = [
  {
    id: "1",
    fullName: "Ayşe Demir",
    phone: "+90 555 123 45 67",
    email: "ayse.demir@example.com",
    lastVisit: "Bugün",
    registeredDate: "15.05.2024",
    status: "Aktif",
  },
  {
    id: "2",
    fullName: "Mehmet Kaya",
    phone: "+90 555 234 56 78",
    email: "mehmet.kaya@example.com",
    lastVisit: "Dün",
    registeredDate: "14.05.2024",
    status: "Aktif",
  },
  {
    id: "3",
    fullName: "Zeynep Aydın",
    phone: "+90 555 345 67 89",
    email: "zeynep.aydin@example.com",
    lastVisit: "2 gün önce",
    registeredDate: "13.05.2024",
    status: "Kontrol Bekliyor",
  },
  {
    id: "4",
    fullName: "Ali Yıldız",
    phone: "+90 555 456 78 90",
    email: "ali.yildiz@example.com",
    lastVisit: "1 hafta önce",
    registeredDate: "12.05.2024",
    status: "Aktif",
  },
  {
    id: "5",
    fullName: "Fatma Öz",
    phone: "+90 555 567 89 01",
    email: "fatma.oz@example.com",
    lastVisit: "10 gün önce",
    registeredDate: "11.05.2024",
    status: "Pasif",
  },
  {
    id: "6",
    fullName: "Elif Arslan",
    phone: "+90 555 678 90 12",
    email: "elif.arslan@example.com",
    lastVisit: "2 hafta önce",
    registeredDate: "10.05.2024",
    status: "Kontrol Bekliyor",
  },
];
