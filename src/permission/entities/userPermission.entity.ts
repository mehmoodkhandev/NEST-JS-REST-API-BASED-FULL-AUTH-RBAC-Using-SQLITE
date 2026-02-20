// import {
//   Column,
//   Entity,
//   Index,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { User } from '../../users/entities/user.entity';
// import { Permission } from './permission.entity';

// @Entity('user_permissions')
// @Index(['user', 'permission'], { unique: true })
// export class UserPermission {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;

//   @ManyToOne(() => User, (user) => user.userPermissions, {
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'user_id' })
//   user!: User;

//   @ManyToOne(() => Permission, (permission) => permission.userPermissions, {
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'permission_id' })
//   permission!: Permission;

//   @Column({ default: false })
//   isRevoked!: boolean; // true = deny
// }
