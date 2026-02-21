import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionService } from '../permission/permission.service';
import { Role } from './entities/role.entity';
import { Role as RoleEnum } from './types/ROLES';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private permissionSevice: PermissionService,
  ) {}
  async getByName(name: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { name } });
  }
  async seedRoles() {
    const roleNames = Object.values(RoleEnum);

    // STEP 1: roles ensure exist
    await this.roleRepository.upsert(
      roleNames.map((name) => ({ name })),
      ['name'],
    );

    // STEP 2: fetch roles with permissions
    const roles = await this.roleRepository.find({
      relations: ['permissions'],
    });

    // STEP 3: get all read permissions
    const readPermissions = await this.permissionSevice.findReadPermissions();

    // STEP 4: attach missing read permissions
    for (const role of roles) {
      // admin skip (later full access milega)
      if (role.name === RoleEnum.ADMIN) continue;

      const existing = new Set(role.permissions.map((p) => p.id));

      const missing = readPermissions.filter((p) => !existing.has(p.id));

      if (missing.length) {
        role.permissions = [...role.permissions, ...missing];
        await this.roleRepository.save(role);
      }
    }

    console.log('Roles seeded with default read permissions');
  }

  async grantAdminAllPermissions() {
    const admin = await this.roleRepository.findOne({
      where: { name: RoleEnum.ADMIN },
      relations: ['permissions'],
    });

    if (!admin) return;

    const allPermissions = await this.permissionSevice.findAllPermissions();

    admin.permissions = allPermissions;

    await this.roleRepository.save(admin);
  }
}
