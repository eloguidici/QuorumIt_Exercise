import { UserRole } from '@prisma/client';

export class User {
  id: number;

  name: string;

  email: string;

  password: string;

  created_at: Date;

  updated_at: Date;

  userRoles: UserRole[] = [];
}
