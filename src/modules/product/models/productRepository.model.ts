import { ICreateProduct } from "./createUser.model";
import { IProduct } from "./product.model";

export interface IProductRepository {
  create({ name, bar_code, description, price }: ICreateProduct): Promise<void>;
  index(): Promise<IProduct[]>;
}
