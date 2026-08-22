import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '../generated/prisma/client';
import { hashPassword } from '../src/common/utils/password.util';

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is not set. Please configure backend/.env before running the seed.',
  );
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

const DEMO_CLINIC_ID = 'd4c56532-72ec-4701-80b1-2ca9a18c7e2a';

const DEMO_CLINIC = {
  id: DEMO_CLINIC_ID,
  name: 'ClinicCRM Demo Diş Kliniği',
  phone: '05555555555',
  email: 'info@cliniccrm.com',
  address: 'Sakarya',
  taxNumber: '1234567890',
};

const DEMO_USERS = [
  { fullName: 'Beyza Admin', email: 'admin@cliniccrm.com', role: 'ADMIN' as const },
  { fullName: 'Zeynep Sekreter', email: 'sekreter@cliniccrm.com', role: 'SECRETARY' as const },
  { fullName: 'Elif Doktor', email: 'doktor@cliniccrm.com', role: 'DOCTOR' as const },
];

const DEMO_PASSWORD = '123456';

const CAN_DOCTOR_ID = '66666666-6666-4666-8666-666666666666';

const PATIENT_AYSE_ID = '11111111-1111-4111-8111-111111111111';
const PATIENT_MEHMET_ID = '22222222-2222-4222-8222-222222222222';
const PATIENT_FATMA_ID = '33333333-3333-4333-8333-333333333333';
const PATIENT_HASAN_ID = '44444444-4444-4444-8444-444444444444';
const PATIENT_HAKAN_ID = '55555555-5555-4555-8555-555555555555';

const APPOINTMENT_TODAY_AYSE_ID = '77777777-7777-4777-8777-777777777771';
const APPOINTMENT_TOMORROW_MEHMET_ID = '77777777-7777-4777-8777-777777777772';
const APPOINTMENT_PAST_COMPLETED_ID = '77777777-7777-4777-8777-777777777773';
const APPOINTMENT_PAST_CANCELLED_ID = '77777777-7777-4777-8777-777777777774';
const APPOINTMENT_CAN_DEMIR_FATMA_ID = '77777777-7777-4777-8777-777777777775';
const APPOINTMENT_SOFT_DELETED_ID = '77777777-7777-4777-8777-777777777776';

const PAYMENT_AYSE_CARD_ID = '88888888-8888-4888-8888-888888888881';
const PAYMENT_AYSE_CASH_ID = '88888888-8888-4888-8888-888888888882';
const PAYMENT_FATMA_TRANSFER_ID = '88888888-8888-4888-8888-888888888883';
const PAYMENT_HASAN_UNLINKED_ID = '88888888-8888-4888-8888-888888888884';

const CONSENT_AYSE_SIGNED_ID = '99999999-9999-4999-8999-999999999991';
const CONSENT_MEHMET_PENDING_ID = '99999999-9999-4999-8999-999999999992';
const CONSENT_FATMA_MISSING_ID = '99999999-9999-4999-8999-999999999993';
const CONSENT_HASAN_SIGNED_ID = '99999999-9999-4999-8999-999999999994';

const TREATMENT_PLAN_MEHMET_ACTIVE_ID = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1';
const TREATMENT_PLAN_AYSE_REVIEW_ID = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2';
const TREATMENT_PLAN_AYSE_COMPLETED_ID = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3';

const MESSAGE_SECRETARY_TO_DOCTOR_ID = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1';
const MESSAGE_DOCTOR_TO_SECRETARY_ID = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2';
const MESSAGE_URGENT_ID = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3';

