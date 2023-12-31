import { Router } from "express";
import UserController from "../controllers";
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";

export const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/:id", userController.getById.bind(userController));
userRoutes.post("/signup", userController.create.bind(userController));
userRoutes.delete(
  "/delete/:id",
  isAuthenticated,
  userController.delete.bind(userController)
);
userRoutes.patch(
  "/role",
  isAuthenticated,
  userController.changeRole.bind(userController)
);
userRoutes.post("/session", userController.createSession.bind(userController));
