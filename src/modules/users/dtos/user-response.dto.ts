import { User } from '../entities/user.entity';

export class UserResponse {
  constructor(entity: User) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.created_at = entity.created_at;
    this.updated_at = entity.updated_at;
    this.roles = entity.userRoles.map((role) => role.roleId);
  }

  id: number;

  name: string;

  email: string;

  created_at: Date;

  updated_at: Date;

  roles: number[];
}
