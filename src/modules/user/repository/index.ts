import Connection from "../../../shared/database/connection";
import crypto from "node:crypto";
import { ICreateUser } from "../models/createUser.model";
import { IUser } from "../models/user.model";
import IUserRepository from "../models/userRepository.model";

class UserRepository implements IUserRepository {
  connection: Connection;
  constructor() {
    this.connection = new Connection();
  }
  async index() {
    const user = await this.connection.query("SELECT * FROM users", []);

    return user;
  }
  async create({ name, email, password }: ICreateUser): Promise<void> {
    const id = crypto.randomUUID();
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
      `SELECT * FROM users WHERE id = $1`,
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
}
export default UserRepository;
