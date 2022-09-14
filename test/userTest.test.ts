import app from '../src/app';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import client from '../src/dbStrategy/db';

beforeAll(async ()=>{
    await client.$executeRaw`TRUNCATE TABLE user`
})

describe('POST /users', ()=>{
    const password = faker.internet.password(8)
    const userData = {
            email:faker.internet.email(),
            password:password,
            repeatPassword: password
        }

    it('Create new user', async()=>{
        const result = await supertest(app).post("/users/signup").send(userData);
        const createdUser = await client.user.findUnique({where:{email:userData.email}});

        expect(result.status).toBe(201);
        expect(createdUser).not.toBeNull();
    })
    it('Exist email conflict',async ()=>{
        const result = await supertest(app).post("/users/signup").send(userData);
        expect(result.status).toBe(409)
    })

    it('Login with user', async()=> {
        const result = await supertest(app).post('/users/signin').send({email:userData.email,password:userData.password})

        expect(result.body).toBeInstanceOf(Object)
    })

    it('Login with wrong password/email',async()=>{
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