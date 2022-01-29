import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  Index,
  JoinTable,
  JoinColumn,
  Check
} from 'typeorm';
import { Category } from './category.entity';
import { SubCategory } from './subcategory.entity';
import { Campaign } from './campaign.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50' })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: '200' })
  url: string;

  @Column({ type: 'varchar', length: '240' })
  description: string;

  @Column({ type: 'double precision' })
  @Check('price > 0')
  price: number;

  @Column({ type: 'double precision' })
  alcohol: number;

  @Column({ type: 'double precision' })
  capacity: number;

  @Column({ type: 'varchar', length: '70' })
  manufacturer: string;

  @Column({ type: 'varchar', name: 'country_of_manufacturer', length: '50' })
  countryOfManufacturer: string;

  @Column({ type: 'boolean', name: 'on_sale', default: true })
  @Index()
  onSale: boolean;

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

  @ManyToOne(() => Category, category => category.products, {
    onDelete: 'RESTRICT'
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @ManyToOne(() => SubCategory, sub_category => sub_category.products)
  @JoinColumn({ name: 'sub_category_id', referencedColumnName: 'id' })
  subCategory: SubCategory;

  @ManyToMany(() => Campaign, campaign => campaign.products, {
    onDelete: 'SET NULL'
  })
  @JoinTable({
    name: 'products_campaigns',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'campaign_id', referencedColumnName: 'id' }
  })
  campaigns: Campaign[];
}
