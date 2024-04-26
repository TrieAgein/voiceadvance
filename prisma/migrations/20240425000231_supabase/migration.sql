/*
  Warnings:

  - The `email` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DEFAULT 'Anonymous',
DROP COLUMN "email",
ADD COLUMN     "email" BYTEA;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
