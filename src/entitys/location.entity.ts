import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { createdAtDefault } from './utils/createdAt';
import { updatedAtDefault } from './utils/updatedAt';

@Entity({ name: 'locations' })
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50', nullable: true })
  country?: string;

  @Column({ type: 'varchar', length: '85', nullable: true })
  city?: string;

  @Column({
    name: 'postal_code',
    type: 'varchar',
    length: '12',
    nullable: true
  })
  postalCode: string;

  @Column({ type: 'varchar', length: '85', nullable: true })
  address?: string;

  @Column(createdAtDefault)
  createdAt: Date;

  @Column(updatedAtDefault)
  updatedAt: Date;
}
