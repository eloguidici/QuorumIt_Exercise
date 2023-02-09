/**
 * @file Users Management Module
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Module } from '@nestjs/common';
import { CommonsModule } from '../commons/commons.module';
import { RolesManagementModule } from '../roles-management/roles-management.module';

import { UsersManagementController } from './users-management.controller';
import { UsersManagementRepository } from './users-management.repository';
import { UsersManagementService } from './users-management.service';

@Module({
  imports: [CommonsModule],
  controllers: [UsersManagementController],
  providers: [UsersManagementService, UsersManagementRepository],
  exports: [],
})
export class UsersManagementModule {}
