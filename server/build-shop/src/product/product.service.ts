import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Owner } from 'src/owner/entities/owner.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const newProduct = this.productRepo.create(createProductInput);
    return await this.productRepo.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepo.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepo.findOneByOrFail({ id });
  }

  async findByOwner(ownerId: string): Promise<Product[]> {
    return this.productRepo.find({
      where: { owner: { id: ownerId } },
      relations: ['owner', 'category'],
    });
  }

  async update(id: string, updateProductInput: UpdateProductInput) {
    const product = await this.productRepo.findOneByOrFail({ id });
    return await this.productRepo.save(
      new Product(Object.assign(product, updateProductInput)),
    );
  }

  async remove(id: string) {
    const result = await this.productRepo.delete(id);
    return result.affected === 1;
  }
}