/** Local midnight for "today + daysOffset", then the given local hour/minute set on top. */
function localDateTime(daysOffset: number, hours: number, minutes: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

async function main() {
  const clinic = await prisma.clinic.upsert({
    where: { id: DEMO_CLINIC.id },
    update: {
      name: DEMO_CLINIC.name,
      phone: DEMO_CLINIC.phone,
      email: DEMO_CLINIC.email,
      address: DEMO_CLINIC.address,
      taxNumber: DEMO_CLINIC.taxNumber,
    },
    create: DEMO_CLINIC,
  });

  let doctorUser: Awaited<ReturnType<typeof prisma.user.upsert>> | null = null;
  let secretaryUser: Awaited<ReturnType<typeof prisma.user.upsert>> | null =
    null;

  for (const demoUser of DEMO_USERS) {
    const passwordHash = await hashPassword(DEMO_PASSWORD);

    const upsertedUser = await prisma.user.upsert({
      where: { email: demoUser.email },
      update: {
        fullName: demoUser.fullName,
        role: demoUser.role,
        clinicId: clinic.id,
        isActive: true,
      },
      create: {
        clinicId: clinic.id,
        fullName: demoUser.fullName,
        email: demoUser.email,
        passwordHash,
        role: demoUser.role,
        isActive: true,
      },
    });

    if (demoUser.role === 'DOCTOR') {
      doctorUser = upsertedUser;
    }

    if (demoUser.role === 'SECRETARY') {
      secretaryUser = upsertedUser;
    }
  }

  // Elif Doktor: the primary doctor, linked to the DOCTOR login user.
  let doctor: Awaited<ReturnType<typeof prisma.doctor.upsert>> | null = null;

  if (doctorUser) {
    doctor = await prisma.doctor.upsert({
      where: { userId: doctorUser.id },
      update: {
        fullName: doctorUser.fullName,
        specialty: 'Diş Hekimi',
        phone: '0555 222 33 44',
        clinicId: clinic.id,
        isActive: true,
      },
      create: {
        userId: doctorUser.id,
        clinicId: clinic.id,
        fullName: doctorUser.fullName,
        specialty: 'Diş Hekimi',
        phone: '0555 222 33 44',
        isActive: true,
      },
    });
  }

  // Can Demir: a second, clinic-wide doctor with no login user — exists purely
  // so Doctor-scope regression tests have another doctor's appointment/payment
  // that must stay invisible to Elif Doktor.
  const secondDoctor = await prisma.doctor.upsert({
    where: { id: CAN_DOCTOR_ID },
    update: {
      fullName: 'Can Demir',
      specialty: 'Ortodonti',
      phone: '0555 333 44 55',
      clinicId: clinic.id,
      isActive: true,
    },
    create: {
      id: CAN_DOCTOR_ID,
      fullName: 'Can Demir',
      specialty: 'Ortodonti',
      phone: '0555 333 44 55',
      clinicId: clinic.id,
      isActive: true,
    },
  });

  // --- Patients -----------------------------------------------------------
  // Ayşe & Mehmet: related to Elif Doktor (appointments/treatment plans below).
  // Fatma: related only to Can Demir — must stay hidden from Elif's patient list.
  // Hasan: no appointments or treatment plans at all — also hidden from Elif.
  // Hakan: inactive record, unrelated to any doctor — isActive filter regression.
  await prisma.patient.upsert({
    where: { id: PATIENT_AYSE_ID },
    update: {
      firstName: 'Ayşe',
      lastName: 'Yılmaz',
      phone: '0555 111 22 33',
      email: 'ayse.yilmaz@example.com',
      birthDate: new Date(1992, 3, 15),
      address: 'Sakarya',
      notes: 'Demo patient',
      isActive: true,
      clinicId: clinic.id,
    },
    create: {
      id: PATIENT_AYSE_ID,
      firstName: 'Ayşe',
      lastName: 'Yılmaz',
      phone: '0555 111 22 33',
      email: 'ayse.yilmaz@example.com',
      birthDate: new Date(1992, 3, 15),
      address: 'Sakarya',
      notes: 'Demo patient',
      isActive: true,
      clinicId: clinic.id,
    },
  });

  await prisma.patient.upsert({
    where: { id: PATIENT_MEHMET_ID },
    update: {
      firstName: 'Mehmet',
      lastName: 'Kaya',
      phone: '0555 444 55 66',
      email: 'mehmet.kaya@example.com',
      birthDate: new Date(1987, 8, 20),
      address: 'Sakarya',
      notes: 'Demo patient',
      isActive: true,
      clinicId: clinic.id,
    },
    create: {
      id: PATIENT_MEHMET_ID,
      firstName: 'Mehmet',
      lastName: 'Kaya',
      phone: '0555 444 55 66',
      email: 'mehmet.kaya@example.com',
      birthDate: new Date(1987, 8, 20),
      address: 'Sakarya',
      notes: 'Demo patient',
      isActive: true,
      clinicId: clinic.id,
    },
  });

  await prisma.patient.upsert({
    where: { id: PATIENT_FATMA_ID },
    update: {
      firstName: 'Fatma',
      lastName: 'Demir',
      phone: '0555 666 77 88',
      email: 'fatma.demir@example.com',
      birthDate: new Date(1995, 1, 10),
      address: 'Sakarya',
      notes: 'Demo patient (Can Demir hastası)',
      isActive: true,
      clinicId: clinic.id,
    },
    create: {
      id: PATIENT_FATMA_ID,
      firstName: 'Fatma',
      lastName: 'Demir',
      phone: '0555 666 77 88',
      email: 'fatma.demir@example.com',
      birthDate: new Date(1995, 1, 10),
      address: 'Sakarya',
      notes: 'Demo patient (Can Demir hastası)',
      isActive: true,
      clinicId: clinic.id,
    },
  });

  await prisma.patient.upsert({
    where: { id: PATIENT_HASAN_ID },
    update: {
      firstName: 'Hasan',
      lastName: 'Şahin',
      phone: '0555 777 88 99',
      email: 'hasan.sahin@example.com',
      birthDate: new Date(1980, 5, 5),
      address: 'Sakarya',
      notes: 'Demo patient (henüz randevusu yok)',
      isActive: true,
      clinicId: clinic.id,
    },
    create: {
      id: PATIENT_HASAN_ID,
      firstName: 'Hasan',
      lastName: 'Şahin',
      phone: '0555 777 88 99',
      email: 'hasan.sahin@example.com',
      birthDate: new Date(1980, 5, 5),
      address: 'Sakarya',
      notes: 'Demo patient (henüz randevusu yok)',
      isActive: true,
      clinicId: clinic.id,
    },
  });

  await prisma.patient.upsert({
    where: { id: PATIENT_HAKAN_ID },
    update: {
      firstName: 'Hakan',
      lastName: 'Öz',
      phone: '0555 888 99 00',
      email: 'hakan.oz@example.com',
      birthDate: new Date(1975, 10, 2),
      address: 'Sakarya',
      notes: 'Demo patient (pasif kayıt)',
      isActive: false,
      clinicId: clinic.id,
    },
    create: {
      id: PATIENT_HAKAN_ID,
      firstName: 'Hakan',
      lastName: 'Öz',
      phone: '0555 888 99 00',
      email: 'hakan.oz@example.com',
      birthDate: new Date(1975, 10, 2),
      address: 'Sakarya',
      notes: 'Demo patient (pasif kayıt)',
      isActive: false,
      clinicId: clinic.id,
    },
  });

  // --- Consent forms --------------------------------------------------------
  await prisma.consentForm.upsert({
    where: { id: CONSENT_AYSE_SIGNED_ID },
    update: {
      title: 'İmplant Tedavisi Onam Formu',
      formType: 'İmplant',
      content:
        'Hasta uygulanacak implant tedavisi hakkında bilgilendirildi ve onay verdi.',
      status: 'SIGNED',
      signedAt: localDateTime(-3, 10, 0),
      note: 'Demo signed consent form',
      isActive: true,
      clinicId: clinic.id,
      patientId: PATIENT_AYSE_ID,
    },
    create: {
      id: CONSENT_AYSE_SIGNED_ID,
      title: 'İmplant Tedavisi Onam Formu',
      formType: 'İmplant',
      content:
        'Hasta uygulanacak implant tedavisi hakkında bilgilendirildi ve onay verdi.',
      status: 'SIGNED',
      signedAt: localDateTime(-3, 10, 0),
      note: 'Demo signed consent form',
      isActive: true,
      clinicId: clinic.id,
      patientId: PATIENT_AYSE_ID,
    },
  });

  await prisma.consentForm.upsert({
    where: { id: CONSENT_MEHMET_PENDING_ID },
    update: {
      title: 'Kanal Tedavisi Onam Formu',
      formType: 'Tedavi',
      content: 'Hasta kanal tedavisi onam formunu inceleyecektir.',
      status: 'PENDING',
      signedAt: null,
      note: 'Demo pending consent form',
      isActive: true,
      clinicId: clinic.id,
      patientId: PATIENT_MEHMET_ID,
    },
    create: {
      id: CONSENT_MEHMET_PENDING_ID,
      title: 'Kanal Tedavisi Onam Formu',
      formType: 'Tedavi',
      content: 'Hasta kanal tedavisi onam formunu inceleyecektir.',
      status: 'PENDING',
      signedAt: null,
      note: 'Demo pending consent form',
      isActive: true,
      clinicId: clinic.id,
      patientId: PATIENT_MEHMET_ID,
    },
  });

  await prisma.consentForm.upsert({
    where: { id: CONSENT_FATMA_MISSING_ID },
    update: {
      title: 'Diş Çekimi Onam Formu',
      formType: 'Cerrahi',
      content: 'Hasta diş çekimi onam formunu henüz imzalamadı.',
      status: 'MISSING',
      signedAt: null,
      note: 'Demo missing consent form (Elif Doktor kapsamı dışında)',
      isActive: true,
      clinicId: clinic.id,
      patientId: PATIENT_FATMA_ID,
    },
    create: {
      id: CONSENT_FATMA_MISSING_ID,
      title: 'Diş Çekimi Onam Formu',
      formType: 'Cerrahi',
      content: 'Hasta diş çekimi onam formunu henüz imzalamadı.',
      status: 'MISSING',
      signedAt: null,
      note: 'Demo missing consent form (Elif Doktor kapsamı dışında)',
      isActive: true,
      clinicId: clinic.id,
      patientId: PATIENT_FATMA_ID,
    },
  });

  await prisma.consentForm.upsert({
    where: { id: CONSENT_HASAN_SIGNED_ID },
    update: {
      title: 'KVKK Aydınlatma ve Onam Formu',
      formType: 'KVKK',
      content:
        'Hasta kişisel verilerin işlenmesine ilişkin bilgilendirme formunu onayladı.',
      status: 'SIGNED',
      signedAt: localDateTime(-10, 9, 0),
      note: 'Demo signed consent form (Elif Doktor kapsamı dışında)',
      isActive: true,
      clinicId: clinic.id,
      patientId: PATIENT_HASAN_ID,
    },
    create: {
      id: CONSENT_HASAN_SIGNED_ID,
      title: 'KVKK Aydınlatma ve Onam Formu',
      formType: 'KVKK',
      content:
        'Hasta kişisel verilerin işlenmesine ilişkin bilgilendirme formunu onayladı.',
      status: 'SIGNED',
      signedAt: localDateTime(-10, 9, 0),
      note: 'Demo signed consent form (Elif Doktor kapsamı dışında)',
      isActive: true,
      clinicId: clinic.id,
      patientId: PATIENT_HASAN_ID,
    },
  });

  // --- Appointments -----------------------------------------------------
  if (doctor) {
    const todayAyseStart = localDateTime(0, 9, 0);
    const tomorrowMehmetStart = localDateTime(1, 10, 0);
    const pastCompletedStart = localDateTime(-3, 11, 0);
    const pastCancelledStart = localDateTime(-2, 14, 0);
    const canDemirFatmaStart = localDateTime(0, 13, 0);
    const softDeletedStart = localDateTime(-5, 9, 0);

    await prisma.appointment.upsert({
      where: { id: APPOINTMENT_TODAY_AYSE_ID },
      update: {
        title: 'Kontrol Randevusu',
        reason: 'Rutin diş kontrolü',
        startAt: todayAyseStart,
        endAt: addMinutes(todayAyseStart, 30),
        status: 'CONFIRMED',
        notes: 'Demo appointment',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        doctorId: doctor.id,
      },
      create: {
        id: APPOINTMENT_TODAY_AYSE_ID,
        title: 'Kontrol Randevusu',
        reason: 'Rutin diş kontrolü',
        startAt: todayAyseStart,
        endAt: addMinutes(todayAyseStart, 30),
        status: 'CONFIRMED',
        notes: 'Demo appointment',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        doctorId: doctor.id,
      },
    });

    await prisma.appointment.upsert({
      where: { id: APPOINTMENT_TOMORROW_MEHMET_ID },
      update: {
        title: 'Diş Muayenesi',
        reason: 'Genel muayene',
        startAt: tomorrowMehmetStart,
        endAt: addMinutes(tomorrowMehmetStart, 30),
        status: 'SCHEDULED',
        notes: 'Demo appointment',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_MEHMET_ID,
        doctorId: doctor.id,
      },
      create: {
        id: APPOINTMENT_TOMORROW_MEHMET_ID,
        title: 'Diş Muayenesi',
        reason: 'Genel muayene',
        startAt: tomorrowMehmetStart,
        endAt: addMinutes(tomorrowMehmetStart, 30),
        status: 'SCHEDULED',
        notes: 'Demo appointment',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_MEHMET_ID,
        doctorId: doctor.id,
      },
    });

    await prisma.appointment.upsert({
      where: { id: APPOINTMENT_PAST_COMPLETED_ID },
      update: {
        title: 'İmplant Kontrolü',
        reason: 'Implant sonrası kontrol',
        startAt: pastCompletedStart,
        endAt: addMinutes(pastCompletedStart, 45),
        status: 'COMPLETED',
        notes: 'Demo completed appointment',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        doctorId: doctor.id,
      },
      create: {
        id: APPOINTMENT_PAST_COMPLETED_ID,
        title: 'İmplant Kontrolü',
        reason: 'Implant sonrası kontrol',
        startAt: pastCompletedStart,
        endAt: addMinutes(pastCompletedStart, 45),
        status: 'COMPLETED',
        notes: 'Demo completed appointment',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        doctorId: doctor.id,
      },
    });

    await prisma.appointment.upsert({
      where: { id: APPOINTMENT_PAST_CANCELLED_ID },
      update: {
        title: 'Diş Temizliği',
        reason: 'Rutin diş temizliği',
        startAt: pastCancelledStart,
        endAt: addMinutes(pastCancelledStart, 30),
        status: 'CANCELLED',
        notes: 'Demo cancelled appointment',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_MEHMET_ID,
        doctorId: doctor.id,
      },
      create: {
        id: APPOINTMENT_PAST_CANCELLED_ID,
        title: 'Diş Temizliği',
        reason: 'Rutin diş temizliği',
        startAt: pastCancelledStart,
        endAt: addMinutes(pastCancelledStart, 30),
        status: 'CANCELLED',
        notes: 'Demo cancelled appointment',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_MEHMET_ID,
        doctorId: doctor.id,
      },
    });

    // Soft-deleted example: same shape as a completed appointment, but isActive=false.
    await prisma.appointment.upsert({
      where: { id: APPOINTMENT_SOFT_DELETED_ID },
      update: {
        title: 'Eski Kontrol Randevusu',
        reason: 'Rutin kontrol',
        startAt: softDeletedStart,
        endAt: addMinutes(softDeletedStart, 30),
        status: 'COMPLETED',
        notes: 'Demo soft-deleted appointment',
        isActive: false,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        doctorId: doctor.id,
      },
      create: {
        id: APPOINTMENT_SOFT_DELETED_ID,
        title: 'Eski Kontrol Randevusu',
        reason: 'Rutin kontrol',
        startAt: softDeletedStart,
        endAt: addMinutes(softDeletedStart, 30),
        status: 'COMPLETED',
        notes: 'Demo soft-deleted appointment',
        isActive: false,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        doctorId: doctor.id,
      },
    });

    // Can Demir's own appointment — must stay invisible to Elif Doktor's scope.
    await prisma.appointment.upsert({
      where: { id: APPOINTMENT_CAN_DEMIR_FATMA_ID },
      update: {
        title: 'Ortodonti Kontrolü',
        reason: 'Tel takibi',
        startAt: canDemirFatmaStart,
        endAt: addMinutes(canDemirFatmaStart, 30),
        status: 'CONFIRMED',
        notes: 'Demo appointment (Can Demir)',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_FATMA_ID,
        doctorId: secondDoctor.id,
      },
      create: {
        id: APPOINTMENT_CAN_DEMIR_FATMA_ID,
        title: 'Ortodonti Kontrolü',
        reason: 'Tel takibi',
        startAt: canDemirFatmaStart,
        endAt: addMinutes(canDemirFatmaStart, 30),
        status: 'CONFIRMED',
        notes: 'Demo appointment (Can Demir)',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_FATMA_ID,
        doctorId: secondDoctor.id,
      },
    });

    // --- Payments ---------------------------------------------------------
    await prisma.payment.upsert({
      where: { id: PAYMENT_AYSE_CARD_ID },
      update: {
        amount: new Prisma.Decimal('1500.00'),
        paymentMethod: 'CARD',
        paymentDate: addMinutes(todayAyseStart, 30),
        note: 'Demo payment',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        appointmentId: APPOINTMENT_TODAY_AYSE_ID,
      },
      create: {
        id: PAYMENT_AYSE_CARD_ID,
        amount: new Prisma.Decimal('1500.00'),
        paymentMethod: 'CARD',
        paymentDate: addMinutes(todayAyseStart, 30),
        note: 'Demo payment',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        appointmentId: APPOINTMENT_TODAY_AYSE_ID,
      },
    });

    await prisma.payment.upsert({
      where: { id: PAYMENT_AYSE_CASH_ID },
      update: {
        amount: new Prisma.Decimal('800.00'),
        paymentMethod: 'CASH',
        paymentDate: addMinutes(pastCompletedStart, 45),
        note: 'Demo payment',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        appointmentId: APPOINTMENT_PAST_COMPLETED_ID,
      },
      create: {
        id: PAYMENT_AYSE_CASH_ID,
        amount: new Prisma.Decimal('800.00'),
        paymentMethod: 'CASH',
        paymentDate: addMinutes(pastCompletedStart, 45),
        note: 'Demo payment',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        appointmentId: APPOINTMENT_PAST_COMPLETED_ID,
      },
    });

    // Hidden from Elif Doktor: tied to Can Demir's appointment.
    await prisma.payment.upsert({
      where: { id: PAYMENT_FATMA_TRANSFER_ID },
      update: {
        amount: new Prisma.Decimal('2200.00'),
        paymentMethod: 'BANK_TRANSFER',
        paymentDate: addMinutes(canDemirFatmaStart, 30),
        note: 'Demo payment (Can Demir kapsamı)',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_FATMA_ID,
        appointmentId: APPOINTMENT_CAN_DEMIR_FATMA_ID,
      },
      create: {
        id: PAYMENT_FATMA_TRANSFER_ID,
        amount: new Prisma.Decimal('2200.00'),
        paymentMethod: 'BANK_TRANSFER',
        paymentDate: addMinutes(canDemirFatmaStart, 30),
        note: 'Demo payment (Can Demir kapsamı)',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_FATMA_ID,
        appointmentId: APPOINTMENT_CAN_DEMIR_FATMA_ID,
      },
    });

    // Unlinked to any appointment — also hidden from Elif Doktor's payment scope.
    await prisma.payment.upsert({
      where: { id: PAYMENT_HASAN_UNLINKED_ID },
      update: {
        amount: new Prisma.Decimal('500.00'),
        paymentMethod: 'CARD',
        paymentDate: localDateTime(-1, 16, 0),
        note: 'Demo payment (randevusuz)',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_HASAN_ID,
        appointmentId: null,
      },
      create: {
        id: PAYMENT_HASAN_UNLINKED_ID,
        amount: new Prisma.Decimal('500.00'),
        paymentMethod: 'CARD',
        paymentDate: localDateTime(-1, 16, 0),
        note: 'Demo payment (randevusuz)',
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_HASAN_ID,
        appointmentId: null,
      },
    });

    // --- Treatment plans ----------------------------------------------------
    await prisma.treatmentPlan.upsert({
      where: { id: TREATMENT_PLAN_MEHMET_ACTIVE_ID },
      update: {
        description: 'Kanal tedavisi ve takip planı',
        priority: 'HIGH',
        status: 'ACTIVE',
        startDate: localDateTime(-1, 9, 0),
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_MEHMET_ID,
        doctorId: doctor.id,
      },
      create: {
        id: TREATMENT_PLAN_MEHMET_ACTIVE_ID,
        description: 'Kanal tedavisi ve takip planı',
        priority: 'HIGH',
        status: 'ACTIVE',
        startDate: localDateTime(-1, 9, 0),
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_MEHMET_ID,
        doctorId: doctor.id,
      },
    });

    await prisma.treatmentPlan.upsert({
      where: { id: TREATMENT_PLAN_AYSE_REVIEW_ID },
      update: {
        description: 'Diş beyazlatma sonrası kontrol planı',
        priority: 'NORMAL',
        status: 'REVIEW_PENDING',
        startDate: localDateTime(-7, 9, 0),
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        doctorId: doctor.id,
      },
      create: {
        id: TREATMENT_PLAN_AYSE_REVIEW_ID,
        description: 'Diş beyazlatma sonrası kontrol planı',
        priority: 'NORMAL',
        status: 'REVIEW_PENDING',
        startDate: localDateTime(-7, 9, 0),
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        doctorId: doctor.id,
      },
    });

    await prisma.treatmentPlan.upsert({
      where: { id: TREATMENT_PLAN_AYSE_COMPLETED_ID },
      update: {
        description: 'Dolgu tedavisi',
        priority: 'LOW',
        status: 'COMPLETED',
        startDate: localDateTime(-20, 9, 0),
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        doctorId: doctor.id,
      },
      create: {
        id: TREATMENT_PLAN_AYSE_COMPLETED_ID,
        description: 'Dolgu tedavisi',
        priority: 'LOW',
        status: 'COMPLETED',
        startDate: localDateTime(-20, 9, 0),
        isActive: true,
        clinicId: clinic.id,
        patientId: PATIENT_AYSE_ID,
        doctorId: doctor.id,
      },
    });
  }

  // --- Messages -----------------------------------------------------------
  if (secretaryUser && doctorUser) {
    await prisma.message.upsert({
      where: { id: MESSAGE_SECRETARY_TO_DOCTOR_ID },
      update: {
        subject: 'Kontrol randevusu hakkında',
        content: 'Ayşe Hanım için bugünkü kontrol randevusu onaylandı.',
        priority: 'NORMAL',
        isRead: false,
        clinicId: clinic.id,
        senderId: secretaryUser.id,
        receiverId: doctorUser.id,
      },
      create: {
        id: MESSAGE_SECRETARY_TO_DOCTOR_ID,
        subject: 'Kontrol randevusu hakkında',
        content: 'Ayşe Hanım için bugünkü kontrol randevusu onaylandı.',
        priority: 'NORMAL',
        isRead: false,
        clinicId: clinic.id,
        senderId: secretaryUser.id,
        receiverId: doctorUser.id,
      },
    });

    await prisma.message.upsert({
      where: { id: MESSAGE_DOCTOR_TO_SECRETARY_ID },
      update: {
        subject: 'Hasta randevu planlaması',
        content: 'Yarınki randevu programını birlikte gözden geçirelim.',
        priority: 'HIGH',
        isRead: true,
        clinicId: clinic.id,
        senderId: doctorUser.id,
        receiverId: secretaryUser.id,
      },
      create: {
        id: MESSAGE_DOCTOR_TO_SECRETARY_ID,
        subject: 'Hasta randevu planlaması',
        content: 'Yarınki randevu programını birlikte gözden geçirelim.',
        priority: 'HIGH',
        isRead: true,
        clinicId: clinic.id,
        senderId: doctorUser.id,
        receiverId: secretaryUser.id,
      },
    });

    await prisma.message.upsert({
      where: { id: MESSAGE_URGENT_ID },
      update: {
        subject: 'Acil hasta durumu',
        content: 'Bir hasta için acil kontrol talebi geldi, lütfen dönüş yapın.',
        priority: 'URGENT',
        isRead: false,
        clinicId: clinic.id,
        senderId: secretaryUser.id,
        receiverId: doctorUser.id,
      },
      create: {
        id: MESSAGE_URGENT_ID,
        subject: 'Acil hasta durumu',
        content: 'Bir hasta için acil kontrol talebi geldi, lütfen dönüş yapın.',
        priority: 'URGENT',
        isRead: false,
        clinicId: clinic.id,
        senderId: secretaryUser.id,
        receiverId: doctorUser.id,
      },
    });
  }

  console.log(
    `Seed completed: demo clinic "${clinic.name}" and ${DEMO_USERS.length} demo users are ready.`,
  );
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
