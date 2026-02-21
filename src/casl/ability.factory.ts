// import { AbilityBuilder, PureAbility } from '@casl/ability';
// import { Injectable } from '@nestjs/common';
// import { User } from '../users/entities/user.entity';

// export type AppAbility = PureAbility<[string, string]>;

// @Injectable()
// export class AbilityFactory {
//   createForUser(user: User): AppAbility {
//     const { can, cannot, build } = new AbilityBuilder<AppAbility>(PureAbility);

//     // ---------- ROLE PERMISSIONS (BASE) ----------
//     for (const role of user.roles ?? []) {
//       for (const perm of role.permissions ?? []) {
//         if (perm.conditions) can(perm.action, perm.subject, perm.conditions);
//         else can(perm.action, perm.subject);
//       }
//     }

//     // ---------- USER OVERRIDES ----------
//     for (const up of user.userPermissions ?? []) {
//       const perm = up.permission;

//       if (up.isRevoked) {
//         if (perm.conditions) cannot(perm.action, perm.subject, perm.conditions);
//         else cannot(perm.action, perm.subject);
//       } else {
//         if (perm.conditions) can(perm.action, perm.subject, perm.conditions);
//         else can(perm.action, perm.subject);
//       }
//     }

//     return build({
//       detectSubjectType: (item) =>
//         typeof item === 'string' ? item : item.constructor.name,
//     });
//   }
// }
