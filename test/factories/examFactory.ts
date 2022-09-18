import { faker } from "@faker-js/faker";

export function createTestData() {
  const data = {
    name: faker.name.firstName(),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    disciplineId: 1,
    teacherId: 1,
  };
  return data;
}

export function userDataCreate() {
  const password = faker.internet.password(8);
  const userData = {
    email: faker.internet.email(),
    password: password,
    repeatPassword: password,
  };
  return userData;
}
