import { Response, Request } from "express";
import ProductService from "../services";
import ProductRepository from "../repositories";

class ProductController {
  productService: ProductService;
  constructor() {
    this.productService = new ProductService(new ProductRepository());
  }
  async index(request: Request, response: Response): Promise<Response> {
    const products = await this.productService.index();
    return response.json(products);
  }
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, bar_code, description, price } = request.body;
      await this.productService.create({ name, bar_code, description, price });
      return response.sendStatus(200);
    } catch (err: any) {
      return response.status(400).json(err);
    }
  }
}
export default ProductController;
