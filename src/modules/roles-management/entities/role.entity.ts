import { RolePermission } from './role-permission.entity';

export class Role {
  id: number;

  name: string;

  created_at: Date;

  updated_at: Date;

  rolePermissions: RolePermission[] = [];
}
