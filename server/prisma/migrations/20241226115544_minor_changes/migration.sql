/*
  Warnings:

  - You are about to drop the column `locationId` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_locationId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "locationId";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_currentLocationId_fkey" FOREIGN KEY ("currentLocationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
