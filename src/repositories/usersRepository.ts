import { insertUser } from "../types/userstype";
import client from "../dbStrategy/db";

export async function findUser(email: string) {
  return await client.user.findUnique({ where: { email: email } });
}
export async function insertNewUser(userData: insertUser) {
  await client.user.create({
    data: {
      email: userData.email,
      password: userData.password,
    },
  });
}
