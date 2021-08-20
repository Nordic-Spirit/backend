import { ModelRepo } from './ModelRepo';
import { CustomError } from '../errors/CustomError';
import { ProductCardProps, ProductProps } from './interfaces/Products';

export class ProductRepo extends ModelRepo {
  async find(): Promise<CustomError | ProductCardProps[]> {
    const result = await this.query<ProductCardProps>(`
      SELECT *
      FROM products
      ORDER BY created_at DESC
      LIMIT 20
    `);

    return result;
  }

  async findById(): Promise<any> {}

  async findLatest(): Promise<any> {
    const result = await this.query<ProductCardProps>(`
      SELECT
        products.id as product_id,
        products.name as product_name,
        products.url,
        products.price,
        categories.id as categorie_id,
        categories.name as categorie_name,
        (
          SELECT COUNT(*)
          FROM products_in_storages
          WHERE products_in_storages.product_id = products.id
        ) AS product_count
      FROM products
      JOIN categories ON categories.id = products.categorie_id
      WHERE products.on_sale = TRUE
      ORDER BY products.created_at DESC
      LIMIT 10;
    `);

    return result;
  }
}
