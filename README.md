# ClinicCRM

Diş klinikleri için hasta, doktor, randevu, ödeme, onam formu, tedavi planı ve klinik içi mesajlaşma yönetimi sunan rol tabanlı CRM.

## Tech Stack

**Frontend**
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

**Backend**
- NestJS 11
- Prisma ORM 7
- PostgreSQL
- JWT Authentication (`@nestjs/jwt`)

**Database / Dev**
- PostgreSQL 16 (Docker, `docker-compose.yml`)

## Roles

ClinicCRM has three roles, each with its own scoped dashboard and screens.

**ADMIN — Klinik Yöneticisi**
Clinic genelinde tam yönetim: hastalar, doktorlar, randevular, ödemeler, onam formları ve raporlar.

**SECRETARY — Sekreter**
Hasta ve randevu operasyonları, doktor takvimi, ödemeler, onam formları ve mesajlaşma.

**DOCTOR — Doktor**
Yalnızca backend service scope'una göre kendisiyle ilişkili hastalar/randevular, kendi tedavi planları, kendi randevularına bağlı ödemeler, ilgili hastaların onam formları ve mesajlaşma. Doctor ekranları büyük ölçüde read-only/scoped'dur.

## Major Features

- JWT login + role-based access control (ADMIN / SECRETARY / DOCTOR)
- Patients (create, update, soft delete / reactivate)
- Doctors
- Appointments
- Payments
- Consent Forms
- Treatment Plans
- Internal messaging (User ↔ User)
- Role-specific dashboards (Admin / Secretary / Doctor)
- Admin Reports
- Doctor Schedule (Secretary view)
- Change Password (self-service, all roles)
- Soft delete / reactivation for Patients, Doctors, Payments, Consent Forms, Treatment Plans

## Project Structure

```
clinic-crm/
  backend/
    src/
    prisma/
  frontend/
    app/
    components/
    lib/
```

## Requirements

- Node.js
- npm
- PostgreSQL, or Docker Desktop (for the bundled `docker-compose.yml`)

## Environment Variables

### Backend (`backend/.env.example`)

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/cliniccrm?schema=public"
PORT=5000
JWT_SECRET="cliniccrm-dev-secret"
JWT_EXPIRES_IN="1d"
```

### Frontend (`frontend/.env.example`)

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Copy each `.env.example` to `.env` (backend) / `.env.local` (frontend) and adjust values for your machine before running the apps.

## Database Setup (Docker)

The repo ships a `docker-compose.yml` at the project root that runs PostgreSQL on `localhost:5433` with database `cliniccrm`. Make sure Docker Desktop is running, then from the project root:

```
docker compose up -d
```

This matches the default `DATABASE_URL` in `backend/.env.example`.

## Backend — Install & Run

```
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run start:dev
```

- `prisma migrate deploy` applies the committed migrations to your database (use this on a fresh clone — it does not create new migrations or prompt for input).
- `npm run db:seed` runs `backend/prisma/seed.ts`, which is idempotent and safe to re-run.
- Windows users: if `npm` isn't recognized in your shell, use `npm.cmd` instead.

Backend runs at **http://localhost:5000**.

## Frontend — Install & Run

```
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:3000**.

## Demo / Local Development Accounts

The seed script creates the following accounts. **These are demo/local seed credentials only — never use them as production credentials.**

| Role | Email | Password | Name |
|---|---|---|---|
| ADMIN | admin@cliniccrm.com | 123456 | Beyza Tuncer |
| SECRETARY | sekreter@cliniccrm.com | 123456 | Zeynep Kaya |
| DOCTOR | doktor@cliniccrm.com | 123456 | Elif Kaya |

## Demo Data

The seed is deterministic and idempotent (safe to run multiple times without creating duplicates). It creates a small, realistic demo dataset covering:

- Multiple patients (active and inactive)
- 2 doctors (one linked to a login account, one clinic-wide doctor with no login)
- Past, today, and future appointments across different statuses
- Payments across all payment methods
- Consent forms across all statuses
- Treatment plans
- Internal messages between Secretary and Doctor
- Doctor-scoped test data (patients/payments/consent forms deliberately outside the seeded Doctor's scope, to exercise access control)

## Important Security Design Note

Doctor access restrictions are **not** implemented as frontend filtering — they are enforced by backend service scope logic, which is the single source of truth:

- **Doctor Patients** → patients related through the doctor's own appointments or treatment plans
- **Doctor Appointments** → only appointments tied to the doctor's own profile
- **Doctor Payments** → only payments linked to the doctor's own appointments
- **Doctor Consent Forms** → only forms for the doctor's related patient set
- **Messages** → only messages where the current user is the sender or receiver

The frontend never sends a `doctorId` to scope these results — the backend resolves the requesting user's doctor profile from the authenticated JWT on every request.

## Build / Verification

```
cd backend
npm run build

cd frontend
npm run build
```

## Current Scope / Not Included

The following are intentionally out of scope for the current version — not bugs, just not built yet:

- Realtime / WebSocket notifications
- File / PDF consent form upload
- Password reset via email
- Patient-facing messaging (only User ↔ User messaging is supported)
- Advanced report export (PDF / Excel)
- Advanced clinic configuration
