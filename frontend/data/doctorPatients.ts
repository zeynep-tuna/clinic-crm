export type DoctorPatientStatus = "Aktif" | "Kontrol Bekliyor" | "Tedavi Devam Ediyor";

export interface DoctorPatient {
  id: string;
  fullName: string;
  phone: string;
  lastVisit: string;
  treatmentStatus: string;
  lastNote: string;
  status: DoctorPatientStatus;
}

export const doctorPatients: DoctorPatient[] = [
  {
    id: "1",
    fullName: "Ayşe Demir",
    phone: "+90 555 123 45 67",
    lastVisit: "Bugün",
    treatmentStatus: "Diş Kontrolü",
    lastNote: "Düzenli kontrol önerildi",
    status: "Aktif",
  },
  {
    id: "2",
    fullName: "Mehmet Kaya",
    phone: "+90 555 234 56 78",
    lastVisit: "Dün",
    treatmentStatus: "Dolgu Tedavisi",
    lastNote: "Tedavi planı güncellendi",
    status: "Tedavi Devam Ediyor",
  },
  {
    id: "3",
    fullName: "Zeynep Aydın",
    phone: "+90 555 345 67 89",
    lastVisit: "2 gün önce",
    treatmentStatus: "Diş Temizliği",
    lastNote: "6 ay sonra kontrol",
    status: "Kontrol Bekliyor",
  },
  {
    id: "4",
    fullName: "Ali Yıldız",
    phone: "+90 555 456 78 90",
    lastVisit: "1 hafta önce",
    treatmentStatus: "Kontrol Muayenesi",
    lastNote: "Ek randevu gerekebilir",
    status: "Aktif",
  },
  {
    id: "5",
    fullName: "Fatma Öz",
    phone: "+90 555 567 89 01",
    lastVisit: "10 gün önce",
    treatmentStatus: "Diş Kontrolü",
    lastNote: "Röntgen sonucu bekleniyor",
    status: "Kontrol Bekliyor",
  },
];
