import { IUser } from "./user.model";

type UserWithoutPassword = Omit<IUser, "password">;

export interface ISession {
  user: UserWithoutPassword;
  token: string;
}
