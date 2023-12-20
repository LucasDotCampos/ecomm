import { ICreateProduct } from "../models/createUser.model";
import { IProduct } from "../models/product.model";
import { IProductRepository } from "../models/productRepository.model";

class ProductService {
  constructor(private productRepository: IProductRepository) {}
  async create({
    name,
    bar_code,
    description,
    price,
  }: ICreateProduct): Promise<void> {
    await this.productRepository.create({ name, bar_code, description, price });
  }
  async index(): Promise<IProduct[]> {
    return await this.productRepository.index();
  }
}
export default ProductService;
