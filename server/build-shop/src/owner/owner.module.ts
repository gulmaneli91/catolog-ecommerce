import { Module } from '@nestjs/common';
import { OwnerResolver } from './owner.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { OwnerService } from './owner.service';
import { Product } from '../product/entities/product.entity';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Product, Category])],
  providers: [OwnerResolver, OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
