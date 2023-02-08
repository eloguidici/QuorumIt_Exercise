import { UserPermission } from '../entites/user-permission.entity';

export class UserPermissionResponse {
  constructor(entity: UserPermission) {
    this.userId = entity.userId;
    this.permissionId = entity.permissionId;
  }
  userId: number;
  permissionId: number;
}
