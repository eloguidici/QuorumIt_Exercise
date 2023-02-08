import { UserRole } from '../entites/user-role.entity';

export class UserRoleResponse {
  constructor(entity: UserRole) {
    this.userId = entity.userId;
    this.roleId = entity.roleId;
  }
  userId: number;
  roleId: number;
}
