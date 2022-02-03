import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
  ManyToMany
} from 'typeorm';
import { Location } from './location.entity';
import { Order } from './order.entity';
import { Storage } from './storage.entity';
import { createdAtDefault } from './utils/created-at.util';
import { updatedAtDefault } from './utils/updated-at.util';
import { EmployeeRoleType } from './types/employee-role.type';

@Entity({ name: 'employees' })
@Unique('uq_employees_phone', ['phone'])
@Unique('uq_employees_email', ['email'])
export class Employee extends Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: '30' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: '50' })
  lastName: string;

  @Column({ type: 'varchar', length: '25' })
  phone: string;

  @Column({ type: 'varchar', length: '100' })
  email: string;

  @Column({ type: 'varchar', length: '150' })
  passwordHash: string;

  @Column({ type: 'varchar', length: '150' })
  passwordSalt: string;

  @Column({
    type: 'enum',
    enum: ['standard', 'admin'],
    enumName: 'EMPLOYEE_ROLE',
    default: 'standard'
  })
  role: EmployeeRoleType;

  @Column(createdAtDefault)
  createdAt: Date;

  @Column(updatedAtDefault)
  updatedAt: Date;

  @OneToMany(() => Order, order => order.employee)
  orders: Order[];

  @ManyToMany(() => Storage, storage => storage.employees)
  storages: Storage[];
}
