/*
  Warnings:

  - You are about to drop the column `description` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "description",
DROP COLUMN "gameId",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
