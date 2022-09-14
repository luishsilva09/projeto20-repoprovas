import { INewTest } from "../types/testData";
import * as testRepository from '../repositories/testRepository'


export async function newTest(testData:INewTest){
    const existCategory = await testRepository.findCategory(testData.categoryId);
    const existDiscipline = await testRepository.findDiscipline(testData.disciplineId);
    const [ teacherDisciplineId ]= await testRepository.findTeacherDiscipline(testData.disciplineId,testData.teacherId);

    if(!existCategory || !existDiscipline || !teacherDisciplineId) throw {code:'NotFound',message:'Dados não encontrados'};
     
    const insertData = {
        name:testData.name,
        pdfUrl:testData.pdfUrl,
        categoryId:testData.categoryId,
        teacherDisciplineId:teacherDisciplineId.id
        
    }
    return await testRepository.insertTest(insertData)
     
}

export async function getAll(){
    return await testRepository.getAll()
}