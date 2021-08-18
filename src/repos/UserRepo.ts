import pool from '../config/pool';

export class UserRepo {
  static async findAll(): Promise<string> {
    const client = await pool.connect();

    const { rows } = await pool.query(`
      SELECT * FROM products;
    `);

    client.release();

    return 'lassi';
  }
}
