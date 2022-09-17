import client from "../dbStrategy/db";
import { IinsertData, INewTest } from "../types/testData";

export async function findCategory(categoryId: number) {
  return await client.category.findUnique({
    where: { id: categoryId },
  });
}
export async function findDiscipline(disciplineId: number) {
  return await client.discipline.findUnique({
    where: { id: disciplineId },
  });
}
export async function findTeacherDiscipline(
  disciplineId: number,
  teacherId: number
) {
  return await client.teacherDiscipline.findMany({
    where: {
      disciplineId: disciplineId,
      teacherId: teacherId,
    },
  });
}
export async function insertTest(testData: IinsertData) {
  return await client.test.create({ data: testData });
}

export async function getAllByDisciplines() {
  return await client.term.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          id: true,
          name: true,
          teacherDiscipline: {
            select: {
              teacher: {
                select: { name: true },
              },
              tests: {
                select: {
                  name: true,
                  pdfUrl: true,
                  category: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function getAllByTeacher() {
  return await client.teacher.findMany({
    select: {
      name: true,
      disciplines: {
        select: {
          discipline: {
            select: {
              name: true,
            },
          },
          tests: {
            select: {
              name: true,
              pdfUrl: true,
              category: true,
            },
          },
        },
      },
    },
  });
}
