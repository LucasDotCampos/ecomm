import { ICreateSession } from "./createSession.model";
import { ICreateUser } from "./createUser.model";
import { ISession } from "./session.model";
import { IUser } from "./user.model";

export default interface IUserRepository {
  create({ name, email, password }: ICreateUser): Promise<void>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<IUser>;
  getByEmail(email: string): Promise<IUser>;
  createSession({ email, password }: ICreateSession): Promise<ISession>;
}
