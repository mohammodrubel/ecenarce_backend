/*
  Warnings:

  - You are about to drop the `SpecialOffer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SpecialOffer";

-- CreateTable
CREATE TABLE "special_offers" (
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

    CONSTRAINT "special_offers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "special_offers" ADD CONSTRAINT "special_offers_category_fkey" FOREIGN KEY ("category") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
