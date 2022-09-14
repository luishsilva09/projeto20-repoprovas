import app from '../src/app';
import supertest from 'supertest';

describe('POST /users',async ()=>{
    it('Create new user',async ()=>{
        const result = await supertest(app).post("/users/create").send()

        expect(result.status).toBe(201)
    })
})