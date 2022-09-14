import { Request,Response} from 'express'
import { INewTest } from '../types/testData'
import * as testService from '../services/testsService';

export async function newTest(req:Request, res:Response){
    const newData:INewTest = req.body;
    const result = await testService.newTest(newData)
    res.status(201).send(result)
}

export async function getAllByDisciplines (req:Request, res:Response ){
    const result = await testService.getAllByDisciplines()
    res.status(200).send(result)
}

export async function getAllByTeacher(req:Request, res:Response ) {
    const result = await testService.getAllByTeacher()
    res.status(200).send(result)
}