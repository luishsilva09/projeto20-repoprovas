import client from "../dbStrategy/db";
import { INewTest } from "../types/testData";

export async function insertTest(testData:INewTest){
    return await client.test.create({data:testData})
}

export async function getAll(){
     const teste2 = await client.term.findMany({
        select:{
            number:true,
            disciplines:{
                select:{
                    id:true,
                    name:true
                }
            }
        }
    })

    




     return teste2
}

