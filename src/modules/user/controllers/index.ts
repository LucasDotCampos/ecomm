import { Request, Response } from "express";
import UserService from "../services";
import UserRepository from "../repository";
import BcryptHashProvider from "../providers/hashProvider/bcryptHashProvider";

class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService(
      new UserRepository(),
      new BcryptHashProvider()
    );
  }
  async index(request: Request, response: Response) {
    const users = await this.userService.index();
    return response.json(users);
  }

  async create(request: Request, response: Response) {
    try {
      const { email, name, password } = request.body;
      const user = await this.userService.create({
        email,
        password,
        name,
      });
      return response.json(user);
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
}

export default UserController;
