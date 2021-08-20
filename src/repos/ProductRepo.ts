import { ModelRepo } from './ModelRepo';
import { CustomError } from '../errors/CustomError';
import { ProductCardProps, ProductProps } from './interfaces/Products';

export class ProductRepo extends ModelRepo {
  // TODO KESKEN
  async find(): Promise<CustomError | ProductCardProps[]> {
    const result = await this.query<ProductCardProps>(`
      SELECT *
      FROM products
      ORDER BY created_at DESC
      LIMIT 20
    `);

    return result;
  }

  // TODO KESKEN
  async findById(id: number): Promise<any> {}

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
      FROM product
      JOIN categories ON categories.id = products.categorie_id
      WHERE products.on_sale = TRUE
      ORDER BY products.created_at DESC
      LIMIT 10;
    `);

    return result;
  }

  async findMostPopulars() {
    const result = await this.query<ProductCardProps>(`
      SELECT
        products.id AS product_id,
        products.name AS product_name,
        products.url,
        products.price,
        categories.id AS categorie_id,
        categories.name AS categorie_name,
        op.products_sold
      FROM products
      JOIN (
        SELECT
          orders_products.product_id,
          COUNT(*) AS products_sold
        FROM orders_products
        WHERE EXTRACT(DAY FROM CURRENT_TIMESTAMP - orders_products.created_at) < 60
        GROUP BY product_id
      ) AS op
      ON op.product_id = products.id
      JOIN categories ON categories.id = products.categorie_id
      ORDER BY op.products_sold DESC
      LIMIT 10;
    `);

    return result;
  }
}
