import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';
import { createdAtDefault } from './utils/createdAt';

@Entity({ name: 'favorites' })
@Unique('uq_favorites_userId_productId', ['user', 'product'])
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(createdAtDefault)
  createdAt: Date;

  @ManyToOne(() => User, user => user.favorites, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Product, product => product.favorites, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;
}
