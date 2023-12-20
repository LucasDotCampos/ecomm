import Connection from "../../../shared/database/connection";
import { randomUUID } from "node:crypto";
import { ICreateUser } from "../models/createUser.model";
import { IUser } from "../models/user.model";
import IUserRepository from "../models/userRepository.model";
import { IHashProvider } from "../models/hashProvider.model";
import { IUpdateUser } from "../models/updateUser.model";

class UserRepository implements IUserRepository {
  connection: Connection;
  constructor(private hashProvider: IHashProvider) {
    this.connection = new Connection();
  }

  async create({ name, email, password }: ICreateUser): Promise<void> {
    const id = randomUUID();
    this.connection.query(
      `INSERT INTO users (id, name, email, password)
       VALUES ($1, $2, $3, $4)`,
      [id, name, email, password]
    );
  }
  async delete(id: string): Promise<void> {
    await this.connection.query(
      `DELETE FROM users
       WHERE id = $1`,
      [id]
    );
  }
  async getById(id: string): Promise<IUser> {
    const [user] = await this.connection.query(
      `SELECT id, email, address, cpf, name, created_at, updated_at
       FROM users
       WHERE id = $1`,
      [id]
    );
    return user;
  }
  async getByEmail(email: string): Promise<IUser> {
    const [user] = await this.connection.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return user;
  }

  async changeRole({ admin, id, role }: IUpdateUser): Promise<void> {
    await this.connection.query(
      `UPDATE users
       SET role = $1
       WHERE id = $2;`,
      [role, id]
    );
  }
}
export default UserRepository;
