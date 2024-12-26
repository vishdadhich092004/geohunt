/*
  Warnings:

  - You are about to drop the column `locationId` on the `Guess` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Guess" DROP CONSTRAINT "Guess_locationId_fkey";

-- AlterTable
ALTER TABLE "Guess" DROP COLUMN "locationId";
