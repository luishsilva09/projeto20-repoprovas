import app from "../src/app";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import client from "../src/dbStrategy/db";
import * as userFactory from "../test/factories/userDataFactory";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE users;`;
});
afterAll(async () => {
  await client.$disconnect();
});
describe("POST /users", () => {
  it("Create new user", async () => {
    const userData = await userFactory.newUserData();

    const result = await supertest(app).post("/users/signup").send(userData);

    expect(result.status).toBe(201);
  });

  it("Exist email conflict", async () => {
    const userData = await userFactory.newUserData();

    await supertest(app).post("/users/signup").send(userData);
    const result = await supertest(app).post("/users/signup").send(userData);
    expect(result.status).toBe(409);
  });

  it("Login with user", async () => {
    const userData = await userFactory.newUserData();

    await supertest(app).post("/users/signup").send(userData);
    const result = await supertest(app)
      .post("/users/signin")
      .send({ email: userData.email, password: userData.password });

    expect(result.body).toBeInstanceOf(Object);
  });

  it("Login with wrong password/email", async () => {
    const userData = await userFactory.newUserData();

    await supertest(app).post("/users/signup").send(userData);

    const wrongPassword = await supertest(app)
      .post("/users/signin")
      .send({ email: userData.email, password: faker.internet.password() });
    const wrongEmail = await supertest(app)
      .post("/users/signin")
      .send({ email: faker.internet.email(), password: userData.password });

    expect(wrongPassword.status && wrongEmail.status).toBe(409);
  });
});
