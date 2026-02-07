import { Controller, Get, Query } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { FindUserDto } from './dto/Find-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findMany(@Query() query: FindUserDto) {
    return this.usersService.findMany(query);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}
