-- CreateTable
CREATE TABLE "Slider" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);
