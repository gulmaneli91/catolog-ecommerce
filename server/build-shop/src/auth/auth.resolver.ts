import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateOwnerInput } from 'src/owner/dto/create-owner.input';
import { Owner } from 'src/owner/entities/owner.entity';
import { AuthPayload } from './entities/auth-payload';
import { SignInInput } from './dto/signIn.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Owner)
  signUp(@Args('input') input: CreateOwnerInput) {
    return this.authService.registerOwner(input);
  }

  @Mutation(() => AuthPayload)
  async signIn(@Args('input') input: SignInInput) {
    const owner = await this.authService.validateLocalOwner(input);
    return await this.authService.login(owner);
  }
}
