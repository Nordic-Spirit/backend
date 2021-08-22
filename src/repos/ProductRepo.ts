import { ModelRepo } from './ModelRepo';
import { ProductProps } from '../interfaces/Products';

export class ProductRepo extends ModelRepo {
  // TODO KESKEN
  async find(): Promise<ProductProps[]> {
    const result = await this.query<ProductProps>(`
      SELECT *
      FROM products
      ORDER BY created_at DESC
      LIMIT 20
    `);

    return result;
  }

  // TODO KESKEN
  async findById(id: number): Promise<ProductProps[]> {
    const result = await this.query<ProductProps>(
      `
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.url,
        p.description,
        p.price,
        p.alcohol,
        p.capacity,
        p.manufacturer,
        p.country_of_manufacturer,
        c.id AS category_id,
        c.name AS category_name,
        sc.id AS sub_category_id,
        sc.name AS sub_category_name
      FROM products AS p
      JOIN categories AS c ON c.id = p.category_id
      JOIN sub_categories AS sc ON sc.id = p.sub_category_id
      WHERE p.id = $1 AND p.on_sale = TRUE;
    `,
      [id]
    );

    return result;
  }

  async findLatest(): Promise<ProductProps[]> {
    const result = await this.query<ProductProps>(`
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.url AS product_url,
        p.price AS product_price,
        c.id AS category_id,
        c.name AS category_name,
        (
          SELECT COUNT(*)
          FROM products_in_storages AS pis
          WHERE pis.product_id = p.id
        ) AS product_count
      FROM products AS p
      JOIN categories AS c ON c.id = p.category_id
      WHERE p.on_sale = TRUE
      ORDER BY p.created_at DESC
      LIMIT 10;
    `);

    console.log('huhu');

    return result;
  }

  async findMostPopulars(): Promise<ProductProps[]> {
    const result = await this.query<ProductProps>(`
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.url AS product_url,
        p.price AS product_price,
        c.id AS categorie_id,
        c.name AS categorie_name,
        (
          SELECT COUNT(*)
          FROM products_in_storages
          WHERE products_in_storages.product_id = p.id
        ) AS product_count
      FROM products AS p
      JOIN (
        SELECT
          orders_products.product_id,
          COUNT(*) AS products_sold
        FROM orders_products
        WHERE EXTRACT(DAY FROM CURRENT_TIMESTAMP - orders_products.created_at) < 60
        GROUP BY product_id
      ) AS op
      ON op.product_id = p.id
      JOIN categories AS c ON c.id = p.category_id
      ORDER BY op.products_sold DESC
      LIMIT 10;
    `);

    return result;
  }
}
