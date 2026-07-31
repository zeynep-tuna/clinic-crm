export type ConsentFormStatus = "İmzalandı" | "Bekliyor" | "Eksik";

export type ConsentFormType = "Tedavi" | "İmplant" | "Ortodonti" | "Cerrahi" | "KVKK" | "Muayene";

export interface ConsentForm {
  id: string;
  patientName: string;
  formTitle: string;
  formType: ConsentFormType;
  date: string;
  status: ConsentFormStatus;
}

export const consentForms: ConsentForm[] = [
  {
    id: "1",
    patientName: "Ayşe Demir",
    formTitle: "Diş Tedavisi Onam Formu",
    formType: "Tedavi",
    date: "15.05.2024",
    status: "İmzalandı",
  },
  {
    id: "2",
    patientName: "Mehmet Kaya",
    formTitle: "KVKK Aydınlatma Metni",
    formType: "KVKK",
    date: "14.05.2024",
    status: "Bekliyor",
  },
  {
    id: "3",
    patientName: "Zeynep Aydın",
    formTitle: "Cerrahi Müdahale Onamı",
    formType: "Cerrahi",
    date: "13.05.2024",
    status: "Eksik",
  },
  {
    id: "4",
    patientName: "Ali Yıldız",
    formTitle: "İmplant Tedavisi Onam Formu",
    formType: "İmplant",
    date: "12.05.2024",
    status: "İmzalandı",
  },
  {
    id: "5",
    patientName: "Fatma Öz",
    formTitle: "Muayene ve Tedavi Onam Formu",
    formType: "Muayene",
    date: "11.05.2024",
    status: "Bekliyor",
  },
  {
    id: "6",
    patientName: "Elif Arslan",
    formTitle: "Diş Tedavisi Onam Formu",
    formType: "Tedavi",
    date: "10.05.2024",
    status: "İmzalandı",
  },
];

export interface ConsentFormOverview {
  total: number;
  signed: number;
  pending: number;
  missing: number;
}

export const consentFormOverview: ConsentFormOverview = {
  total: 6,
  signed: 3,
  pending: 2,
  missing: 1,
};
