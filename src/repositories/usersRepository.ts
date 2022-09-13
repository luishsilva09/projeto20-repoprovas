import { insertUser } from "../types/userstype";
import client from "../dbStrategy/db";

export async function findUser(email:string){
    return await client.users.findUnique({where:{email: email}})
}
export async function insertNewUser(userData:insertUser ){
    await client.users.create({data:{
        name:userData.name,
        email:userData.email,
        password:userData.password   
    }})
}
