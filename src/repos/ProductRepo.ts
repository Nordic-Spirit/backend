import { ModelRepo } from './ModelRepo';

export interface MainpageProducts {
  id: number;
  name: string;
  url: string;
  price: number;
}

export class ProductRepo extends ModelRepo {
  async findAll(): Promise<any> {
    const result = await this.query(`
      SELECT *
      FROM products
      ORDER BY created_at DESC
      LIMIT 20
    `);

    return result;
  }

  async findLatest(): Promise<any> {
    const result = await this.query<MainpageProducts>(`
      SELECT
        id,
        name,
        url,
        price
      FROM products
      WHERE on_sale = TRUE
      ORDER BY created_at DESC
      LIMIT 10;
    `);

    return result;
  }
}
