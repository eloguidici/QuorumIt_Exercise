/**
 * @file Roles Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../commons/logger-service';
import { AssignPermissionToRoleDto } from './dtos/assign-permission-to-role.dto';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UnassignPermissionToRoleDto } from './dtos/unassign-permission-to-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { RolePermission } from './entities/role-permission.entity';
import { Role } from './entities/role.entity';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(
    private rolesRepository: RolesRepository,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Creates a new role
   * @param roleDto - The role data transfer object
   * @returns The created role
   */
  async create(roleDto: CreateRoleDto): Promise<Role> {
    try {
      const role = this.buildRole(roleDto);
      return await this.rolesRepository.create(role);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to create role: ${error.message}`);
    }
  }

  /**
   * Updates a role
   * @param roleDto - The updated role data transfer object
   * @returns The updated role
   */
  async update(roleDto: UpdateRoleDto): Promise<Role> {
    try {
      const role = this.buildRole(roleDto);
      return await this.rolesRepository.update(role);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to update role: ${error.message}`);
    }
  }

  /**
   * Deletes a role
   * @param id - The role ID
   */
  async delete(id: number): Promise<void> {
    try {
      return await this.rolesRepository.delete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to delete role: ${error.message}`);
    }
  }

  /**
   * Gets all roles
   * @returns An array of roles
   */
  async findAll(): Promise<Role[]> {
    try {
      return await this.rolesRepository.findAll();
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to retrieve roles: ${error.message}`);
    }
  }

  /**
   * Gets the first role matching the given ID
   * @param id - The role ID
   * @returns The found role
   */
  async findFirst(id: number): Promise<Role> {
    try {
      return await this.rolesRepository.findFirst(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to retrieve role: ${error.message}`);
    }
  }

  /**
   * Builds a role instance from a DTO
   * @param roleDto - The role data transfer object
   * @returns The built role instance
   */
  private buildRole(roleDto: CreateRoleDto | UpdateRoleDto): Role {
    try {
      const role = new Role();
      role.name = roleDto.name;
      'id' in roleDto ? (role.id = (roleDto as UpdateRoleDto).id) : null;
      return role;
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Error building role`);
    }
  }

  /**
   * Assigns a permission to a role
   * @param assignPermissionToRoleDto - Data transfer object containing roleId and permissionId
   * @returns A Promise that returns the assigned RolePermission
   * @throws Error with message if assignment fails
   */
  async assignPermissionToRole(
    assignPermissionToRoleDto: AssignPermissionToRoleDto,
  ): Promise<RolePermission> {
    try {
      const rolePermission = this.buildRolePermission(
        assignPermissionToRoleDto,
      );
      return await this.rolesRepository.assignPermissionToRole(rolePermission);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(
        `Failed to assign permission ${assignPermissionToRoleDto.permissionId} to role ${assignPermissionToRoleDto.roleId}: ${error.message}`,
      );
    }
  }

  /**
   * Unassigns a permission from a role
   * @param assignPermissionToRoleDto - Data transfer object containing roleId and permissionId
   * @returns A Promise that returns void
   * @throws Error with message if unassignment fails
   */
  async unassignPermissionFromRole(
    assignPermissionToRoleDto: UnassignPermissionToRoleDto,
  ): Promise<void> {
    try {
      const rolePermission = this.buildRolePermission(
        assignPermissionToRoleDto,
      );
      return await this.rolesRepository.unassignPermissionFromRole(
        rolePermission,
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(
        `Failed to unassign permission ${assignPermissionToRoleDto.permissionId} to role ${assignPermissionToRoleDto.roleId}: ${error.message}`,
      );
    }
  }

  /**
   * Builds a RolePermission instance based on the data transfer object
   * @param rolePermissionDto - Data transfer object containing roleId and permissionId
   * @returns A RolePermission instance
   * @throws Error with message if building fails
   */
  private buildRolePermission(
    rolePermissionDto: AssignPermissionToRoleDto | UnassignPermissionToRoleDto,
  ): RolePermission {
    try {
      const rolePermission = new RolePermission();
      rolePermission.roleId = rolePermissionDto.roleId;
      rolePermission.permissionId = rolePermissionDto.permissionId;
      return rolePermission;
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Error building role permission`);
    }
  }
}
