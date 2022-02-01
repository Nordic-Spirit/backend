import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  Unique,
  ManyToOne,
  JoinColumn,
  JoinTable
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';
import { createdAtDefault } from './utils/createdAt';
import { updatedAtDefault } from './utils/updatedAt';

@Entity({ name: 'ratings' })
@Unique('uq_ratings', ['user', 'product'])
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  @Check('chk_ratings_stars', 'stars >= 1 AND stars <= 5')
  stars: number;

  @Column({ type: 'varchar', length: '240', nullable: true })
  description?: string;

  @Column(createdAtDefault)
  createdAt: Date;

  @Column(updatedAtDefault)
  updatedAt: Date;

  @ManyToOne(() => User, user => user.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Product, product => product.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;
}
