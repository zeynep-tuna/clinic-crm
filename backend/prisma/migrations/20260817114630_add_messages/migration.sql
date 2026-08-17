-- CreateEnum
CREATE TYPE "MessagePriority" AS ENUM ('URGENT', 'HIGH', 'NORMAL', 'LOW');

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "priority" "MessagePriority" NOT NULL DEFAULT 'NORMAL',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clinicId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Message_clinicId_idx" ON "Message"("clinicId");

-- CreateIndex
CREATE INDEX "Message_clinicId_receiverId_idx" ON "Message"("clinicId", "receiverId");

-- CreateIndex
CREATE INDEX "Message_clinicId_senderId_idx" ON "Message"("clinicId", "senderId");

-- CreateIndex
CREATE INDEX "Message_clinicId_receiverId_isRead_idx" ON "Message"("clinicId", "receiverId", "isRead");

-- CreateIndex
CREATE INDEX "Message_clinicId_createdAt_idx" ON "Message"("clinicId", "createdAt");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
