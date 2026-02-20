import {
  Column,
  Entity,
  Index,
  ManyToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { AppAction, AppSubject } from '../types/permission.types';
//import { UserPermission } from './userPermission.entity';

@Entity('permissions')
@Index(['action', 'subject'], { unique: true })
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  action!: AppAction;

  @Column({ type: 'varchar' })
  subject!: AppSubject;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];

  // @OneToMany(() => UserPermission, (up) => up.permission)
  // userPermissions!: UserPermission[];

  // @Column({ type: 'json', nullable: true })
  // conditions?: Record<string, any>;
}
