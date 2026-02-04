import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/Find-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const { username, password, name } = dto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashPassword,
      name,
    });

    const newUser = await this.userRepository.save(user);

    const { password: _, ...safeUser } = newUser; // eslint-disable-line @typescript-eslint/no-unused-vars

    return safeUser as User;
  }

  async findMany(dto: FindUserDto) {
    return this.userRepository.createQueryBuilder('user').getMany();
  }

  async findOne(
    username: string,
    selectSecrets: boolean = false,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        name: true,
        accountStatus: true,
        password: selectSecrets,
      },
    });
  }
}
