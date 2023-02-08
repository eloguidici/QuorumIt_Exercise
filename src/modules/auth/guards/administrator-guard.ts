/**
 * @file Administrator Guard
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AdministratorGuard implements CanActivate {
  ADMINISTRATOR_ROLE_ID = Number(process.env.ADMINISTRATOR_ROLE_ID);
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    const user = await this.validateToken(request.headers.authorization);
    return this.hasAdministratorRole(user);
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new Error('Invalid token');
    }
    const token = auth.split(' ')[1];
    try {
      const decoded = await jwt.verify(token, 'secretkey');
      return decoded;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new Error(message);
    }
  }

  hasAdministratorRole(data: User): boolean {
    return data.userRoles.some((q) => q.roleId == this.ADMINISTRATOR_ROLE_ID);
  }
}
