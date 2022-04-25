import { Entity, Column, PrimaryColumn, Index, OneToMany } from 'typeorm';
import { BasketProduct } from './basket-product.entity';
import { BaseEntity } from 'typeorm';
import { SessionEntity } from 'typeorm-store';

// @Entity({ name: 'sessions' })
// export class Session {
//   @PrimaryColumn({ type: 'varchar', collation: 'default' })
//   sid: string;

//   @Column({ type: 'json' })
//   sess: JSON;

//   @Column({ type: 'timestamp with time zone' })
//   @Index('idx_sessions_expire')
//   expire: Date;

//   @OneToMany(() => BasketProduct, basketProduct => basketProduct.session)
//   basketProducts: BasketProduct[];
// }

@Entity({ name: 'sessions' })
export class Session extends BaseEntity implements SessionEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'expires_at' })
  @Index('idx_sessions_expiresAt')
  expiresAt: number;

  @Column()
  data: string;

  // @OneToMany(() => BasketProduct, basketProduct => basketProduct.session)
  // basketProducts: BasketProduct[];
}
