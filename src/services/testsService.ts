import { INewTest } from "../types/testData";
import * as testRepository from "../repositories/testRepository";

export async function newTest(testData: INewTest) {
  const existCategory = await testRepository.findCategory(testData.categoryId);
  const existDiscipline = await testRepository.findDiscipline(
    testData.disciplineId
  );
  const [teacherDisciplineId] = await testRepository.findTeacherDiscipline(
    testData.disciplineId,
    testData.teacherId
  );

  if (!existCategory || !existDiscipline || !teacherDisciplineId)
    throw { code: "NotFound", message: "Dados não encontrados" };

  const insertData = {
    name: testData.name,
    pdfUrl: testData.pdfUrl,
    categoryId: testData.categoryId,
    teacherDisciplineId: teacherDisciplineId.id,
  };
  return await testRepository.insertTest(insertData);
}
function createResult(data: any) {
  const result: { term: number; disciplines: Array<object> } = {
    term: data.number,
    disciplines: [],
  };
  if (data.disciplines.length === 0) return data;

  for (let i = 0; i < data.disciplines.length; i++) {
    const teste: { name: string; testsCategories: Array<object> } = {
      name: data.disciplines[i].name,
      testsCategories: [],
    };
    result.disciplines.push(teste);
    for (
      let j = 0;
      j < data.disciplines[i].teacherDiscipline[0].tests.length;
      j++
    ) {
      const testsTeacher = {
        ...data.disciplines[i].teacherDiscipline[0].tests[j].category,
        test: [
          {
            name: data.disciplines[i].teacherDiscipline[0].tests[j].name,
            pdfUrl: data.disciplines[i].teacherDiscipline[0].tests[j].pdfUrl,
            teacher: data.disciplines[i].teacherDiscipline[0].teacher.name,
          },
        ],
      };

      teste.testsCategories.push(testsTeacher);
    }
  }

  return result;
}
export async function getAllByDisciplines() {
  const allData = await testRepository.getAllByDisciplines();
  const result = allData.map((e) => createResult(e));
  return result;
}

export async function getAllByTeacher() {
  return await testRepository.getAllByTeacher();
}
