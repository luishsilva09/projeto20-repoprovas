import { insertUser } from "../types/userstype";
import client from "../dbStrategy/db";

export async function findUser(email: string) {
  const result = await client.user.findUnique({ where: { email } });
  return result;
}
export async function insertNewUser(userData: insertUser) {
  await client.user.create({
    data: {
      email: userData.email,
      password: userData.password,
    },
  });
}
