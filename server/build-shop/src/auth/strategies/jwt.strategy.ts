import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { AuthJwtPayload } from '../types/auth-jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthJwtPayload) {
    const { ownerId } = payload.sub;
    const jwtOwner = await this.authService.validateJwtOwner(ownerId);

    return jwtOwner;
  }
}
