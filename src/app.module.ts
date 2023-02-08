import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoginModule } from './modules/auth/login.module';
import { CommonsModule } from './modules/commons/commons.module';
import { RolesManagementModule } from './modules/roles-management/roles-management.module';
import { UsersManagementModule } from './modules/users-management/users-management.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    RolesManagementModule,
    UsersModule,
    LoginModule,
    UsersManagementModule,
    CommonsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
