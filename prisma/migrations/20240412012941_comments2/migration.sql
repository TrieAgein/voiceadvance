/*
  Warnings:

  - You are about to drop the column `feedback` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "feedback",
ADD COLUMN     "parent_comment_id" INTEGER;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("comment_id") ON DELETE SET NULL ON UPDATE CASCADE;
