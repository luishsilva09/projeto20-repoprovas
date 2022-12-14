export interface INewUser {
  email: string;
  password: string;
  repeatPassword: string;
}

export type insertUser = Omit<INewUser, "repeatPassword">;
export type signinData = Omit<INewUser, "repeatPassword" | "name">;
