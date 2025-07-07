import { InputType, Field, Float, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsPositive,
  IsBoolean,
  IsNumber,
  Min,
} from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  price: number;

  @Field({ nullable: true })
  @IsOptional()
  imageUrl?: string;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  stock: number;

  @Field()
  @IsBoolean()
  isActive: boolean;

  @Field({ nullable: true })
  @IsOptional()
  categoryId?: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  ownerId: string;
}
