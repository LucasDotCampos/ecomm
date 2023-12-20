import Connection from "../../../shared/database/connection";
import { randomUUID } from "node:crypto";
import { ICreateProduct } from "../models/createUser.model";
import { IProduct } from "../models/product.model";
import { IProductRepository } from "../models/productRepository.model";

class ProductRepository implements IProductRepository {
  connection: Connection;

  constructor() {
    this.connection = new Connection();
  }

  async create({
    name,
    bar_code,
    description,
    price,
  }: ICreateProduct): Promise<void> {
    const id = randomUUID();
    this.connection.query(
      `INSERT INTO products (id, name, bar_code, description, price)
         VALUES ($1, $2, $3, $4, $5)`,
      [id, name, bar_code, description, price]
    );
  }
  async delete(id: string): Promise<void> {
    await this.connection.query(
      `
    DELETE FROM products  WHERE id = $1    
    `,
      [id]
    );
  }
  async getById(id: string): Promise<IProduct> {
    const [product] = await this.connection.query(
      `SELECT * FROM products
       WHERE id = $1`,
      [id]
    );
    return product;
  }
  async index(): Promise<IProduct[]> {
    return await this.connection.query(`SELECT * FROM products`, []);
  }
}
export default ProductRepository;
