/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { LoggerService } from '../../commons/logger-service';
import { PrismaClient } from '@prisma/client';
import { AssignRoleToUserDto } from '../dtos/assign-role-to-user.dto';
import { UsersManagementService } from '../users-management.service';
import { UsersManagementRepository } from '../users-management.repository';
import { UserRole } from '../entites/user-role.entity';
import { UnassignRoleToUserDto } from '../dtos/unassign-role-to-user.dto';
import { AssignPermissionToUserDto } from '../dtos/assign-permission-to-user.dto';
import { UnassignPermissionToUserDto } from '../dtos/unassign-permission-to-user.dto';
import { UserPermission } from '../entites/user-permission.entity';

describe('UsersManagementService', () => {
  let usersManagementService: UsersManagementService;
  let usersManagementRepository: UsersManagementRepository;
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService();
    usersManagementRepository = new UsersManagementRepository(
      new PrismaClient(),
      loggerService,
    );
    usersManagementService = new UsersManagementService(
      usersManagementRepository,
      loggerService,
    );
  });

  describe('assign role', () => {
    it('assign a user role', async () => {
      const assignRoleToUserDto = new AssignRoleToUserDto();
      assignRoleToUserDto.roleId = 1;
      assignRoleToUserDto.userId = 1;

      const userRole: UserRole = {
        roleId: 1,
        userId: 1,
      };

      jest
        .spyOn(usersManagementRepository, 'assignRoleToUser')
        .mockResolvedValueOnce(userRole);

      const result = await usersManagementService.assignRoleToUser(
        assignRoleToUserDto,
      );

      expect(result).toEqual(userRole);
    });
  });

  describe('unassign role', () => {
    it('unassign a user role', async () => {
      const unassignRoleToUserDto = new UnassignRoleToUserDto();
      unassignRoleToUserDto.roleId = 1;
      unassignRoleToUserDto.userId = 1;

      jest
        .spyOn(usersManagementRepository, 'unassignRoleFromUser')
        .mockResolvedValueOnce(undefined);

      const result = await usersManagementService.unassignRoleFromUser(
        unassignRoleToUserDto,
      );

      expect(result).toBeUndefined();
    });
  });

  describe('assign permission', () => {
    it('assign a user permission', async () => {
      const assignPermissionToUserDto = new AssignPermissionToUserDto();
      assignPermissionToUserDto.permissionId = 1;
      assignPermissionToUserDto.userId = 1;

      const userPermission: UserPermission = {
        permissionId: 1,
        userId: 1,
      };

      jest
        .spyOn(usersManagementRepository, 'assignPermissionToUser')
        .mockResolvedValueOnce(userPermission);

      const result = await usersManagementService.assignPermissionToUser(
        assignPermissionToUserDto,
      );

      expect(result).toEqual(userPermission);
    });
  });

  describe('unassign permission', () => {
    it('unassign a user permission', async () => {
      const unassignPermissionToUserDto = new UnassignPermissionToUserDto();
      unassignPermissionToUserDto.permissionId = 1;
      unassignPermissionToUserDto.userId = 1;

      jest
        .spyOn(usersManagementRepository, 'unassignPermissionFromUser')
        .mockResolvedValueOnce(undefined);

      const result = await usersManagementService.unassignPermissionFromUser(
        unassignPermissionToUserDto,
      );

      expect(result).toBeUndefined();
    });
  });
});
