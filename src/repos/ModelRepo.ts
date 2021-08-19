import pool from '../config/pool';
import { CustomError } from '../errors/CustomError';
import { ErrorNames } from '../errors/ErrorNames';

export class ModelRepo {
  static async query(sql: string, params?: any[] | undefined) {
    const client = await pool.connect();

    return pool
      .query(sql, params)
      .then(({ rows }) => {
        return rows;
      })
      .catch(err => {
        return new CustomError(err.message, ErrorNames.databaseError, 422);
      })
      .finally(() => {
        client.release();
      });
  }
}
