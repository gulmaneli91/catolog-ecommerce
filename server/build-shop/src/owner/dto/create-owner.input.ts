import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/enuns/role.enum';

@InputType()
export class CreateOwnerInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsEnum(Role)
  @Field(() => Role)
  role: Role;
}
