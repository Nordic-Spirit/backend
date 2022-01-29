import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  Index,
  JoinTable,
  JoinColumn
} from 'typeorm';
import { Category } from './category.entity';
import { SubCategory } from './subcategory.entity';
import { Campaign } from './campaign.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  alcohol: number;

  @Column()
  capacity: number;

  @Column()
  manufacturer: string;

  @Column({ name: 'country_of_manufacturer' })
  countryOfManufacturer: string;

  @Index()
  @Column({ name: 'on_sale' })
  onSale: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @ManyToOne(() => SubCategory, sub_category => sub_category.products)
  @JoinColumn({ name: 'sub_category_id', referencedColumnName: 'id' })
  subCategory: SubCategory;

  @ManyToMany(() => Campaign, campaign => campaign.products)
  @JoinTable({
    name: 'products_campaigns',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'campaign_id', referencedColumnName: 'id' }
  })
  campaigns: Campaign[];
}
