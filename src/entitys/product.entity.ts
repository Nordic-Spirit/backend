import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

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
}
