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

export class PermissionResponse {
  constructor(entity: any) {
    this.id = entity.id;
    this.name = entity.name;
    this.created_at = entity.created_at;
    this.updated_at = entity.updated_at;
  }

  id: number;

  name: string;

  created_at: Date;

  updated_at: Date;
}

export class RoleResponse {
  constructor(entity: any) {
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
