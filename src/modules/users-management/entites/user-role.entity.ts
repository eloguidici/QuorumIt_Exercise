import { Role } from 'src/modules/roles-management/entities/role.entity';

export class UserRole {
  userId: number;
  roleId: number;
  role: Role;
}
