import { ICreateUser } from "../models/createUser.model";
import { IUser } from "../models/user.model";
import IUserRepository from "../models/userRepository.model";
import { IHashProvider } from "../providers/hashProvider/IHashProvider";

class UserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider
  ) {}

  async index(): Promise<IUser[]> {
    return await this.userRepository.index();
  }

  async getById(id: string): Promise<IUser> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new Error("User not found");

    return user;
  }

  async create({ password, name, email }: ICreateUser): Promise<void> {
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.getByEmail(email);
    if (user) throw new Error("User not found");
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
}

export default UserService;
