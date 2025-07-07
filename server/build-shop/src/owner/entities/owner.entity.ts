import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Category } from '../../category/entities/category.entity';
import { Role } from 'src/enuns/role.enum';

@ObjectType()
@Entity({ name: 'users' })
export class Owner {
  constructor(partial: Partial<Owner>) {
    Object.assign(this, partial);
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field(() => Role)
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.OWNER,
  })
  role: Role;

  @Field()
  @Column()
  password: string;

  @Field()
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.owner)
  products: Promise<Product[]>;

  @Field(() => [Category])
  @OneToMany(() => Category, (category) => category.owner)
  categories: Promise<Category[]>;
}
