/*
  Warnings:

  - Added the required column `termId` to the `diciplines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "diciplines" ADD COLUMN     "termId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "diciplines" ADD CONSTRAINT "diciplines_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
