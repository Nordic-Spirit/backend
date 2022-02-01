import { Entity, Column, PrimaryColumn, Index, OneToMany } from 'typeorm';
import { BasketProduct } from './basketproduct.entity';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryColumn({ type: 'varchar', collation: 'default' })
  sid: string;

  @Column({ type: 'json' })
  sess: JSON;

  @Column({ type: 'timestamp with time zone' })
  @Index('idx_sessions_expire')
  expire: Date;

  @OneToMany(() => BasketProduct, basketProduct => basketProduct.session)
  basketProducts: BasketProduct[];
}
