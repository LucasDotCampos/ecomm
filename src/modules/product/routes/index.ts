import { Router } from "express";
import ProductController from "../controllers";

export const productRoutes = Router();

const productController = new ProductController();

productRoutes.get("/", productController.index.bind(productController));
productRoutes.post("/create", productController.create.bind(productController));
