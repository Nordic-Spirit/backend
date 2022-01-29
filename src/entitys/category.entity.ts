import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique
} from 'typeorm';
import { Product } from './product.entity';
import { SubCategory } from './subcategory.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '30', unique: true })
  name: string;

  @Column({ type: 'varchar', length: '240', nullable: true })
  description?: string;

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

  @OneToMany(() => SubCategory, subCategory => subCategory.category)
  subCategories: SubCategory[];

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
