import { INewTest } from "../types/testData";
import * as testRepository from "../repositories/testRepository";
import e from "express";

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
  const result = {
    term: data.number,
    disciplines: "",
  };
  result.disciplines = data.disciplines.map((e: any) => {
    name: e.name;
  });
  return result;
}
export async function getAllByDisciplines() {
  const allData = await testRepository.getAllByDisciplines();
  const result = allData.map((e) => createResult(e));
  return allData;
}

export async function getAllByTeacher() {
  return await testRepository.getAllByTeacher();
}
