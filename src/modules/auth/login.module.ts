/**
 * @file Login Module
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Module } from '@nestjs/common';
import { CommonsModule } from '../commons/commons.module';
import { UsersModule } from '../users/users.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [CommonsModule, UsersModule],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [],
})
export class LoginModule {}
