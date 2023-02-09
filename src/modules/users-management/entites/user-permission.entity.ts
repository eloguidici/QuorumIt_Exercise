import { Permission } from 'src/modules/roles-management/entities/permission.entity';

export class UserPermission {
  userId: number;
  permissionId: number;
  permission: Permission;
}
