import { ModelRepo } from './ModelRepo';
import { ProductCardProps, ProductProps } from './interfaces/Products';

export class ProductRepo extends ModelRepo {
  // TODO KESKEN
  async find(): Promise<ProductCardProps[]> {
    const result = await this.query<ProductCardProps>(`
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
        cat.id AS categorie_id,
        cat.name AS categorie_name,
        sc.id AS sub_categorie_id,
        sc.name AS sub_categorie_name
      FROM products AS p
      JOIN categories AS cat ON cat.id = p.categorie_id
      JOIN sub_categories AS sc ON sc.id = p.sub_categorie_id
      WHERE p.id = $1 AND p.on_sale = TRUE;
    `,
      [id]
    );

    return result;
  }

  async findLatest(): Promise<ProductCardProps[]> {
    const result = await this.query<ProductCardProps>(`
      SELECT
        products.id AS product_id,
        products.name AS product_name,
        products.url AS product_url,
        products.price AS product_price,
        categories.id AS categorie_id,
        categories.name AS categorie_name,
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

  async findMostPopulars(): Promise<ProductCardProps[]> {
    const result = await this.query<ProductCardProps>(`
      SELECT
        products.id AS product_id,
        products.name AS product_name,
        products.url AS product_url,
        products.price AS product_price,
        categories.id AS categorie_id,
        categories.name AS categorie_name,
        (
          SELECT COUNT(*)
          FROM products_in_storages
          WHERE products_in_storages.product_id = products.id
        ) AS product_count
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
