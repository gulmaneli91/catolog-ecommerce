import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Owner } from '../../owner/entities/owner.entity';
import { Product } from '../../product/entities/product.entity';

@ObjectType()
@Entity({ name: 'categories' })
export class Category {
  constructor(partial: Partial<Category>) {
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

  @Field()
  @Column()
  ownerId: string;

  @Field()
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @Field()
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Field(() => Owner)
  @ManyToOne(() => Owner, (owner) => owner.categories)
  owner: Promise<Owner>;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.category)
  products: Promise<Product[]>;
}
