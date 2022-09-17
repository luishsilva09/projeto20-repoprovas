import app from "../src/app";
import supertest from "supertest";
import client from "../src/dbStrategy/db";
import { createTestData } from "./factories/examFactory";
import { newUserData } from "./factories/userDataFactory";

async function userToken(userData: {
  email: string;
  password: string;
  repeatPassword: string;
}) {
  await supertest(app).post("/users/signup").send(userData);
  const token = await supertest(app)
    .post("/users/signin")
    .send({ email: userData.email, password: userData.password });
  return token;
}
beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE users`;
});
afterAll(async () => {
  await client.$disconnect();
});
describe("POST /tests ", () => {
  it("Create new test", async () => {
    const userData = await newUserData();
    const token = await userToken(userData);
    const testData = await createTestData();
    const result = await supertest(app)
      .post("/tests/create")
      .send(testData)
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(result.body).toBeInstanceOf(Object);
    expect(result.status).toEqual(201);
  });

  it("Verify response in get by discipline", async () => {
    const userData = await newUserData();
    const token = await userToken(userData);
    const result = await supertest(app).get("/tests/");
  });
  it.todo("Verify response in get by teacher");
});
