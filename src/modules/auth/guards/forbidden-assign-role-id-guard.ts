/**
 * @file Administrator Guard
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class ForbiddenAssignRoleIdGuard implements CanActivate {
  ADMINISTRATOR_ROLE_ID = Number(process.env.ADMINISTRATOR_ROLE_ID);
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roleId = request.body.roleId;

    if (roleId === this.ADMINISTRATOR_ROLE_ID) {
      throw new ForbiddenException(
        'cannot assign or unassign permissions to the admin role',
      );
    }
    return true;
  }
}
