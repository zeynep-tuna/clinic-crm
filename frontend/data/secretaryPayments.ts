export type SecretaryPaymentStatus = "Ödendi" | "Bekliyor" | "Kısmi Ödeme" | "İade";

export interface SecretaryPaymentSummary {
  id: string;
  title: string;
  value: string;
}

export const secretaryPaymentSummary: SecretaryPaymentSummary[] = [
  { id: "total-revenue", title: "Toplam Gelir", value: "₺186.450" },
  { id: "pending", title: "Bekleyen Ödeme", value: "₺24.680" },
  { id: "completed", title: "Tahsil Edilen", value: "₺126.450" },
  { id: "refunded", title: "İade Edilen", value: "₺35.320" },
];

export interface SecretaryPaymentRow {
  id: string;
  patientName: string;
  treatment: string;
  amount: string;
  paymentMethod: string;
  date: string;
  status: SecretaryPaymentStatus;
}

export const secretaryPaymentRows: SecretaryPaymentRow[] = [
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
    treatment: "Kardiyoloji Muayenesi",
    amount: "₺2.500",
    paymentMethod: "Nakit",
    date: "14.05.2024",
    status: "Bekliyor",
  },
  {
    id: "3",
    patientName: "Zeynep Aydın",
    treatment: "Dermatoloji Kontrolü",
    amount: "₺850",
    paymentMethod: "Havale/EFT",
    date: "13.05.2024",
    status: "Kısmi Ödeme",
  },
  {
    id: "4",
    patientName: "Ali Yıldız",
    treatment: "Ortopedi Tedavisi",
    amount: "₺3.200",
    paymentMethod: "Kredi Kartı",
    date: "12.05.2024",
    status: "Ödendi",
  },
  {
    id: "5",
    patientName: "Fatma Öz",
    treatment: "Göz Muayenesi",
    amount: "₺1.100",
    paymentMethod: "Kredi Kartı",
    date: "11.05.2024",
    status: "İade",
  },
  {
    id: "6",
    patientName: "Elif Arslan",
    treatment: "Diş Kontrolü",
    amount: "₺750",
    paymentMethod: "Nakit",
    date: "10.05.2024",
    status: "Bekliyor",
  },
];
