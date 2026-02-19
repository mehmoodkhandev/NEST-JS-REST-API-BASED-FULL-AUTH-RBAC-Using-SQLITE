import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
//import { UserPermission } from '../../permission/entities/userPermission.entity';
import { Role } from '../../roles/entities/role.entity';

export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ nullable: true, select: false })
  password?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({
    type: 'simple-enum',
    enum: AccountStatus,
    default: AccountStatus.INACTIVE,
  })
  accountStatus!: AccountStatus;

  @ManyToMany(() => Role, (role) => role.users, {
    eager: true,
  })
  @JoinTable()
  roles!: Role[];

  // @OneToMany(() => UserPermission, (up) => up.user, {
  //   eager: true,
  // })
  // userPermissions!: UserPermission[];
}
