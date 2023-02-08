import { Role } from '../entities/role.entity';

export class RoleResponse {
  constructor(entity: Role) {
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
