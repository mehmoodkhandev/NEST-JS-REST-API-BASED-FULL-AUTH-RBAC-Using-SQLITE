import {
  Column,
  Entity,
  Index,
  //JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
//import { Permission } from '../../permission/entities/permission.entity';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column()
  name!: string;

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];

  // @ManyToMany(() => Permission, (permission) => permission.roles, {
  //   eager: true,
  // })
  // @JoinTable()
  // permissions!: Permission[];
}
