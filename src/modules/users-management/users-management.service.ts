/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../commons/logger-service';
import { AssignPermissionToUserDto } from './dtos/assign-permission-to-user.dto';
import { AssignRoleToUserDto } from './dtos/assign-role-to-user.dto';
import { UnassignPermissionToUserDto } from './dtos/unassign-permission-to-user.dto';
import { UnassignRoleToUserDto } from './dtos/unassign-role-to-user.dto';
import { UserPermission } from './entites/user-permission.entity';
import { UserRole } from './entites/user-role.entity';
import { UsersManagementRepository } from './users-management.repository';

@Injectable()
export class UsersManagementService {
  constructor(
    private usersManagementRepository: UsersManagementRepository,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Assigns a role to a user
   * @param assignPermissionToRoleDto - Data transfer object containing userId and roleId
   * @returns A Promise that returns the assigned UserRole
   * @throws Error with message if assignment fails
   */
  async assignRoleToUser(
    assignRoleToUserDto: AssignRoleToUserDto,
  ): Promise<UserRole> {
    try {
      const userRole = this.buildUserRole(assignRoleToUserDto);
      return await this.usersManagementRepository.assignRoleToUser(userRole);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(
        `Failed to assign role ${assignRoleToUserDto.roleId} to user ${assignRoleToUserDto.userId}: ${error.message}`,
      );
    }
  }

  /**
   * Unassigns a role to a user
   * @param assignPermissionToRoleDto - Data transfer object containing userId and roleId
   * @returns A Promise that returns the assigned UserRole
   * @throws Error with message if assignment fails
   */
  async unassignRoleFromUser(
    assignRoleToUserDto: UnassignRoleToUserDto,
  ): Promise<void> {
    try {
      const userRole = this.buildUserRole(assignRoleToUserDto);
      return await this.usersManagementRepository.unassignRoleFromUser(
        userRole,
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(
        `Failed to unassign role ${assignRoleToUserDto.roleId} to user ${assignRoleToUserDto.userId}: ${error.message}`,
      );
    }
  }

  /**
   * Builds a UserRole instance based on the data transfer object
   * @param userRoleDto - Data transfer object containing userId and roleId
   * @returns A UserRole instance
   * @throws Error with message if building fails
   */
  private buildUserRole(
    userRoleDto: AssignRoleToUserDto | UnassignRoleToUserDto,
  ): UserRole {
    try {
      const userRole = new UserRole();
      userRole.userId = userRoleDto.userId;
      userRole.roleId = userRoleDto.roleId;
      return userRole;
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Error building user role`);
    }
  }

  /**
   * Assigns a permission to a user
   * @param assignPermissionToUserDto - Data transfer object containing userId and permissionId
   * @returns A Promise that returns the assigned UserPermission
   * @throws Error with message if assignment fails
   */
  async assignPermissionToUser(
    assignPermissionToUserDto: AssignPermissionToUserDto,
  ): Promise<UserPermission> {
    try {
      const userPermission = this.buildUserPermission(
        assignPermissionToUserDto,
      );
      return await this.usersManagementRepository.assignPermissionToUser(
        userPermission,
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(
        `Failed to assign permission ${assignPermissionToUserDto.permissionId} to user ${assignPermissionToUserDto.userId}: ${error.message}`,
      );
    }
  }

  /**
   * Unassigns a permission to a user
   * @param unassignPermissionToUserDto - Data transfer object containing userId and permissionId
   * @returns A Promise that returns the assigned UserPermission
   * @throws Error with message if assignment fails
   */
  async unassignPermissionFromUser(
    unassignPermissionToUserDto: UnassignPermissionToUserDto,
  ): Promise<void> {
    try {
      const userPermission = this.buildUserPermission(
        unassignPermissionToUserDto,
      );
      return await this.usersManagementRepository.unassignPermissionFromUser(
        userPermission,
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(
        `Failed to unassign permission ${unassignPermissionToUserDto.permissionId} to user ${unassignPermissionToUserDto.userId}: ${error.message}`,
      );
    }
  }

  /**
   * Builds a UserPermission instance based on the data transfer object
   * @param userPermissionDto - Data transfer object containing userId and permissionId
   * @returns A UserPermission instance
   * @throws Error with message if building fails
   */
  private buildUserPermission(
    userPermissionDto: AssignPermissionToUserDto | UnassignPermissionToUserDto,
  ): UserPermission {
    try {
      const userPermission = new UserPermission();
      userPermission.userId = userPermissionDto.userId;
      userPermission.permissionId = userPermissionDto.permissionId;
      return userPermission;
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Error building user permission`);
    }
  }
}
