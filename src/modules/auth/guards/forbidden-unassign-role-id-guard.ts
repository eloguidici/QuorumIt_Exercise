/**
 * @file Administrator Guard
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ForbiddenAssignRoleIdGuard } from './forbidden-assign-role-id-guard';

@Injectable()
export class ForbiddenUnssignRoleIdGuard extends ForbiddenAssignRoleIdGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await super.canActivate(context);
  }
}
