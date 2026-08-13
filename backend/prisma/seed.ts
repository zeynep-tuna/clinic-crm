import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
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

  for (const demoUser of DEMO_USERS) {
    const passwordHash = await hashPassword(DEMO_PASSWORD);

    await prisma.user.upsert({
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
