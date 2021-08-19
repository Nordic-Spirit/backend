import pool from '../config/pool';
import { ModelRepo } from './ModelRepo';
export class ProductRepo extends ModelRepo {
  static async findAll(): Promise<any> {
    const client = await pool.connect();

    const { rows } = await pool.query(`
      SELECT * FROM products;
    `);

    client.release();

    return 'Toimii';
  }

  static async findLatest(): Promise<any> {
    const result = await this.query(`
      SELECT created_at
      FROM products
      ORDER BY created_at DESC
      LIMIT 10;
    `);

    return result;
  }
}
