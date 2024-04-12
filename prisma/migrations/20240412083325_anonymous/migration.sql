/*
  Warnings:

  - You are about to drop the column `anonymous` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "anonymous";

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT false;
