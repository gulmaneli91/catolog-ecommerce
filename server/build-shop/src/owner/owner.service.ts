import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepo: Repository<Owner>,
  ) {}

  async findAll(): Promise<Owner[]> {
    return await this.ownerRepo.find();
  }
  async findOne(id: string): Promise<Owner> {
    return await this.ownerRepo.findOneByOrFail({ id });
  }

  async create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownerRepo.create(createOwnerInput);
    return await this.ownerRepo.save(newOwner);
  }

  async update(id: string, updateOwnerInput: UpdateOwnerInput) {
    const owner = await this.ownerRepo.findOneByOrFail({ id });
    return await this.ownerRepo.save(
      new Owner(Object.assign(owner, updateOwnerInput)),
    );
  }

  async remove(id: string) {
    const result = await this.ownerRepo.delete(id);
    return result.affected === 1;
  }
}
