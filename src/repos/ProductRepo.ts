import pool from '../config/pool';

export class ProductRepo {
  static async findAll(): Promise<any> {
    const client = await pool.connect();

    const { rows } = await pool.query(`
      SELECT * FROM products;
    `);

    client.release();

    return rows;
  }
}
