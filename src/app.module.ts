import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { PermissionModule } from './permission/permission.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

import { Role } from './roles/entities/role.entity';
import { User } from './users/entities/user.entity';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Permission } from './permission/entities/permission.entity';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Role, Permission],
      synchronize: true, // for demo / dev
    }),
    UsersModule,
    AuthModule,
    PermissionModule,
    RolesModule,
    CaslModule, // optional
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // Global JWT guard
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector) => new JwtAuthGuard(reflector),
      inject: [Reflector],
    },

    // Global Roles guard
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
