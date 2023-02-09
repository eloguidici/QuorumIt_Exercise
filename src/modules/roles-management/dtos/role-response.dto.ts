import { Role } from '../entities/role.entity';
import { PermissionResponse } from './permission-response.dto';

export class RoleResponse {
  constructor(entity: Role) {
    this.id = entity.id;
    this.name = entity.name;
    this.created_at = entity.created_at;
    this.updated_at = entity.updated_at;
    this.permissions = entity.rolePermissions.map(
      (rolePermission) => new PermissionResponse(rolePermission.permission),
    );
  }

  id: number;

  name: string;

  created_at: Date;

  updated_at: Date;

  permissions: PermissionResponse[];
}
