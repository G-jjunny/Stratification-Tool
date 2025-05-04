-- CreateTable
CREATE TABLE "PatientData" (
    "id" TEXT NOT NULL,
    "isReceived" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "isMale" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "operationDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PatientData_id_key" ON "PatientData"("id");
