import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountStatus } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';

interface JwtPayload {
  sub: string;
  username: string;
  roles: string[];
  permissions: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          console.log('Cookies:', req.cookies);
          const token = req.cookies?.Authentication;
          return typeof token === 'string' ? token : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    //only runs if the token is valid and sucessfully verified
    // if the token is valid , the validate method is called the decoded payload
    // Optionally, you can perform additional check here check here , such as checking if
    // the user exists , is banned whatever
    const user = await this.userService.findOne(payload.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.accountStatus !== AccountStatus.ACTIVE) {
      throw new UnauthorizedException(
        `Account is ${user.accountStatus}. Please contact support.`,
      );
    }

    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
      permissions: payload.permissions,
    };
  }
}
