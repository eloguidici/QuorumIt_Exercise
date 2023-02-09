import { PermissionResponse } from 'src/modules/roles-management/dtos/permission-response.dto';
import { RoleResponse } from 'src/modules/roles-management/dtos/role-response.dto';
import { Permission } from 'src/modules/roles-management/entities/permission.entity';
import { Role } from 'src/modules/roles-management/entities/role.entity';
import { User } from '../entities/user.entity';

export class UserResponse {
  constructor(entity: User) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.created_at = entity.created_at;
    this.updated_at = entity.updated_at;
    this.roles = entity.userRoles.map(
      (userRole) => new RoleResponse(userRole.role),
    );
    this.permissions = entity.userPermissions.map(
      (permission) => new PermissionResponse(permission.permission),
    );
  }

  id: number;

  name: string;

  email: string;

  created_at: Date;

  updated_at: Date;

  roles: RoleResponse[];

  permissions: PermissionResponse[];
}
