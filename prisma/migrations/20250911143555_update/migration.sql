/*
  Warnings:

  - You are about to drop the column `available` on the `special_offers` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `special_offers` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `special_offers` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `special_offers` table. All the data in the column will be lost.
  - You are about to drop the column `sold` on the `special_offers` table. All the data in the column will be lost.
  - You are about to drop the column `subcategory` on the `special_offers` table. All the data in the column will be lost.
  - You are about to drop the column `timer` on the `special_offers` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `special_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `special_offers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "special_offers" DROP CONSTRAINT "special_offers_category_fkey";

-- AlterTable
ALTER TABLE "special_offers" DROP COLUMN "available",
DROP COLUMN "category",
DROP COLUMN "discount",
DROP COLUMN "price",
DROP COLUMN "sold",
DROP COLUMN "subcategory",
DROP COLUMN "timer",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "special_offers" ADD CONSTRAINT "special_offers_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
