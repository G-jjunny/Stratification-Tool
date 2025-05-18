/*
  Warnings:

  - Added the required column `serialNum` to the `PatientData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PatientData" ADD COLUMN     "serialNum" TEXT NOT NULL;
