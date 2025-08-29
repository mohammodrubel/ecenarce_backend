/*
  Warnings:

  - Made the column `description` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reviewsCount` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "discountEnd" TIMESTAMP(3),
ADD COLUMN     "discountPercent" DOUBLE PRECISION,
ADD COLUMN     "discountStart" TIMESTAMP(3),
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "reviewsCount" SET NOT NULL;

-- CreateTable
CREATE TABLE "SpecialOffer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "sold" INTEGER NOT NULL,
    "available" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "timer" TEXT NOT NULL,

    CONSTRAINT "SpecialOffer_pkey" PRIMARY KEY ("id")
);
