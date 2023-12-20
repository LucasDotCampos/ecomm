import { ICreateUser } from "./createUser.model";
import { IUpdateUser } from "./updateUser.model";
import { IUser } from "./user.model";

export default interface IUserRepository {
  create({ name, email, password }: ICreateUser): Promise<void>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<IUser>;
  getByEmail(email: string): Promise<IUser>;
  changeRole({ id, role }: IUpdateUser): Promise<void>;
}
