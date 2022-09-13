-- CreateTable
CREATE TABLE "TeacherDicipline" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "diciplineId" INTEGER NOT NULL,

    CONSTRAINT "TeacherDicipline_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeacherDicipline" ADD CONSTRAINT "TeacherDicipline_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherDicipline" ADD CONSTRAINT "TeacherDicipline_diciplineId_fkey" FOREIGN KEY ("diciplineId") REFERENCES "diciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
