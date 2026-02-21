import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import {
  AppAction as ActionEnum,
  AppAction,
  AppSubject as SubjectEnum,
} from './types/permission.types';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async seedPermissions() {
    const actions = Object.values(ActionEnum);
    const subjects = Object.values(SubjectEnum);

    const permissions: Partial<Permission>[] = [];

    for (const action of actions) {
      for (const subject of subjects) {
        permissions.push({
          action,
          subject,
          description: `${action} ${subject}`,
        });
      }
    }

    await this.permissionRepository.upsert(permissions, ['action', 'subject']);

    console.log(`Seeded ${permissions.length} permissions`);
  }

  async findReadPermissions() {
    return this.permissionRepository.find({
      where: { action: AppAction.READ },
    });
  }

  async findAllPermissions() {
    return this.permissionRepository.find();
  }
}
