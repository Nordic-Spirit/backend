import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  OneToMany,
  Index
} from 'typeorm';
import { UsedCouponCode } from './usedcouponcode.entity';
import { createdAtDefault } from './utils/createdAt';
import { updatedAtDefault } from './utils/updatedAt';

@Entity({ name: 'coupon_codes' })
export class CouponCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ name: 'discount_percentage', type: 'integer' })
  @Check(
    'chk_couponCodes_discountPercentage',
    'discount_percentage > 0 AND discount_percentage < 99'
  )
  discountPercentage: number;

  @Column({ name: 'expirty_date', type: 'timestamp with time zone' })
  @Index('idx_couponcodes_expiryDate')
  expiryDate: Date;

  @Column(createdAtDefault)
  createdAt: Date;

  @Column(updatedAtDefault)
  updatedAt: Date;

  @OneToMany(() => UsedCouponCode, usedCouponCode => usedCouponCode.couponCode)
  usedCouponCodes: UsedCouponCode[];
}
