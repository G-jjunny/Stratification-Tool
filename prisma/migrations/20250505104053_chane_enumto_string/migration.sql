-- AlterTable
ALTER TABLE "PatientData"
ALTER COLUMN "institution" TYPE TEXT USING "institution"::TEXT;

-- AlterTable
ALTER TABLE "User"
ALTER COLUMN "institution" TYPE TEXT USING "institution"::TEXT;

-- DropEnum
DROP TYPE "Institution";
