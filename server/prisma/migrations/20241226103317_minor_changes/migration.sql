/*
  Warnings:

  - Added the required column `locationId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "currentLocationId" UUID,
ADD COLUMN     "locationId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
