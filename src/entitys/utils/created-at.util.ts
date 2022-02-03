import { ColumnOptions } from 'typeorm';

export const createdAtDefault: ColumnOptions = {
  name: 'created_at',
  type: 'timestamp with time zone',
  default: () => 'current_timestamp'
};
