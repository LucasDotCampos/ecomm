import { Router } from "express";
import { userRoutes } from "../modules/user/routes";
import { productRoutes } from "../modules/product/routes";

export const routes = Router();

routes.use("/user", userRoutes);
routes.use("/product", productRoutes);
