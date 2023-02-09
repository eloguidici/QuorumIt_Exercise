import { Permission } from './permission.entity';

export class RolePermission {
  roleId: number;
  permissionId: number;
  permission: Permission;
}
