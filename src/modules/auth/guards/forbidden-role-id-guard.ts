/**
 * @file Administrator Guard
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ForbiddenRoleIdGuard implements CanActivate {
  ADMINISTRATOR_ROLE_ID = Number(process.env.ADMINISTRATOR_ROLE_ID);
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roleId = request.body.id || request.params.id;
    if (Number(roleId) === this.ADMINISTRATOR_ROLE_ID) {
      throw new ForbiddenException('cannot modify or delete admin role');
    }
    return true;
  }
}
