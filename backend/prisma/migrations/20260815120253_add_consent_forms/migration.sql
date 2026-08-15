-- CreateEnum
CREATE TYPE "ConsentFormStatus" AS ENUM ('SIGNED', 'PENDING', 'MISSING');

-- CreateTable
CREATE TABLE "ConsentForm" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "formType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "ConsentFormStatus" NOT NULL DEFAULT 'PENDING',
    "signedAt" TIMESTAMP(3),
    "note" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clinicId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "ConsentForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConsentForm_clinicId_idx" ON "ConsentForm"("clinicId");

-- CreateIndex
CREATE INDEX "ConsentForm_clinicId_patientId_idx" ON "ConsentForm"("clinicId", "patientId");

-- CreateIndex
CREATE INDEX "ConsentForm_clinicId_status_idx" ON "ConsentForm"("clinicId", "status");

-- CreateIndex
CREATE INDEX "ConsentForm_clinicId_isActive_idx" ON "ConsentForm"("clinicId", "isActive");

-- CreateIndex
CREATE INDEX "ConsentForm_clinicId_createdAt_idx" ON "ConsentForm"("clinicId", "createdAt");

-- AddForeignKey
ALTER TABLE "ConsentForm" ADD CONSTRAINT "ConsentForm_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsentForm" ADD CONSTRAINT "ConsentForm_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
