export type DoctorPaymentStatus = "Ödendi" | "Bekliyor" | "Kısmi Ödeme" | "İade";

export interface DoctorPaymentSummary {
  id: string;
  title: string;
  value: string;
}

export const doctorPaymentSummary: DoctorPaymentSummary[] = [
  { id: "total-collected", title: "Toplam Tahsilat", value: "₺42.850" },
  { id: "pending", title: "Bekleyen Ödeme", value: "₺8.400" },
  { id: "partial", title: "Kısmi Ödeme", value: "₺3.200" },
  { id: "completed", title: "Tamamlanan İşlem", value: "18" },
];

export interface DoctorPaymentRow {
  id: string;
  patientName: string;
  treatment: string;
  amount: string;
  paymentMethod: string;
  date: string;
  status: DoctorPaymentStatus;
}

export const doctorPaymentRows: DoctorPaymentRow[] = [
  {
    id: "1",
    patientName: "Ayşe Demir",
    treatment: "Diş Temizliği",
    amount: "₺1.250",
    paymentMethod: "Kredi Kartı",
    date: "15.05.2024",
    status: "Ödendi",
  },
  {
    id: "2",
    patientName: "Mehmet Kaya",
    treatment: "Dolgu Tedavisi",
    amount: "₺2.500",
    paymentMethod: "Nakit",
    date: "14.05.2024",
    status: "Bekliyor",
  },
  {
    id: "3",
    patientName: "Zeynep Aydın",
    treatment: "Diş Kontrolü",
    amount: "₺850",
    paymentMethod: "Havale/EFT",
    date: "13.05.2024",
    status: "Kısmi Ödeme",
  },
  {
    id: "4",
    patientName: "Ali Yıldız",
    treatment: "Röntgen Değerlendirme",
    amount: "₺1.100",
    paymentMethod: "Kredi Kartı",
    date: "12.05.2024",
    status: "Ödendi",
  },
  {
    id: "5",
    patientName: "Fatma Öz",
    treatment: "Diş Eti Kontrolü",
    amount: "₺1.750",
    paymentMethod: "Nakit",
    date: "11.05.2024",
    status: "Bekliyor",
  },
  {
    id: "6",
    patientName: "Burak Demir",
    treatment: "Tedavi Planı",
    amount: "₺3.200",
    paymentMethod: "Kredi Kartı",
    date: "10.05.2024",
    status: "İade",
  },
];
