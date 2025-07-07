import { Role } from 'src/enuns/role.enum';

export type JwtOwner = {
  ownerId: string;
  role: Role;
};
