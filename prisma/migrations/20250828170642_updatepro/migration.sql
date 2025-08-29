/*
  Warnings:

  - You are about to drop the column `discountPercent` on the `products` table. All the data in the column will be lost.
  - The `badge` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('FLAT', 'PERCENTAGE');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('HOT', 'NEW', 'UPCOMING', 'SALE', 'FEATURED', 'LIMITED', 'TRENDING', 'EXCLUSIVE');

-- AlterTable
ALTER TABLE "products" DROP COLUMN "discountPercent",
ADD COLUMN     "discountType" "DiscountType",
ADD COLUMN     "discountValue" DOUBLE PRECISION,
DROP COLUMN "badge",
ADD COLUMN     "badge" "ProductType" NOT NULL DEFAULT 'NEW';
