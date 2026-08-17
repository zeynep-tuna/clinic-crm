-- CreateEnum
CREATE TYPE "TreatmentPlanStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'REVIEW_PENDING', 'POSTPONED');

-- CreateEnum
CREATE TYPE "TreatmentPlanPriority" AS ENUM ('HIGH', 'NORMAL', 'LOW');

-- CreateTable
CREATE TABLE "TreatmentPlan" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "TreatmentPlanPriority" NOT NULL DEFAULT 'NORMAL',
    "status" "TreatmentPlanStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clinicId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "TreatmentPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TreatmentPlan_clinicId_idx" ON "TreatmentPlan"("clinicId");

-- CreateIndex
CREATE INDEX "TreatmentPlan_clinicId_patientId_idx" ON "TreatmentPlan"("clinicId", "patientId");

-- CreateIndex
CREATE INDEX "TreatmentPlan_clinicId_doctorId_idx" ON "TreatmentPlan"("clinicId", "doctorId");

-- CreateIndex
CREATE INDEX "TreatmentPlan_clinicId_status_idx" ON "TreatmentPlan"("clinicId", "status");

-- CreateIndex
CREATE INDEX "TreatmentPlan_clinicId_priority_idx" ON "TreatmentPlan"("clinicId", "priority");

-- CreateIndex
CREATE INDEX "TreatmentPlan_clinicId_isActive_idx" ON "TreatmentPlan"("clinicId", "isActive");

-- CreateIndex
CREATE INDEX "TreatmentPlan_clinicId_startDate_idx" ON "TreatmentPlan"("clinicId", "startDate");

-- AddForeignKey
ALTER TABLE "TreatmentPlan" ADD CONSTRAINT "TreatmentPlan_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentPlan" ADD CONSTRAINT "TreatmentPlan_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentPlan" ADD CONSTRAINT "TreatmentPlan_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
