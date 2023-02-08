/**
 * @file Users Management Repository
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { LoggerService } from '../commons/logger-service';
import { DatabaseErrorEnum } from '../commons/enums/database-error.enum';
import { Permission } from '../roles-management/entities/permission.entity';
import { Role } from '../roles-management/entities/role.entity';
import { UserPermission } from './entites/user-permission.entity';
import { UserRole } from './entites/user-role.entity';

@Injectable()
export class UsersManagementRepository {
  constructor(
    private prisma: PrismaClient,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Assigns a role from a user.
   * @param {UserRole} data - The user and role information to unassign the role from.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   * @throws {Error} - If the role or user is not found, an error with the message
   * "Role [roleId] or User [userId] not found" will be thrown.
   */
  async assignRoleToUser(data: UserRole): Promise<UserRole> {
    try {
      const userRoleExists = await this.prisma.userRole.findFirst({
        where: { userId: data.userId, roleId: data.roleId },
      });
      if (userRoleExists) {
        return plainToInstance(UserRole, userRoleExists);
      }

      const userRole = await this.prisma.userRole.create({
        data: {
          userId: data.userId,
          roleId: data.roleId,
        },
      });
      return plainToInstance(UserRole, userRole);
    } catch (error) {
      this.logger.error(error.message);
      if (
        error.code === DatabaseErrorEnum.NOT_FOUND ||
        error.code === DatabaseErrorEnum.FOREIGN_KEY_CONSTRAINT_FAILED
      ) {
        throw new Error(`Role ${data.roleId} or User ${data.userId} not found`);
      }
      throw error;
    }
  }

  /**
   * Unassigns a role from a user.
   * @param {UserRole} data - The user and role information to unassign the role from.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   * @throws {Error} - If the role or user is not found, an error with the message
   * "Role [roleId] or User [userId] not found" will be thrown.
   */
  async unassignRoleFromUser(data: UserRole): Promise<void> {
    try {
      const userRole = await this.prisma.userRole.findFirstOrThrow({
        where: { userId: data.userId, roleId: data.roleId },
      });

      await this.prisma.userRole.delete({
        where: {
          id: userRole.id,
        },
      });
    } catch (error) {
      if (
        error.code === DatabaseErrorEnum.NOT_FOUND ||
        error.code === DatabaseErrorEnum.FOREIGN_KEY_CONSTRAINT_FAILED
      ) {
        throw new Error(`Role ${data.roleId} or User ${data.userId} not found`);
      }
    }
  }

  /**
   * Finds the roles associated with a user with a given userId.
   * @param {number} userId - The id of the user to find the roles for.
   * @returns {Promise<Role[]>} - A promise that resolves to an array of Role objects.
   * @throws {Error} - If the user's roles are not found, an error with the message "User Roles [userId] not found" will be thrown.
   */
  async findRolesByUserId(userId: number): Promise<Role[]> {
    try {
      const userRoles = await this.prisma.userRole.findMany({
        where: {
          userId,
        },
        include: {
          role: true,
        },
      });
      return userRoles.map((userRole) => plainToInstance(Role, userRole.role));
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === DatabaseErrorEnum.NOT_FOUND) {
        throw new Error(`User Roles ${userId} not found`);
      }
      throw error;
    }
  }

  /**
   * Assigns a permission from a user.
   * @param {UserPermission} data - The user and permission information to assign the permission from.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   * @throws {Error} - If the permission or user is not found, an error with the message
   * "Permission [permissionId] or User [userId] not found" will be thrown.
   */
  async assignPermissionToUser(data: UserPermission): Promise<UserPermission> {
    try {
      const userPermissionExists = await this.prisma.userPermission.findFirst({
        where: { userId: data.userId, permissionId: data.permissionId },
      });
      if (userPermissionExists) {
        return plainToInstance(UserPermission, userPermissionExists);
      }
      const userPermission = await this.prisma.userPermission.create({
        data: {
          userId: data.userId,
          permissionId: data.permissionId,
        },
      });
      return plainToInstance(UserPermission, userPermission);
    } catch (error) {
      this.logger.error(error.message);
      if (
        error.code === DatabaseErrorEnum.NOT_FOUND ||
        error.code === DatabaseErrorEnum.FOREIGN_KEY_CONSTRAINT_FAILED
      ) {
        throw new Error(
          `Permission ${data.permissionId} or User ${data.userId} not found`,
        );
      }
      throw error;
    }
  }

  /**
   * Unassigns a permission from a user.
   * @param {UserPermission} data - The user and permission information to unassign the permission from.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   * @throws {Error} - If the permission or user is not found, an error with the message
   * "Permission [permissionId] or User [userId] not found" will be thrown.
   */
  async unassignPermissionFromUser(data: UserPermission): Promise<void> {
    try {
      const userPermission = await this.prisma.userPermission.findFirstOrThrow({
        where: { userId: data.userId, permissionId: data.permissionId },
      });

      await this.prisma.userPermission.delete({
        where: {
          id: userPermission.id,
        },
      });
    } catch (error) {
      if (
        error.code === DatabaseErrorEnum.NOT_FOUND ||
        error.code === DatabaseErrorEnum.FOREIGN_KEY_CONSTRAINT_FAILED
      ) {
        throw new Error(
          `Permission ${data.permissionId} or User ${data.userId} not found`,
        );
      }
    }
  }

  /**
   * Finds the permissions associated with a user with a given userId.
   * @param {number} userId - The id of the user to find the permissions for.
   * @returns {Promise<Permission[]>} - A promise that resolves to an array of Permission objects.
   * @throws {Error} - If the user's permissions are not found, an error with the message "User Permissions [userId] not found" will be thrown.
   */
  async findPermissionsByUserId(userId: number): Promise<Permission[]> {
    try {
      const userPermissions = await this.prisma.userPermission.findMany({
        where: {
          userId,
        },
        include: {
          permission: true,
        },
      });
      return userPermissions.map((userPermission) =>
        plainToInstance(Permission, userPermission.permission),
      );
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === DatabaseErrorEnum.NOT_FOUND) {
        throw new Error(`User Permissions ${userId} not found`);
      }
      throw error;
    }
  }
}
