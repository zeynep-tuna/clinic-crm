export type SecretaryMessageSenderType = "Hasta" | "Doktor" | "Yönetim";

export type SecretaryMessageStatus = "Okunmamış" | "Okundu";

export type SecretaryMessagePriority = "Acil" | "Yüksek" | "Normal";

export interface SecretaryMessageSummary {
  id: string;
  title: string;
  value: string;
}

export const secretaryMessageSummary: SecretaryMessageSummary[] = [
  { id: "total", title: "Toplam Mesaj", value: "41" },
  { id: "unread", title: "Okunmamış", value: "11" },
  { id: "today", title: "Bugün Gelen", value: "7" },
  { id: "urgent", title: "Acil", value: "4" },
];

export interface SecretaryMessageRow {
  id: string;
  senderName: string;
  senderType: SecretaryMessageSenderType;
  subject: string;
  body: string;
  timeLabel: string;
  status: SecretaryMessageStatus;
  priority: SecretaryMessagePriority;
}

export const secretaryMessageRows: SecretaryMessageRow[] = [
  {
    id: "1",
    senderName: "Dr. Elif Kaya",
    senderType: "Doktor",
    subject: "Randevu değişikliği",
    body: "14:00 randevusunu 14:30 olarak güncelleyebilir misiniz?",
    timeLabel: "Bugün 09:15",
    status: "Okunmamış",
    priority: "Normal",
  },
  {
    id: "2",
    senderName: "Ayşe Demir",
    senderType: "Hasta",
    subject: "Randevu talebi",
    body: "Bugün için uygun bir kontrol randevusu var mı?",
    timeLabel: "Bugün 10:20",
    status: "Okunmamış",
    priority: "Normal",
  },
  {
    id: "3",
    senderName: "Mehmet Kaya",
    senderType: "Hasta",
    subject: "Ödeme bilgisi",
    body: "Bekleyen ödememi bugün tamamlayacağım.",
    timeLabel: "Bugün 11:00",
    status: "Okundu",
    priority: "Normal",
  },
  {
    id: "4",
    senderName: "Dr. Ahmet Can",
    senderType: "Doktor",
    subject: "Hasta dosyası",
    body: "Mehmet Kaya'nın son ödeme bilgisini kontrol eder misiniz?",
    timeLabel: "Bugün 11:45",
    status: "Okunmamış",
    priority: "Acil",
  },
  {
    id: "5",
    senderName: "Klinik Yönetimi",
    senderType: "Yönetim",
    subject: "Gün sonu raporu",
    body: "Gün sonu randevu ve ödeme raporunu hazırlayınız.",
    timeLabel: "Dün",
    status: "Okundu",
    priority: "Yüksek",
  },
  {
    id: "6",
    senderName: "Fatma Öz",
    senderType: "Hasta",
    subject: "Onam formu",
    body: "Onam formumu tekrar gönderebilir misiniz?",
    timeLabel: "Dün",
    status: "Okunmamış",
    priority: "Normal",
  },
];
