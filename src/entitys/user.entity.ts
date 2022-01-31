import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  Unique,
  OneToOne,
  OneToMany,
  Index
} from 'typeorm';
import { Location } from './location.entity';
import { createdAtDefault } from './utils/createdAt';
import { updatedAtDefault } from './utils/updatedAt';
import { Rating } from './rating.entity';
import { Favorite } from './favorite.entity';
import { UsedCouponCode } from './usedcouponcode.entity';
import { Order } from './order.entity';

@Entity({ name: 'users' })
@Unique('uq_users_phone', ['phone'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: '30', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: '50', nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: '25', nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: '100' })
  @Index('uidx_users_email', { unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', length: '150' })
  passwordHash: string;

  @Column({ name: 'password_salt', type: 'varchar', length: '150' })
  passwordSalt: string;

  @Column(createdAtDefault)
  createdAt: Date;

  @Column(updatedAtDefault)
  updatedAt: Date;

  @OneToOne(() => Location, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id'
  })
  location: Location;

  @OneToMany(() => Rating, rating => rating.user)
  ratings: Rating[];

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => UsedCouponCode, usedCouponCode => usedCouponCode.user)
  usedCouponCodes: UsedCouponCode[];

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
