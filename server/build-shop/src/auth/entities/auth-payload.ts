import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/enuns/role.enum';

@ObjectType()
export class AuthPayload {
  @Field(() => ID)
  ownerId: string;

  @Field(() => Role)
  role: Role;

  @Field()
  accessToken: string;
}
