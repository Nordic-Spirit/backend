import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Index,
  Check
} from 'typeorm';
import { Product } from './product.entity';
import { updatedAtDefault } from './utils/updatedAt';
import { createdAtDefault } from './utils/createdAt';

@Entity({ name: 'campaigns' })
@Check('chk_campaigns_endsAt_startsAt', 'ends_at > starts_at')
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
  @Index('idx_campaigns_endsAt')
  endsAt: Date;

  @Column({ type: 'integer', name: 'discount_percentage' })
  @Check(
    'chk_campaigns_discountPercentage',
    'discount_percentage < 90 AND discount_percentage > 0'
  )
  discountPercentage: number;

  @Column(createdAtDefault)
  createdAt: Date;

  @Column(updatedAtDefault)
  updatedAt: Date;

  @ManyToMany(() => Product, product => product.campaigns, {
    onDelete: 'RESTRICT'
  })
  products: Product[];
}
