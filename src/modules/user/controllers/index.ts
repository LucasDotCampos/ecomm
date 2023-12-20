import { Request, Response } from "express";
import UserService from "../services";
import UserRepository from "../repository";
import BcryptHashProvider from "../providers/hashProvider";
import WebTokenProvider from "../providers/webTokenProvider";

class UserController {
  userService: UserService;
  hashProvider: BcryptHashProvider;
  userRepository: UserRepository;
  webtokenProvider: WebTokenProvider;

  constructor() {
    this.hashProvider = new BcryptHashProvider();
    this.userRepository = new UserRepository(this.hashProvider);
    this.webtokenProvider = new WebTokenProvider();
    this.userService = new UserService(
      this.userRepository,
      this.hashProvider,
      this.webtokenProvider
    );
  }

  async create(request: Request, response: Response) {
    try {
      const { email, name, password } = request.body;
      await this.userService.create({
        email,
        password,
        name,
      });
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await this.userService.delete(id);
      return response.sendStatus(200);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await this.userService.getById(id);
      return response.json(user);
    } catch (err: any) {
      return response.status(404).json(err.message);
    }
  }
  async createSession(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const session = await this.userService.createSession({ email, password });
      return response.json(session);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
  async changeRole(request: Request, response: Response) {
    try {
      const admin = request.userId;
      const { id, role } = request.body;
      await this.userService.changeRole({ admin, id, role });
      return response.sendStatus(200);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}

export default UserController;
