import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  Index,
  JoinTable,
  JoinColumn,
  Check,
  OneToMany
} from 'typeorm';
import { Category } from './category.entity';
import { SubCategory } from './subcategory.entity';
import { Campaign } from './campaign.entity';
import { createdAtDefault } from './utils/createdAt';
import { updatedAtDefault } from './utils/updatedAt';
import { Rating } from './rating.entity';
import { Favorite } from './favorite.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50' })
  @Index('idx_products_name')
  name: string;

  @Column({ type: 'varchar', length: '200' })
  url: string;

  @Column({ type: 'varchar', length: '240' })
  description: string;

  @Column({ type: 'double precision' })
  @Check('chk_products_price', 'price > 0')
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
  @Index('idx_products_onSale')
  onSale: boolean;

  @Column(createdAtDefault)
  createdAt: Date;

  @Column(updatedAtDefault)
  updatedAt: Date;

  @ManyToOne(() => Category, category => category.products, {
    onDelete: 'RESTRICT'
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @ManyToOne(() => SubCategory, sub_category => sub_category.products, {
    onDelete: 'RESTRICT'
  })
  @JoinColumn({ name: 'sub_category_id', referencedColumnName: 'id' })
  subCategory: SubCategory;

  @ManyToMany(() => Campaign, campaign => campaign.products, {
    onDelete: 'RESTRICT'
  })
  @JoinTable({
    name: 'products_campaigns',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'campaign_id', referencedColumnName: 'id' }
  })
  campaigns: Campaign[];

  @OneToMany(() => Rating, rating => rating.product)
  ratings: Rating[];

  @OneToMany(() => Favorite, favorite => favorite.product)
  favorites: Favorite[];
}
