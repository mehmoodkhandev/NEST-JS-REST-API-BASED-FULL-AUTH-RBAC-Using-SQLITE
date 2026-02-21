import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PermissionService } from './permission/permission.service';
import { RolesService } from './roles/roles.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private readonly rolesService: RolesService,
    private readonly permissionService: PermissionService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onApplicationBootstrap() {
    await this.permissionService.seedPermissions();
    console.log('Permissions seeded ✔');
    await this.rolesService.seedRoles();
    console.log('Roles seeded ✔');
    await this.rolesService.grantAdminAllPermissions();
    console.log('Roles Admin seeded ✔');
  }
}
