import pool from '../config/pool';
import { CustomError } from '../errors/CustomError';
import { ErrorNames } from '../errors/ErrorNames';

export class ModelRepo {
  async query<T>(
    sql: string,
    params?: any[] | undefined
  ): Promise<CustomError | T[]> {
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
