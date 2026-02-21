import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/Find-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly roleService: RolesService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const { username, password, name } = dto;
    const userRole = await this.roleService.getByName('user');
    if (!userRole) {
      throw new Error('Default role USER not found');
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashPassword,
      name,
      roles: [userRole], // must be array
    });

    const newUser = await this.userRepository.save(user);

    const { password: _, ...safeUser } = newUser;

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
      relations: ['roles', 'roles.permissions'], // ← load roles and their permissions
    });
  }
}
