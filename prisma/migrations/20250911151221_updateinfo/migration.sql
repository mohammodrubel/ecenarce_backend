/*
  Warnings:

  - Added the required column `date` to the `special_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `special_offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "special_offers" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;
