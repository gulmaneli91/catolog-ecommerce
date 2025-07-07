import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Owner } from 'src/owner/entities/owner.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Owner, Category])],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
