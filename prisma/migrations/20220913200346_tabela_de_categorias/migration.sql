/*
  Warnings:

  - You are about to drop the `TeacherDicipline` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeacherDicipline" DROP CONSTRAINT "TeacherDicipline_diciplineId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherDicipline" DROP CONSTRAINT "TeacherDicipline_teacherId_fkey";

-- DropTable
DROP TABLE "TeacherDicipline";

-- CreateTable
CREATE TABLE "teacher_dicipline" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "diciplineId" INTEGER NOT NULL,

    CONSTRAINT "teacher_dicipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "teacher_dicipline" ADD CONSTRAINT "teacher_dicipline_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_dicipline" ADD CONSTRAINT "teacher_dicipline_diciplineId_fkey" FOREIGN KEY ("diciplineId") REFERENCES "diciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
