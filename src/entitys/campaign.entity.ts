import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Index,
  Check
} from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'campaigns' })
@Check('ends_at > starts_at')
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '60' })
  name: string;

  @Column({ type: 'varchar', length: '240' })
  description: string;

  @Column({ type: 'varchar', name: 'url_image', length: '200' })
  urlImage: string;

  @Column({
    name: 'starts_at',
    type: 'timestamp with time zone'
  })
  startsAt: Date;

  @Column({ name: 'ends_at', type: 'timestamp with time zone' })
  @Index()
  endsAt: Date;

  @Column({ type: 'integer', name: 'discount_percentage' })
  @Check('discount_percentage < 90 AND discount_percentage > 0')
  discountPercentage: number;

  @Column({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: 'current_timestamp'
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: 'current_timestamp'
  })
  updatedAt: Date;

  @ManyToMany(() => Product, product => product.campaigns)
  products: Product[];
}
