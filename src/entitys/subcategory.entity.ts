import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Unique
} from 'typeorm';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity({ name: 'sub_categories' })
// @Unique('UQ_id-category_id-name', ['id', 'category_id', 'name'])
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '30' })
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

  @ManyToOne(() => Category, category => category.subCategories, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @OneToMany(() => Product, product => product.subCategory)
  products: Product[];
}
