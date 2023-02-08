import { Permission } from '../../roles-management/entities/permission.entity';

export class PermissionResponse {
  constructor(entity: Permission) {
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
