import { ColumnOptions } from 'typeorm';

export const updatedAtDefault: ColumnOptions = {
  name: 'updated_at',
  type: 'timestamp with time zone',
  default: () => 'current_timestamp'
};
