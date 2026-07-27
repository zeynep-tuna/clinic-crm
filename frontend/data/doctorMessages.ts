export type DoctorMessageSenderType = "Hasta" | "Sekreter" | "Yönetim";

export type DoctorMessageStatus = "Okunmamış" | "Okundu";

export type DoctorMessagePriority = "Acil" | "Normal" | "Düşük";

export interface DoctorMessageSummary {
  id: string;
  title: string;
  value: string;
}

export const doctorMessageSummary: DoctorMessageSummary[] = [
  { id: "total", title: "Toplam Mesaj", value: "32" },
  { id: "unread", title: "Okunmamış", value: "8" },
  { id: "today", title: "Bugün Gelen", value: "5" },
  { id: "urgent", title: "Acil", value: "3" },
];

export interface DoctorMessageRow {
  id: string;
  senderName: string;
  senderType: DoctorMessageSenderType;
  subject: string;
  body: string;
  timeLabel: string;
  status: DoctorMessageStatus;
  priority: DoctorMessagePriority;
}

export const doctorMessageRows: DoctorMessageRow[] = [
  {
    id: "1",
    senderName: "Ayşe Demir",
    senderType: "Hasta",
    subject: "Kontrol randevusu hakkında",
    body: "Hocam kontrol randevum için saat değişikliği yapabilir miyiz?",
    timeLabel: "Bugün 09:20",
    status: "Okunmamış",
    priority: "Normal",
  },
  {
    id: "2",
    senderName: "Zeynep Kaya",
    senderType: "Sekreter",
    subject: "Bugünkü randevu güncellemesi",
    body: "14:00 randevusu 14:30 olarak güncellendi.",
    timeLabel: "Bugün 10:05",
    status: "Okundu",
    priority: "Normal",
  },
  {
    id: "3",
    senderName: "Mehmet Kaya",
    senderType: "Hasta",
    subject: "Tedavi sonrası ağrı",
    body: "Dolgu sonrası hafif ağrım devam ediyor, normal midir?",
    timeLabel: "Bugün 11:15",
    status: "Okunmamış",
    priority: "Acil",
  },
  {
    id: "4",
    senderName: "Klinik Yönetimi",
    senderType: "Yönetim",
    subject: "Haftalık doktor toplantısı",
    body: "Cuma günü kısa değerlendirme toplantısı yapılacaktır.",
    timeLabel: "Dün",
    status: "Okundu",
    priority: "Düşük",
  },
  {
    id: "5",
    senderName: "Fatma Öz",
    senderType: "Hasta",
    subject: "Onam formu sorusu",
    body: "Onam formundaki bir alanı nasıl doldurmam gerekiyor?",
    timeLabel: "Dün",
    status: "Okunmamış",
    priority: "Normal",
  },
  {
    id: "6",
    senderName: "Ali Yıldız",
    senderType: "Hasta",
    subject: "Röntgen sonucu",
    body: "Röntgen sonucum sisteme yüklendi mi?",
    timeLabel: "2 gün önce",
    status: "Okundu",
    priority: "Normal",
  },
];
