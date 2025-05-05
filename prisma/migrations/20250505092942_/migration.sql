/*
  Warnings:

  - Added the required column `institution` to the `PatientData` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `institution` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Institution" AS ENUM ('SMC', 'NCCE', 'Juntendo', 'Okayama');

-- AlterTable
ALTER TABLE "PatientData" DROP COLUMN "institution",
ADD COLUMN     "institution" "Institution" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "institution",
ADD COLUMN     "institution" "Institution" NOT NULL;
