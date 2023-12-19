import Connection from "../../../shared/database/connection";
import crypto from "node:crypto";
import { ICreateUser } from "../models/createUser.model";
import { IUser } from "../models/user.model";
import IUserRepository from "../models/userRepository.model";
import { ICreateSession } from "../models/createSession.model";
import { IHashProvider } from "../models/hashProvider.model";
import { IWebTokenProvider } from "../models/webTokenProvider.model";
import { ISession } from "../models/session.model";

class UserRepository implements IUserRepository {
  connection: Connection;
  constructor(
    private hashProvider: IHashProvider,
    private webTokenProvider: IWebTokenProvider
  ) {
    this.connection = new Connection();
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
  async createSession({ email, password }: ICreateSession): Promise<ISession> {
    const user = await this.getByEmail(email);
    if (!user) {
      throw new Error("email/password incorrect");
    }

    const passwordConfirmed = await this.hashProvider.compareHash(
      password,
      user.password
    );
    if (!passwordConfirmed) {
      throw new Error("email/password incorrect");
    }
    const token = await this.webTokenProvider.create(user.id);

    return { user, token };
  }
}
export default UserRepository;
