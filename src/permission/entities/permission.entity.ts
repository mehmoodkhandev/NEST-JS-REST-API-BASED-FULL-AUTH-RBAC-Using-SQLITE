// import {
//   Column,
//   Entity,
//   ManyToMany,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Role } from '../../roles/entities/role.entity';
// import { UserPermission } from './userPermission.entity';

// @Entity('permissions')
// export class Permission {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;

//   @Column()
//   action!: string;

//   @Column()
//   subject!: string;

//   @Column({ nullable: true })
//   description?: string;

//   @ManyToMany(() => Role, (role) => role.permissions)
//   roles!: Role[];

//   @OneToMany(() => UserPermission, (up) => up.permission)
//   userPermissions!: UserPermission[];
// }
