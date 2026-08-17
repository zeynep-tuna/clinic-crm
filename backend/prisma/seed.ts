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

const DEMO_PATIENT_1_ID = '11111111-1111-4111-8111-111111111111';
const DEMO_PATIENT_2_ID = '22222222-2222-4222-8222-222222222222';

const DEMO_APPOINTMENT_1_ID = '33333333-3333-4333-8333-333333333333';
const DEMO_APPOINTMENT_2_ID = '44444444-4444-4444-8444-444444444444';
const DEMO_PAYMENT_1_ID = '55555555-5555-4555-8555-555555555555';

const DEMO_CONSENT_FORM_1_ID = '66666666-6666-4666-8666-666666666666';
const DEMO_CONSENT_FORM_2_ID = '77777777-7777-4777-8777-777777777777';
const DEMO_TREATMENT_PLAN_1_ID = '88888888-8888-4888-8888-888888888888';

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
  }

  let doctor: Awaited<ReturnType<typeof prisma.doctor.upsert>> | null = null;

  if (doctorUser) {
    doctor = await prisma.doctor.upsert({
      where: { userId: doctorUser.id },
      update: {
        fullName: doctorUser.fullName,
        clinicId: clinic.id,
        isActive: true,
      },
      create: {
        userId: doctorUser.id,
        clinicId: clinic.id,
        fullName: doctorUser.fullName,
        isActive: true,
      },
    });
  }

  await prisma.patient.upsert({
    where: { id: DEMO_PATIENT_1_ID },
    update: {
      firstName: 'Ayşe',
      lastName: 'Yılmaz',
      phone: '0555 111 22 33',
      email: 'ayse.yilmaz@example.com',
      birthDate: new Date('1992-04-15T00:00:00.000Z'),
      address: 'Sakarya',
      notes: 'Demo patient',
      isActive: true,
      clinicId: clinic.id,
    },
    create: {
      id: DEMO_PATIENT_1_ID,
      firstName: 'Ayşe',
      lastName: 'Yılmaz',
      phone: '0555 111 22 33',
      email: 'ayse.yilmaz@example.com',
      birthDate: new Date('1992-04-15T00:00:00.000Z'),
      address: 'Sakarya',
      notes: 'Demo patient',
      isActive: true,
      clinicId: clinic.id,
    },
  });

  await prisma.patient.upsert({
    where: { id: DEMO_PATIENT_2_ID },
    update: {
      firstName: 'Mehmet',
      lastName: 'Kaya',
      phone: '0555 444 55 66',
      email: 'mehmet.kaya@example.com',
      birthDate: new Date('1987-09-20T00:00:00.000Z'),
      address: 'Sakarya',
      notes: 'Demo patient',
      isActive: true,
      clinicId: clinic.id,
    },
    create: {
      id: DEMO_PATIENT_2_ID,
      firstName: 'Mehmet',
      lastName: 'Kaya',
      phone: '0555 444 55 66',
      email: 'mehmet.kaya@example.com',
      birthDate: new Date('1987-09-20T00:00:00.000Z'),
      address: 'Sakarya',
      notes: 'Demo patient',
      isActive: true,
      clinicId: clinic.id,
    },
  });

  await prisma.consentForm.upsert({
    where: { id: DEMO_CONSENT_FORM_1_ID },
    update: {
      title: 'Tedavi Onam Formu',
      formType: 'TREATMENT_CONSENT',
      content:
        'Hasta uygulanacak tedavi hakkında bilgilendirildi ve onay verdi.',
      status: 'SIGNED',
      signedAt: new Date('2026-08-18T08:00:00.000Z'),
      note: 'Demo signed consent form',
      isActive: true,
      clinicId: clinic.id,
      patientId: DEMO_PATIENT_1_ID,
    },
    create: {
      id: DEMO_CONSENT_FORM_1_ID,
      title: 'Tedavi Onam Formu',
      formType: 'TREATMENT_CONSENT',
      content:
        'Hasta uygulanacak tedavi hakkında bilgilendirildi ve onay verdi.',
      status: 'SIGNED',
      signedAt: new Date('2026-08-18T08:00:00.000Z'),
      note: 'Demo signed consent form',
      isActive: true,
      clinicId: clinic.id,
      patientId: DEMO_PATIENT_1_ID,
    },
  });

  await prisma.consentForm.upsert({
    where: { id: DEMO_CONSENT_FORM_2_ID },
    update: {
      title: 'KVKK Onam Formu',
      formType: 'KVKK_CONSENT',
      content:
        'Hasta kişisel verilerin işlenmesine ilişkin bilgilendirme formunu inceleyecektir.',
      status: 'PENDING',
      signedAt: null,
      note: 'Demo pending consent form',
      isActive: true,
      clinicId: clinic.id,
      patientId: DEMO_PATIENT_2_ID,
    },
    create: {
      id: DEMO_CONSENT_FORM_2_ID,
      title: 'KVKK Onam Formu',
      formType: 'KVKK_CONSENT',
      content:
        'Hasta kişisel verilerin işlenmesine ilişkin bilgilendirme formunu inceleyecektir.',
      status: 'PENDING',
      signedAt: null,
      note: 'Demo pending consent form',
      isActive: true,
      clinicId: clinic.id,
      patientId: DEMO_PATIENT_2_ID,
    },
  });

  if (doctor) {
    await prisma.appointment.upsert({
      where: { id: DEMO_APPOINTMENT_1_ID },
      update: {
        title: 'Kontrol Randevusu',
        reason: 'Rutin diş kontrolü',
        startAt: new Date('2026-08-20T06:00:00.000Z'),
        endAt: new Date('2026-08-20T06:30:00.000Z'),
        status: 'SCHEDULED',
        notes: 'Demo appointment',
        isActive: true,
        clinicId: clinic.id,
        patientId: DEMO_PATIENT_1_ID,
        doctorId: doctor.id,
      },
      create: {
        id: DEMO_APPOINTMENT_1_ID,
        title: 'Kontrol Randevusu',
        reason: 'Rutin diş kontrolü',
        startAt: new Date('2026-08-20T06:00:00.000Z'),
        endAt: new Date('2026-08-20T06:30:00.000Z'),
        status: 'SCHEDULED',
        notes: 'Demo appointment',
        isActive: true,
        clinicId: clinic.id,
        patientId: DEMO_PATIENT_1_ID,
        doctorId: doctor.id,
      },
    });

    await prisma.appointment.upsert({
      where: { id: DEMO_APPOINTMENT_2_ID },
      update: {
        title: 'Diş Muayenesi',
        reason: 'Genel muayene',
        startAt: new Date('2026-08-20T07:00:00.000Z'),
        endAt: new Date('2026-08-20T07:30:00.000Z'),
        status: 'SCHEDULED',
        notes: 'Demo appointment',
        isActive: true,
        clinicId: clinic.id,
        patientId: DEMO_PATIENT_2_ID,
        doctorId: doctor.id,
      },
      create: {
        id: DEMO_APPOINTMENT_2_ID,
        title: 'Diş Muayenesi',
        reason: 'Genel muayene',
        startAt: new Date('2026-08-20T07:00:00.000Z'),
        endAt: new Date('2026-08-20T07:30:00.000Z'),
        status: 'SCHEDULED',
        notes: 'Demo appointment',
        isActive: true,
        clinicId: clinic.id,
        patientId: DEMO_PATIENT_2_ID,
        doctorId: doctor.id,
      },
    });

    await prisma.payment.upsert({
      where: { id: DEMO_PAYMENT_1_ID },
      update: {
        amount: new Prisma.Decimal('1500.00'),
        paymentMethod: 'CARD',
        paymentDate: new Date('2026-08-20T06:35:00.000Z'),
        note: 'Demo payment',
        isActive: true,
        clinicId: clinic.id,
        patientId: DEMO_PATIENT_1_ID,
        appointmentId: DEMO_APPOINTMENT_1_ID,
      },
      create: {
        id: DEMO_PAYMENT_1_ID,
        amount: new Prisma.Decimal('1500.00'),
        paymentMethod: 'CARD',
        paymentDate: new Date('2026-08-20T06:35:00.000Z'),
        note: 'Demo payment',
        isActive: true,
        clinicId: clinic.id,
        patientId: DEMO_PATIENT_1_ID,
        appointmentId: DEMO_APPOINTMENT_1_ID,
      },
    });

    await prisma.treatmentPlan.upsert({
      where: { id: DEMO_TREATMENT_PLAN_1_ID },
      update: {
        description: 'Dolgu ve kontrol tedavi planı',
        priority: 'HIGH',
        status: 'ACTIVE',
        startDate: new Date('2026-08-18T07:00:00.000Z'),
        isActive: true,
        clinicId: clinic.id,
        patientId: DEMO_PATIENT_1_ID,
        doctorId: doctor.id,
      },
      create: {
        id: DEMO_TREATMENT_PLAN_1_ID,
        description: 'Dolgu ve kontrol tedavi planı',
        priority: 'HIGH',
        status: 'ACTIVE',
        startDate: new Date('2026-08-18T07:00:00.000Z'),
        isActive: true,
        clinicId: clinic.id,
        patientId: DEMO_PATIENT_1_ID,
        doctorId: doctor.id,
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
