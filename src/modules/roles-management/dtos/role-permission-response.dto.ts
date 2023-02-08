import { RolePermission } from '../entities/role-permission.entity';

export class RolePermissionResponse {
  constructor(entity: RolePermission) {
    this.roleId = entity.roleId;
    this.permissionId = entity.permissionId;
  }

  roleId: number;

  permissionId: number;
}
