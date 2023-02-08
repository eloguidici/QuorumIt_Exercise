/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../../commons/logger-service';
import { AdministratorGuard } from '../../auth/guards/administrator-guard';
import { CryptoService } from '../../commons/crypto.service';
import { PrismaClient } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UsersManagementService } from '../users-management.service';
import { UsersManagementController } from '../users-management.controller';
import { UsersManagementRepository } from '../users-management.repository';
import { AssignRoleToUserDto } from '../dtos/assign-role-to-user.dto';
import { UserRole } from '../entites/user-role.entity';
import { UserRoleResponse } from '../dtos/user-role-response.dto';
import { UnassignRoleToUserDto } from '../dtos/unassign-role-to-user.dto';
import { AssignPermissionToUserDto } from '../dtos/assign-permission-to-user.dto';
import { UserPermission } from '../entites/user-permission.entity';
import { UserPermissionResponse } from '../dtos/user-permission-response.dto';
import { UnassignPermissionToUserDto } from '../dtos/unassign-permission-to-user.dto';

describe('UsersManagementController', () => {
  let usersManagementController: UsersManagementController;
  let usersManagementService: UsersManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
