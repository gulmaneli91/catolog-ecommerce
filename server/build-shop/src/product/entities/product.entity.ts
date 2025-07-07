import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Owner } from '../../owner/entities/owner.entity';
import { Category } from '../../category/entities/category.entity';

@ObjectType()
@Entity({ name: 'products' })
export class Product {
  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => Float)
  @Column('float')
  price: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl?: string;

  @Field(() => Int)
  @Column({ default: 0 })
  stock: number;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  categoryId?: string;

  @Field()
  @Column()
  ownerId: string;

  @Field()
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Field(() => Owner)
  @ManyToOne(() => Owner, (owner) => owner.products)
  owner: Promise<Owner>;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  category?: Promise<Category>;
}
