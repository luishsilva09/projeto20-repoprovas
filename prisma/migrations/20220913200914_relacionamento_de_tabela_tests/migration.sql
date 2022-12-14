/*
  Warnings:

  - Added the required column `categoryId` to the `tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherDiciplineId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "teacherDiciplineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDiciplineId_fkey" FOREIGN KEY ("teacherDiciplineId") REFERENCES "teacher_dicipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
