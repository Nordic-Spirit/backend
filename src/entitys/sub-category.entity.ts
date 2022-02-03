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
import { createdAtDefault } from './utils/created-at.util';
import { updatedAtDefault } from './utils/updated-at.util';

@Entity({ name: 'sub_categories' })
@Unique('uq_subCategories_id_name_categoryId', ['id', 'name', 'category'])
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '30' })
  name: string;

  @Column({ type: 'varchar', length: '240', nullable: true })
  description?: string;

  @Column(createdAtDefault)
  createdAt: Date;

  @Column(updatedAtDefault)
  updatedAt: Date;

  @ManyToOne(() => Category, category => category.subCategories, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @OneToMany(() => Product, product => product.subCategory)
  products: Product[];
}
