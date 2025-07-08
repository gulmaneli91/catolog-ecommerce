import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Owner } from 'src/owner/entities/owner.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Owner)
    private readonly ownerRepo: Repository<Owner>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    const owner = await this.ownerRepo.findOneByOrFail({
      email: createCategoryInput.email,
    });

    const newCategory = this.categoryRepo.create({
      title: createCategoryInput.title,
      description: createCategoryInput.description,
      ownerId: owner.id,
    });
    return await this.categoryRepo.save(newCategory);
  }
  // find all  needs ownerid
  async findAll(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async findOne(id: string): Promise<Category> {
    return await this.categoryRepo.findOneByOrFail({ id });
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.categoryRepo.findOneByOrFail({ id });
    return await this.categoryRepo.save(
      new Category(Object.assign(category, updateCategoryInput)),
    );
  }

  async remove(id: string) {
    const result = await this.categoryRepo.delete(id);
    return result.affected === 1;
  }
}
