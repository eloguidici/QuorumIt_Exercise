/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { RolesManagementModule } from 'src/modules/roles-management/roles-management.module';
import { UsersModule } from 'src/modules/users/users.module';
import { AdministratorGuard } from '../../auth/guards/administrator-guard';
import { CryptoService } from '../../commons/crypto.service';
import { LoggerService } from '../../commons/logger-service';
import { Permission } from '../../roles-management/entities/permission.entity';
import { Role } from '../../roles-management/entities/role.entity';
import { AssignPermissionToUserDto } from '../dtos/assign-permission-to-user.dto';
import { AssignRoleToUserDto } from '../dtos/assign-role-to-user.dto';
import { UnassignPermissionToUserDto } from '../dtos/unassign-permission-to-user.dto';
import { UnassignRoleToUserDto } from '../dtos/unassign-role-to-user.dto';
import { UserPermissionResponse } from '../dtos/user-permission-response.dto';
import { UserRoleResponse } from '../dtos/user-role-response.dto';
import { UserPermission } from '../entites/user-permission.entity';
import { UserRole } from '../entites/user-role.entity';
import { UsersManagementController } from '../users-management.controller';
import { UsersManagementRepository } from '../users-management.repository';
import { UsersManagementService } from '../users-management.service';

describe('UsersManagementController', () => {
  let usersManagementController: UsersManagementController;
  let usersManagementService: UsersManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RolesManagementModule, UsersModule],
      controllers: [UsersManagementController],
      providers: [
        UsersManagementService,
        UsersManagementRepository,
        LoggerService,
        CryptoService,
        PrismaClient,
        {
          provide: AdministratorGuard,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    usersManagementController = module.get<UsersManagementController>(
      UsersManagementController,
    );
    usersManagementService = module.get<UsersManagementService>(
      UsersManagementService,
    );
  });

  describe('assign role', () => {
    it('should return a user role response', async () => {
      const assignRoleToUserDto = new AssignRoleToUserDto();
      assignRoleToUserDto.roleId = 1;
      assignRoleToUserDto.userId = 1;

      const userRole: UserRole = {
        userId: 1,
        roleId: 1,
        role: new Role(),
      };
      jest
        .spyOn(usersManagementService, 'assignRoleToUser')
        .mockImplementation(() => Promise.resolve(userRole));

      const response = await usersManagementController.assignRoleToUser(
        assignRoleToUserDto,
      );
      expect(response).toEqual(new UserRoleResponse(userRole));
    });

    it('should return a 500 error if there is a problem assinging the user role', async () => {
      const assignRoleToUserDto = new AssignRoleToUserDto();
      assignRoleToUserDto.roleId = 1;
      assignRoleToUserDto.userId = 1;

      jest
        .spyOn(usersManagementService, 'assignRoleToUser')
        .mockImplementation(() => {
          throw new HttpException(
            'Test error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });

      try {
        await usersManagementController.assignRoleToUser(assignRoleToUserDto);
        fail();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Test error');
      }
    });
  });

  describe('unassign role', () => {
    it('should return a undefined(void) response', async () => {
      const unassignRoleToUserDto = new UnassignRoleToUserDto();
      unassignRoleToUserDto.roleId = 1;
      unassignRoleToUserDto.userId = 1;

      jest
        .spyOn(usersManagementService, 'unassignRoleFromUser')
        .mockImplementation(() => Promise.resolve(undefined));

      const response = await usersManagementController.unassignRoleFromUser(
        unassignRoleToUserDto,
      );

      expect(response).toBeUndefined();
    });

    it('should return a 500 error if there is a problem unassinging the user role', async () => {
      const unassignRoleToUserDto = new UnassignRoleToUserDto();
      unassignRoleToUserDto.roleId = 1;
      unassignRoleToUserDto.userId = 1;

      jest
        .spyOn(usersManagementService, 'unassignRoleFromUser')
        .mockImplementation(() => {
          throw new HttpException(
            'Test error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });

      try {
        await usersManagementController.unassignRoleFromUser(
          unassignRoleToUserDto,
        );
        fail();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Test error');
      }
    });
  });

  describe('assign permission', () => {
    it('should return a user permission response', async () => {
      const assignPermissionToUserDto = new AssignPermissionToUserDto();
      assignPermissionToUserDto.permissionId = 1;
      assignPermissionToUserDto.userId = 1;

      const userPermission: UserPermission = {
        userId: 1,
        permissionId: 1,
        permission: new Permission(),
      };
      jest
        .spyOn(usersManagementService, 'assignPermissionToUser')
        .mockImplementation(() => Promise.resolve(userPermission));

      const response = await usersManagementController.assignPermissionToUser(
        assignPermissionToUserDto,
      );
      expect(response).toEqual(new UserPermissionResponse(userPermission));
    });

    it('should return a 500 error if there is a problem assinging the user permission', async () => {
      const assignPermissionToUserDto = new AssignPermissionToUserDto();
      assignPermissionToUserDto.permissionId = 1;
      assignPermissionToUserDto.userId = 1;

      jest
        .spyOn(usersManagementService, 'assignPermissionToUser')
        .mockImplementation(() => {
          throw new HttpException(
            'Test error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });

      try {
        await usersManagementController.assignPermissionToUser(
          assignPermissionToUserDto,
        );
        fail();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Test error');
      }
    });
  });

  describe('unassign permission', () => {
    it('should return a undefined(void) response', async () => {
      const unassignPermissionToUserDto = new UnassignPermissionToUserDto();
      unassignPermissionToUserDto.permissionId = 1;
      unassignPermissionToUserDto.userId = 1;

      jest
        .spyOn(usersManagementService, 'unassignPermissionFromUser')
        .mockImplementation(() => Promise.resolve(undefined));

      const response =
        await usersManagementController.unassignPermissionFromUser(
          unassignPermissionToUserDto,
        );

      expect(response).toBeUndefined();
    });

    it('should return a 500 error if there is a problem unassinging the user permission', async () => {
      const unassignPermissionToUserDto = new UnassignPermissionToUserDto();
      unassignPermissionToUserDto.permissionId = 1;
      unassignPermissionToUserDto.userId = 1;

      jest
        .spyOn(usersManagementService, 'unassignPermissionFromUser')
        .mockImplementation(() => {
          throw new HttpException(
            'Test error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });

      try {
        await usersManagementController.unassignPermissionFromUser(
          unassignPermissionToUserDto,
        );
        fail();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Test error');
      }
    });
  });
});
