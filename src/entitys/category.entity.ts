import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique
} from 'typeorm';
import { Product } from './product.entity';
import { SubCategory } from './sub-category.entity';
import { createdAtDefault } from './utils/created-at.util';
import { updatedAtDefault } from './utils/updated-at.util';

@Entity({ name: 'categories' })
@Unique('uq_categories_name', ['name'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '30', unique: true })
  name: string;

  @Column({ type: 'varchar', length: '240', nullable: true })
  description?: string;

  @Column(createdAtDefault)
  createdAt: Date;

  @Column(updatedAtDefault)
  updatedAt: Date;

  @OneToMany(() => SubCategory, subCategory => subCategory.category)
  subCategories: SubCategory[];

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
