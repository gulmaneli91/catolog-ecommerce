/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, verify } from 'argon2';

import { CreateOwnerInput } from 'src/owner/dto/create-owner.input';
import { Owner } from 'src/owner/entities/owner.entity';
import { Repository } from 'typeorm';
import { SignInInput } from './dto/signIn.input';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './entities/auth-payload';
import { JwtOwner } from './types/jwt.user';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Owner) private ownerRepo: Repository<Owner>,
    private readonly jwtService: JwtService,
  ) {}
  async registerOwner(input: CreateOwnerInput) {
    const encryptedPassword = await hash(input.password);
    const newOwner = this.ownerRepo.create({
      ...input,
      password: encryptedPassword,
    });
    return await this.ownerRepo.save(newOwner);
  }

  async validateLocalOwner({ email, password }: SignInInput) {
    const owner = await this.ownerRepo.findOneByOrFail({ email });
    const passwordMatched = await verify(owner.password, password);

    if (!passwordMatched)
      throw new UnauthorizedException('Email ou senha invalídos');
    return owner;
  }

  async generateToken(ownerId: string) {
    const payload: AuthJwtPayload = {
      sub: {
        ownerId,
      },
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async login(owner: Owner): Promise<AuthPayload> {
    const { accessToken } = await this.generateToken(owner.id);
    return {
      ownerId: owner.id,
      role: owner.role,
      accessToken,
    };
  }

  async validateJwtOwner(ownerId: string) {
    const owner = await this.ownerRepo.findOneByOrFail({ id: ownerId });
    const jwtOwner: JwtOwner = {
      ownerId: owner.id,
      role: owner.role,
    };

    return jwtOwner;
  }
}
