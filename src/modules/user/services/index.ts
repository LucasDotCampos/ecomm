import { ICreateUser } from "../models/createUser.model";
import { IUser } from "../models/user.model";
import IUserRepository from "../models/userRepository.model";
import { IHashProvider } from "../models/hashProvider.model";
import { ICreateSession } from "../models/createSession.model";
import { ISession } from "../models/session.model";
import { IUpdateUser } from "../models/updateUser.model";
import { IWebTokenProvider } from "../models/webTokenProvider.model";

class UserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
    private webTokenProvider: IWebTokenProvider
  ) {}

  async getById(id: string): Promise<IUser> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new Error("User not found");

    return user;
  }

  async create({ password, name, email }: ICreateUser): Promise<void> {
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.userRepository.getByEmail(email);
    if (user) throw new Error("User already exists");
    this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  async delete(id: string): Promise<void> {
    const userExists = await this.userRepository.getById(id);
    if (!userExists) throw new Error("User not found");
    this.userRepository.delete(id);
  }

  async getByEmail(email: string): Promise<IUser> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new Error("User not found");
    return user;
  }

  async createSession({ email, password }: ICreateSession): Promise<ISession> {
    const user = await this.userRepository.getByEmail(email);
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
  async changeRole({ admin, id, role }: IUpdateUser): Promise<void> {
    const user = await this.userRepository.getById(admin);
    if (user.role === "client")
      throw new Error("You don't have permission to change role.");
    await this.userRepository.changeRole({ admin, id, role });
  }
}

export default UserService;
