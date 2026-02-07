import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Request() req: Request & { user: User },
  ) {
    const token = this.authService.login(req.user); // no await if non-Promise

    res.cookie('Authentication', token.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    return { message: 'Logged in successfully' };
  }

  @Public()
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Authentication'); // works now
    return { message: 'Logged out successfully' };
  }
}
