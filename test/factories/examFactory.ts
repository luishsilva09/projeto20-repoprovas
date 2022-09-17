import { faker } from "@faker-js/faker";

export async function createTestData() {
  const data = {
    name: faker.name.firstName(),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    disciplineId: 1,
    teacherId: 1,
  };
  return data;
}
