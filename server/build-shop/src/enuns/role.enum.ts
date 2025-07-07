import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

registerEnumType(Role, { name: 'Role' });
