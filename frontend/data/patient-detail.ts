import type { PatientGender, PatientStatus } from "@/data/patients";

export interface TreatmentRecord {
  date: string;
  treatment: string;
  doctor: string;
  description: string;
}

export type AppointmentStatus = "Onaylandı" | "Beklemede";

export interface UpcomingAppointment {
  day: string;
  month: string;
  time: string;
  treatment: string;
  doctor: string;
  status: AppointmentStatus;
}

export interface DoctorNote {
  date: string;
  doctor: string;
  note: string;
}

export interface PatientPaymentSummary {
  total: number;
  paid: number;
  pending: number;
  pendingInvoiceCount: number;
}

export interface PatientDetail {
  id: string;
  fullName: string;
  status: PatientStatus;
  age: number;
  gender: PatientGender;
  phone: string;
  email: string;
  birthDate: string;
  bloodType: string;
  lastVisit: string;
  treatmentHistory: TreatmentRecord[];
  upcomingAppointments: UpcomingAppointment[];
  paymentSummary: PatientPaymentSummary;
  doctorNotes: DoctorNote[];
}

const patientDetails: Record<string, PatientDetail> = {
  "1": {
    id: "1",
    fullName: "Ayşe Demir",
    status: "Aktif",
    age: 36,
    gender: "Kadın",
    phone: "+90 555 123 45 67",
    email: "ayse.demir@example.com",
    birthDate: "12.06.1988",
    bloodType: "A Rh+",
    lastVisit: "15.05.2024",
    treatmentHistory: [
      {
        date: "15.05.2024",
        treatment: "Diş Temizliği",
        doctor: "Dr. Elif Kaya",
        description: "Rutin kontrol ve temizlik",
      },
      {
        date: "10.04.2024",
        treatment: "Dolgu Tedavisi",
        doctor: "Dr. Elif Kaya",
        description: "20 numaralı dişe dolgu",
      },
      {
        date: "22.02.2024",
        treatment: "Diş Çekimi",
        doctor: "Dr. Mehmet Yılmaz",
        description: "Gömülü diş çekimi",
      },
      {
        date: "05.01.2024",
        treatment: "Muayene",
        doctor: "Dr. Elif Kaya",
        description: "Rutin muayene",
      },
    ],
    upcomingAppointments: [
      {
        day: "30",
        month: "MAY",
        time: "10:00",
        treatment: "Diş Kontrolü",
        doctor: "Dr. Elif Kaya",
        status: "Onaylandı",
      },
      {
        day: "14",
        month: "HAZ",
        time: "11:30",
        treatment: "Diş Temizliği",
        doctor: "Dr. Elif Kaya",
        status: "Onaylandı",
      },
      {
        day: "28",
        month: "HAZ",
        time: "09:30",
        treatment: "Dolgu Kontrolü",
        doctor: "Dr. Elif Kaya",
        status: "Beklemede",
      },
    ],
    paymentSummary: {
      total: 8450,
      paid: 6200,
      pending: 2250,
      pendingInvoiceCount: 1,
    },
    doctorNotes: [
      {
        date: "15.05.2024",
        doctor: "Dr. Elif Kaya",
        note: "Diş temizliği yapıldı. Genel ağız hijyeni iyi durumda. Günde 2 kez diş fırçalama ve diş ipi kullanımı önerildi.",
      },
      {
        date: "10.04.2024",
        doctor: "Dr. Elif Kaya",
        note: "20 numaralı dişte çürük tespit edildi ve kompozit dolgu yapıldı. Kontrollere devam edilmesi önerildi.",
      },
    ],
  },
  "2": {
    id: "2",
    fullName: "Mehmet Kaya",
    status: "Aktif",
    age: 39,
    gender: "Erkek",
    phone: "+90 555 234 56 78",
    email: "mehmet.kaya@example.com",
    birthDate: "03.09.1985",
    bloodType: "0 Rh+",
    lastVisit: "10.05.2024",
    treatmentHistory: [
      {
        date: "10.05.2024",
        treatment: "Ortodonti Kontrolü",
        doctor: "Dr. Ahmet Can",
        description: "Genel diş ve ortodonti kontrolü",
      },
    ],
    upcomingAppointments: [
      {
        day: "05",
        month: "HAZ",
        time: "13:00",
        treatment: "Ortodonti Kontrolü",
        doctor: "Dr. Ahmet Can",
        status: "Onaylandı",
      },
    ],
    paymentSummary: {
      total: 3200,
      paid: 3200,
      pending: 0,
      pendingInvoiceCount: 0,
    },
    doctorNotes: [
      {
        date: "10.05.2024",
        doctor: "Dr. Ahmet Can",
        note: "Genel kontrol yapıldı, bulgular normal sınırlarda. 6 ay sonra tekrar kontrol önerildi.",
      },
    ],
  },
  "3": {
    id: "3",
    fullName: "Zeynep Aydın",
    status: "Kontrol Bekliyor",
    age: 31,
    gender: "Kadın",
    phone: "+90 555 345 67 89",
    email: "zeynep.aydin@example.com",
    birthDate: "21.11.1992",
    bloodType: "B Rh+",
    lastVisit: "02.05.2024",
    treatmentHistory: [
      {
        date: "02.05.2024",
        treatment: "Kanal Tedavisi Değerlendirmesi",
        doctor: "Dr. Selin Arı",
        description: "Diş ağrısı ön değerlendirme muayenesi",
      },
    ],
    upcomingAppointments: [
      {
        day: "12",
        month: "HAZ",
        time: "15:30",
        treatment: "Kontrol Muayenesi",
        doctor: "Dr. Selin Arı",
        status: "Beklemede",
      },
    ],
    paymentSummary: {
      total: 1800,
      paid: 900,
      pending: 900,
      pendingInvoiceCount: 1,
    },
    doctorNotes: [
      {
        date: "02.05.2024",
        doctor: "Dr. Selin Arı",
        note: "Ön değerlendirme yapıldı. Sonuçlara göre kontrol randevusu planlandı.",
      },
    ],
  },
  "4": {
    id: "4",
    fullName: "Ali Yıldız",
    status: "Aktif",
    age: 44,
    gender: "Erkek",
    phone: "+90 555 456 78 90",
    email: "ali.yildiz@example.com",
    birthDate: "07.02.1980",
    bloodType: "AB Rh+",
    lastVisit: "18.04.2024",
    treatmentHistory: [
      {
        date: "18.04.2024",
        treatment: "Periodontal Tedavi",
        doctor: "Dr. Mert Koç",
        description: "Diş eti (periodontal) tedavi seansı",
      },
    ],
    upcomingAppointments: [
      {
        day: "20",
        month: "HAZ",
        time: "10:30",
        treatment: "Periodontal Kontrol",
        doctor: "Dr. Mert Koç",
        status: "Onaylandı",
      },
    ],
    paymentSummary: {
      total: 5400,
      paid: 4400,
      pending: 1000,
      pendingInvoiceCount: 1,
    },
    doctorNotes: [
      {
        date: "18.04.2024",
        doctor: "Dr. Mert Koç",
        note: "Periodontal tedavi seansı tamamlandı. Ağız bakım rutinine devam edilmesi önerildi.",
      },
    ],
  },
  "5": {
    id: "5",
    fullName: "Fatma Öz",
    status: "Pasif",
    age: 29,
    gender: "Kadın",
    phone: "+90 555 567 89 01",
    email: "fatma.oz@example.com",
    birthDate: "14.03.1995",
    bloodType: "0 Rh-",
    lastVisit: "05.04.2024",
    treatmentHistory: [
      {
        date: "05.04.2024",
        treatment: "Çocuk Diş Muayenesi",
        doctor: "Dr. Pınar Işık",
        description: "Genel çocuk diş muayenesi",
      },
    ],
    upcomingAppointments: [],
    paymentSummary: {
      total: 1200,
      paid: 1200,
      pending: 0,
      pendingInvoiceCount: 0,
    },
    doctorNotes: [
      {
        date: "05.04.2024",
        doctor: "Dr. Pınar Işık",
        note: "Muayene sonucu normal. Herhangi bir takip gerekmiyor.",
      },
    ],
  },
  "6": {
    id: "6",
    fullName: "Elif Arslan",
    status: "Kontrol Bekliyor",
    age: 34,
    gender: "Kadın",
    phone: "+90 555 678 90 12",
    email: "elif.arslan@example.com",
    birthDate: "30.08.1990",
    bloodType: "A Rh-",
    lastVisit: "20.03.2024",
    treatmentHistory: [
      {
        date: "20.03.2024",
        treatment: "Muayene",
        doctor: "Dr. Elif Yılmaz",
        description: "Ön değerlendirme muayenesi",
      },
    ],
    upcomingAppointments: [
      {
        day: "03",
        month: "HAZ",
        time: "14:00",
        treatment: "Kontrol Muayenesi",
        doctor: "Dr. Elif Yılmaz",
        status: "Beklemede",
      },
    ],
    paymentSummary: {
      total: 2100,
      paid: 1400,
      pending: 700,
      pendingInvoiceCount: 1,
    },
    doctorNotes: [
      {
        date: "20.03.2024",
        doctor: "Dr. Elif Yılmaz",
        note: "Ön değerlendirme yapıldı. Kontrol randevusu planlandı.",
      },
    ],
  },
};

export function getPatientDetailById(id: string): PatientDetail | undefined {
  return patientDetails[id];
}
