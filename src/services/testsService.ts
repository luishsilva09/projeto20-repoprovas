import { INewTest } from "../types/testData";
import * as testRepository from '../repositories/testRepository'


export async function newTest(testData:INewTest){
    return await testRepository.insertTest(testData)
}

export async function getAll(){
    return await testRepository.getAll()
}