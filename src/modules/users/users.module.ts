/**
 * @file Users Module
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

import { CommonsModule } from '../commons/commons.module';
import { UsersService } from './users.service';

@Module({
  imports: [CommonsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
