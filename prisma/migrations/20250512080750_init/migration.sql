-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "accountId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "institution" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientData" (
    "id" TEXT NOT NULL,
    "isReceived" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "isMale" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "operationDate" TEXT NOT NULL,
    "institution" TEXT,
    "group" TEXT,
    "droped" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_accountId_key" ON "User"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "PatientData_id_key" ON "PatientData"("id");
