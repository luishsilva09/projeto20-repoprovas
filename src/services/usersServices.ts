import { INewUser, signinData } from "../types/userstype"
import * as usersRepository from '../repositories/usersRepository'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const secretKey = process.env.SECRET_KEY || ''

async function findUser(email:string){
    return await usersRepository.findUser(email)
}

export async function signup(newUserData:INewUser) {
    const userData = await findUser(newUserData.email);
    if(userData) throw {code:'Conflict', message:'Não autorizado'}

    const cryptPassword = bcrypt.hashSync(newUserData.password, 10)
    const inserData = {
        name:newUserData.name,
        email:newUserData.email,
        password:cryptPassword
    }
    await usersRepository.insertNewUser(inserData)
}

export async function signin(signinData:signinData) {
    const userData = await findUser(signinData.email);
    if(!userData) throw {code:'Conflict', message:'Verifique seus dados'};

    const confirmPassword = bcrypt.compareSync(signinData.password, userData.password)
    if(!confirmPassword) throw {code:'Conflict', message:'Verifique seus dados'};

    const token = jwt.sign({id:userData.id,name:userData.name},secretKey)

    return(token)
}