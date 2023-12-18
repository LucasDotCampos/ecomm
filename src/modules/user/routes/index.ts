import { Router } from "express";
import UserController from "../controllers";

export const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/", userController.index.bind(userController));
userRoutes.get("/:id", userController.getById.bind(userController));
userRoutes.post("/signup", userController.create.bind(userController));
userRoutes.delete("/delete/:id", userController.delete.bind(userController));
