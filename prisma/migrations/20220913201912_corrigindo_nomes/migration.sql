/*
  Warnings:

  - You are about to drop the column `diciplineId` on the `teacher_dicipline` table. All the data in the column will be lost.
  - You are about to drop the column `teacherDiciplineId` on the `tests` table. All the data in the column will be lost.
  - Added the required column `disciplineId` to the `teacher_dicipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherDisciplineId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "teacher_dicipline" DROP CONSTRAINT "teacher_dicipline_diciplineId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacherDiciplineId_fkey";

-- AlterTable
ALTER TABLE "teacher_dicipline" DROP COLUMN "diciplineId",
ADD COLUMN     "disciplineId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "teacherDiciplineId",
ADD COLUMN     "teacherDisciplineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "teacher_dicipline" ADD CONSTRAINT "teacher_dicipline_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "teacher_dicipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
