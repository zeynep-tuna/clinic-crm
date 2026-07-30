export type SecretaryConsentFormStatus = "İmzalandı" | "Bekliyor" | "Eksik";

export type SecretaryConsentFormType = "Tedavi" | "İmplant" | "Ortodonti" | "Cerrahi" | "KVKK" | "Muayene";

export interface SecretaryConsentFormSummary {
  id: string;
  title: string;
  value: string;
}

export const secretaryConsentFormSummary: SecretaryConsentFormSummary[] = [
  { id: "total", title: "Toplam Form", value: "28" },
  { id: "signed", title: "İmzalanmış Form", value: "18" },
  { id: "pending", title: "Bekleyen Form", value: "7" },
  { id: "missing", title: "Eksik Form", value: "3" },
];

export interface SecretaryConsentFormRow {
  id: string;
  patientName: string;
  formName: string;
  formType: SecretaryConsentFormType;
  date: string;
  fileType: string;
  status: SecretaryConsentFormStatus;
}

export const secretaryConsentFormRows: SecretaryConsentFormRow[] = [
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
    formName: "Muayene Onam Formu",
    formType: "Muayene",
    date: "11.05.2024",
    fileType: "PDF",
    status: "Bekliyor",
  },
  {
    id: "6",
    patientName: "Elif Arslan",
    formName: "Diş Tedavisi Onam Formu",
    formType: "Tedavi",
    date: "10.05.2024",
    fileType: "PDF",
    status: "İmzalandı",
  },
];
