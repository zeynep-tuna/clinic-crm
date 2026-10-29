-- CreateEnum
CREATE TYPE "RadiographType" AS ENUM ('PANORAMIC', 'BITEWING', 'PERIAPICAL');

-- CreateEnum
CREATE TYPE "RadiographAnalysisStatus" AS ENUM ('NOT_ANALYZED', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "FindingSource" AS ENUM ('AI', 'DOCTOR');

-- CreateEnum
CREATE TYPE "FindingReviewStatus" AS ENUM ('SUGGESTED', 'CONFIRMED', 'REJECTED');

-- CreateTable
CREATE TABLE "Radiograph" (
    "id" TEXT NOT NULL,
    "type" "RadiographType" NOT NULL DEFAULT 'PANORAMIC',
    "storageKey" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "takenAt" TIMESTAMP(3),
    "note" TEXT,
    "analysisStatus" "RadiographAnalysisStatus" NOT NULL DEFAULT 'NOT_ANALYZED',
    "modelVersion" TEXT,
    "analyzedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clinicId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,

    CONSTRAINT "Radiograph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RadiographFinding" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "toothFdi" INTEGER,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "confidence" DOUBLE PRECISION,
    "source" "FindingSource" NOT NULL,
    "reviewStatus" "FindingReviewStatus" NOT NULL DEFAULT 'SUGGESTED',
    "reviewedAt" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clinicId" TEXT NOT NULL,
    "radiographId" TEXT NOT NULL,
    "reviewedById" TEXT,

    CONSTRAINT "RadiographFinding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Radiograph_storageKey_key" ON "Radiograph"("storageKey");

-- CreateIndex
CREATE INDEX "Radiograph_clinicId_idx" ON "Radiograph"("clinicId");

-- CreateIndex
CREATE INDEX "Radiograph_clinicId_patientId_idx" ON "Radiograph"("clinicId", "patientId");

-- CreateIndex
CREATE INDEX "Radiograph_clinicId_isActive_idx" ON "Radiograph"("clinicId", "isActive");

-- CreateIndex
CREATE INDEX "Radiograph_clinicId_createdAt_idx" ON "Radiograph"("clinicId", "createdAt");

-- CreateIndex
CREATE INDEX "RadiographFinding_clinicId_idx" ON "RadiographFinding"("clinicId");

-- CreateIndex
CREATE INDEX "RadiographFinding_clinicId_radiographId_idx" ON "RadiographFinding"("clinicId", "radiographId");

-- CreateIndex
CREATE INDEX "RadiographFinding_clinicId_reviewStatus_idx" ON "RadiographFinding"("clinicId", "reviewStatus");

-- AddForeignKey
ALTER TABLE "Radiograph" ADD CONSTRAINT "Radiograph_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Radiograph" ADD CONSTRAINT "Radiograph_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Radiograph" ADD CONSTRAINT "Radiograph_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadiographFinding" ADD CONSTRAINT "RadiographFinding_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadiographFinding" ADD CONSTRAINT "RadiographFinding_radiographId_fkey" FOREIGN KEY ("radiographId") REFERENCES "Radiograph"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadiographFinding" ADD CONSTRAINT "RadiographFinding_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
