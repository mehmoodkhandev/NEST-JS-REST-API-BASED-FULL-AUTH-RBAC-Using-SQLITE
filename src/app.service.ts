import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RolesService } from './roles/roles.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly rolesService: RolesService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onApplicationBootstrap() {
    await this.rolesService.seedRoles();
    console.log('Roles seeded ✔');
  }
}
