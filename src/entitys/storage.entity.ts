import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Employee } from './employee.entity';
import { Location } from './location.entity';
import { Product } from './product.entity';
import { createdAtDefault } from './utils/created-at.util';
import { updatedAtDefault } from './utils/updated-at.util';

@Entity({ name: 'storages' })
export class Storage extends Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(createdAtDefault)
  createdAt: Date;

  @Column(updatedAtDefault)
  updatedAt: Date;

  @ManyToMany(() => Employee, employee => employee.storages)
  @JoinTable({
    name: 'storages_employees',
    joinColumn: { name: 'storage_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'employee_id', referencedColumnName: 'id' }
  })
  employees: Employee[];

  @ManyToMany(() => Product, product => product.storages)
  products: Product[];
}
