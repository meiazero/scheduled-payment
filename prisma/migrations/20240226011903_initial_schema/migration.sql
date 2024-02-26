-- CreateTable
CREATE TABLE "payment_schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "payment_date" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending'
);
