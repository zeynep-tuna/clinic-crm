export type DoctorConsentFormStatus = "İmzalandı" | "Bekliyor" | "Eksik";

export type DoctorConsentFormType = "Tedavi" | "İmplant" | "Ortodonti" | "Cerrahi" | "KVKK" | "Muayene";

export interface DoctorConsentFormSummary {
  id: string;
  title: string;
  value: string;
}

export const doctorConsentFormSummary: DoctorConsentFormSummary[] = [
  { id: "total", title: "Toplam Form", value: "24" },
  { id: "signed", title: "İmzalanan", value: "16" },
  { id: "pending", title: "Bekleyen", value: "6" },
  { id: "missing", title: "Eksik", value: "2" },
];

export interface DoctorConsentFormRow {
  id: string;
  patientName: string;
  formName: string;
  formType: DoctorConsentFormType;
  date: string;
  fileType: string;
  status: DoctorConsentFormStatus;
}

export const doctorConsentFormRows: DoctorConsentFormRow[] = [
  {
    id: "1",
    patientName: "Ayşe Demir",
    formName: "Diş Tedavisi Onam Formu",
    formType: "Tedavi",
    date: "15.05.2024",
    fileType: "PDF",
    status: "İmzalandı",
  },
  {
    id: "2",
    patientName: "Mehmet Kaya",
    formName: "KVKK Aydınlatma Metni",
    formType: "KVKK",
    date: "14.05.2024",
    fileType: "PDF",
    status: "Bekliyor",
  },
  {
    id: "3",
    patientName: "Zeynep Aydın",
    formName: "Cerrahi Müdahale Onamı",
    formType: "Cerrahi",
    date: "13.05.2024",
    fileType: "PDF",
    status: "Eksik",
  },
  {
    id: "4",
    patientName: "Ali Yıldız",
    formName: "İmplant Tedavisi Onam Formu",
    formType: "İmplant",
    date: "12.05.2024",
    fileType: "PDF",
    status: "İmzalandı",
  },
  {
    id: "5",
    patientName: "Fatma Öz",
    formName: "Muayene ve Tedavi Onam Formu",
    formType: "Muayene",
    date: "11.05.2024",
    fileType: "PDF",
    status: "Bekliyor",
  },
  {
    id: "6",
    patientName: "Burak Demir",
    formName: "Diş Tedavisi Onam Formu",
    formType: "Tedavi",
    date: "10.05.2024",
    fileType: "PDF",
    status: "İmzalandı",
  },
];
