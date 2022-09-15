import app from '../src/app';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import client from '../src/dbStrategy/db';
import * as userFactory from '../test/factories/userDataFactory';

beforeEach(async ()=>{
    await client.$executeRaw`TRUNCATE TABLE users`
})

async function createUserDb(userData:{email:string,password:string,repeatPassword:string}){
    await supertest(app).post("/users/signup").send(userData);
}

describe('POST /users', ()=>{

    it('Create new user', async()=>{
        const userData = await userFactory.newUserData();

        const result = await supertest(app).post("/users/signup").send(userData);
        const createdUser = await client.user.findUnique({where:{email:userData.email}});

        expect(result.status).toBe(201);
        expect(createdUser).not.toBeNull();
    })
    it('Exist email conflict',async ()=>{ 
        const userData = await userFactory.newUserData();
        
        await createUserDb(userData)
        const result = await supertest(app).post("/users/signup").send(userData);
        expect(result.status).toBe(409)
    })

    it('Login with user', async()=> {
        const userData = await userFactory.newUserData();

        await createUserDb(userData)
        const result = await supertest(app).post('/users/signin').send({email:userData.email,password:userData.password})

        expect(result.body).toBeInstanceOf(Object)
    })

    it('Login with wrong password/email',async()=>{
        const userData = await userFactory.newUserData();

        await createUserDb(userData);

        const wrongPassword = await supertest(app).post('/users/signin').send({email:userData.email,password:faker.internet.password()});
        const wrongEmail = await supertest(app).post('/users/signin').send({email:faker.internet.email(),password:userData.password});

        expect(wrongPassword.status && wrongEmail.status).toBe(409);
    })

    it('Empty data',async()=>{
       const signinEmpty =  await supertest(app).post('/users/signin').send('');
       const signupEmpty =  await supertest(app).post('/users/signin').send('');

       expect(signinEmpty.status && signupEmpty.status).toBe(422)
    })
})

afterAll(async() => {
    await client.$disconnect();
});