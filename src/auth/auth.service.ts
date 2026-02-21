import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser({ username, password }: LoginDto) {
    const user = await this.usersService.findOne(username, true);
    if (!user) {
      return null;
    }
    try {
      const isMatch = await bcrypt.compare(password, user.password!);
      if (!isMatch) {
        return null;
      }
    } catch (error) {
      return null;
    }
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  login(user: User) {
    const roles = user.roles.map((r) => r.name);

    const permissions = user.roles
      .flatMap((r) => r.permissions || []) // flatten permissions from all roles
      .map((p) => ({ action: p.action, subject: p.subject }));

    const payload = {
      username: user.username,
      sub: user.id,
      roles,
      permissions,
    };

    console.log('permissions:', permissions);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
