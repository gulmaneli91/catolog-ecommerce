import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Mutation,
} from '@nestjs/graphql';
import { Owner } from 'src/owner/entities/owner.entity';
import { OwnerService } from './owner.service';
import { Logger, UseGuards } from '@nestjs/common';
import { Category } from '../category/entities/category.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { GqlJwtGuard } from 'src/auth/guards/gql-jwt-guard/gql-jwt-guard';
import { CurrentOwner } from 'src/auth/decorators/current-user.decorators';
import { JwtOwner } from 'src/auth/types/jwt.user';

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  private readonly logger = new Logger(OwnerResolver.name);

  @Query(() => [Owner], { name: 'owners' })
  findAll(): Promise<Owner[]> {
    return this.ownerService.findAll();
  }

  @Query(() => Owner)
  getOwner(@Args('id') id: string) {
    return this.ownerService.findOne(id);
  }
  @Query(() => Owner)
  getOwnerByEmail(@Args('email') email: string) {
    return this.ownerService.findOne(email);
  }

  @ResolveField('categories', () => [Category])
  async getCategories(@Parent() owner: Owner): Promise<Category[]> {
    this.logger.debug(`fetching categories for owner's name: ${owner.name}`);
    return owner.categories;
  }

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownerService.create(createOwnerInput);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Owner)
  updateOwner(
    @CurrentOwner() owner: JwtOwner,
    @Args('updateOwnerInput')
    updateOwnerInput: UpdateOwnerInput,
  ) {
    return this.ownerService.update(owner.ownerId, updateOwnerInput);
  }

  @Mutation(() => Boolean)
  removeOwner(@Args('id') id: string) {
    return this.ownerService.remove(id);
  }
}
