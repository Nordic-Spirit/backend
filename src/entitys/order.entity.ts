import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { User } from './user.entity';
import { Employee } from './employee.entity';
import { OrderDeliveryStatusType } from './types/order-delivery-status.type';
import { createdAtDefault } from './utils/createdAt';
import { updatedAtDefault } from './utils/updatedAt';
import { Product } from './product.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean' })
  paid: boolean;

  @Column({
    type: 'enum',
    enum: ['processing', 'cancelled', 'shipped', 'delivered', 'returned'],
    enumName: 'DELIVERY_STATUS',
    default: 'processing'
  })
  deliverStatus: OrderDeliveryStatusType;

  @Column(createdAtDefault)
  createdAt: Date;

  @Column(updatedAtDefault)
  updatedAt: Date;

  @ManyToOne(() => User, user => user.orders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Employee, employee => employee.orders, {
    onDelete: 'RESTRICT'
  })
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'id' })
  employee: Employee;

  @ManyToMany(() => Product, product => product.orders, {
    onDelete: 'RESTRICT'
  })
  @JoinTable({
    name: 'orders_products',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' }
  })
  products: Product[];
}
