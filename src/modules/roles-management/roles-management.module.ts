/**
 * @file Roles Module
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Module } from '@nestjs/common';
import { CommonsModule } from '../commons/commons.module';
import { PermissionsController } from './permissions.controller';
import { PermissionsRepository } from './permissions.repository';
import { PermissionsService } from './permissions.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';

import { RolesService } from './roles.service';

@Module({
  imports: [CommonsModule],
  controllers: [RolesController, PermissionsController],
  providers: [
    RolesService,
    RolesRepository,
    PermissionsService,
    PermissionsRepository,
  ],
  exports: [
    RolesService,
    PermissionsService,
    RolesRepository,
    PermissionsRepository,
  ],
})
export class RolesManagementModule {}
