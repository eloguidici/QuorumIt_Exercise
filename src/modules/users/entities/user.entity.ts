import { UserPermission } from 'src/modules/users-management/entites/user-permission.entity';
import { UserRole } from 'src/modules/users-management/entites/user-role.entity';

export class User {
  id: number;

  name: string;

  email: string;

  password: string;

  created_at: Date;

  updated_at: Date;

  userRoles: UserRole[] = [];

  userPermissions: UserPermission[] = [];
}
