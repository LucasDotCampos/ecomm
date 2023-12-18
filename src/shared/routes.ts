import { Router } from "express";
import { userRoutes } from "../modules/user/routes";

export const routes = Router();

routes.use("/user", userRoutes);
