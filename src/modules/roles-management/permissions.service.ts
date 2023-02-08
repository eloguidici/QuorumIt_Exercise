/**
 * @file Permissions Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../commons/logger-service';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { UpdatePermissionDto } from './dtos/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { PermissionsRepository } from './permissions.repository';

@Injectable()
export class PermissionsService {
  constructor(
    private permissionsRepository: PermissionsRepository,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Creates a new permission
   * @param permissionDto - The permission data transfer object
   * @returns The created permission
   */
  async create(permissionDto: CreatePermissionDto): Promise<Permission> {
    try {
      const permission = this.buildPermission(permissionDto);
      return await this.permissionsRepository.create(permission);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to create permission: ${error.message}`);
    }
  }

  /**
   * Updates a permission
   * @param permissionDto - The updated permission data transfer object
   * @returns The updated permission
   */
  async update(permissionDto: UpdatePermissionDto): Promise<Permission> {
    try {
      const permission = this.buildPermission(permissionDto);
      return await this.permissionsRepository.update(permission);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to update permission: ${error.message}`);
    }
  }

  /**
   * Deletes a permission
   * @param id - The permission ID
   */
  async delete(id: number): Promise<void> {
    try {
      return await this.permissionsRepository.delete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to delete permission: ${error.message}`);
    }
  }

  /**
   * Gets all permissions
   * @returns An array of permissions
   */
  async findAll(): Promise<Permission[]> {
    try {
      return await this.permissionsRepository.findAll();
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to retrieve permissions: ${error.message}`);
    }
  }

  /**
   * Gets the first permission matching the given ID
   * @param id - The permission ID
   * @returns The found permission
   */
  async findFirst(id: number): Promise<Permission> {
    try {
      return await this.permissionsRepository.findFirst(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to retrieve permission: ${error.message}`);
    }
  }

  /**
   * Builds a permission instance from a DTO
   * @param permissionDto - The permission data transfer object
   * @returns The built permission instance
   */
  private buildPermission(
    permissionDto: CreatePermissionDto | UpdatePermissionDto,
  ): Permission {
    try {
      const permission = new Permission();
      permission.name = permissionDto.name;
      'id' in permissionDto
        ? (permission.id = (permissionDto as UpdatePermissionDto).id)
        : null;
      return permission;
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Error building permission`);
    }
  }
}
