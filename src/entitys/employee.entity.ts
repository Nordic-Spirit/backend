import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Unique
} from 'typeorm';
import { Location } from './location.entity';
import { createdAtDefault } from './utils/createdAt';
import { updatedAtDefault } from './utils/updatedAt';
import { EmployeeRoleType } from './types/employee-role.type';

@Entity({ name: 'employees' })
@Unique('uq_employees_phone', ['phone'])
@Unique('uq_employees_email', ['email'])
export class Employee {
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

  @OneToOne(() => Location, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id'
  })
  location: Location;
}
