import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Role as RoleEnum } from './types/ROLES';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async getByName(name: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { name } });
  }
  async seedRoles() {
    const roles = Object.values(RoleEnum);
    for (const name of roles) {
      await this.roleRepository.upsert({ name }, ['name']);
    }
  }
}
