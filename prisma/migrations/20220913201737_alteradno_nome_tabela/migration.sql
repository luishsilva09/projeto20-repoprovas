/*
  Warnings:

  - You are about to drop the `diciplines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "diciplines" DROP CONSTRAINT "diciplines_termId_fkey";

-- DropForeignKey
ALTER TABLE "teacher_dicipline" DROP CONSTRAINT "teacher_dicipline_diciplineId_fkey";

-- DropTable
DROP TABLE "diciplines";

-- CreateTable
CREATE TABLE "disciplines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "termId" INTEGER NOT NULL,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_name_key" ON "disciplines"("name");

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_dicipline" ADD CONSTRAINT "teacher_dicipline_diciplineId_fkey" FOREIGN KEY ("diciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
