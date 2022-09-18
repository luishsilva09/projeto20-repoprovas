import app from "../src/app";
import supertest from "supertest";
import client from "../src/dbStrategy/db";
import { createTestData, userDataCreate } from "./factories/examFactory";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE users;`;
  await client.$executeRaw`TRUNCATE TABLE tests`;
});
afterAll(async () => {
  await client.$disconnect();
});

async function getUserToken() {
  const userData = userDataCreate();
  const createUser = await supertest(app).post("/users/signup").send(userData);

  const token = await supertest(app)
    .post("/users/signin")
    .send({ email: userData.email, password: userData.password });

  return token.body.token;
}
describe("POST /tests ", () => {
  it("Create new test", async () => {
    const token = await getUserToken();

    const authUser = { Authorization: `Bearer ${token}` };

    const testData = createTestData();
    const result = await supertest(app)
      .post("/tests/create")
      .send(testData)
      .set(authUser);

    expect(result.body).toBeInstanceOf(Object);
    expect(result.status).toEqual(201);
  });

  it("Verify response in get by discipline", async () => {
    const token = await getUserToken();

    const authUser = { Authorization: `Bearer ${token}` };
    const result = await supertest(app)
      .get("/tests/getByDisciplines")
      .set(authUser);

    expect(result.body).toBeInstanceOf(Array);
    expect(result.body).not.toBeNull();
    expect(result.status).toBe(200);
  });

  it("Verify response in get by teacher", async () => {
    const token = await getUserToken();
    const result = await supertest(app)
      .get("/tests/getByDisciplines")
      .set("Authorization", `Bearer ${token}`);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body).not.toBeNull();
    expect(result.status).toBe(200);
  });
});
