/*
  Warnings:

  - You are about to drop the `_UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserRole" DROP CONSTRAINT "_UserRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserRole" DROP CONSTRAINT "_UserRole_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT;

-- DropTable
DROP TABLE "_UserRole";
