/**
 * @file Roles Repository
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { DatabaseErrorEnum } from '../commons/enums/database-error.enum';
import { LoggerService } from '../commons/logger-service';
import { RolePermission } from './entities/role-permission.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesRepository {
  constructor(
    private prisma: PrismaClient,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Creates a new role
   * @param data Role data to create
   */
  async create(data: Role) {
    try {
      const role = await this.prisma.role.create({
        data: {
          name: data.name,
        },
      });
      return plainToInstance(Role, role);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  /**
   * Updates an existing role
   * @param data Role data to update
   * @returns The updated role
   */
  async update(data: Role): Promise<Role | null> {
    try {
      const updatedRole = await this.prisma.role.update({
        where: { id: data.id },
        data: {
          name: data.name,
        },
      });
      return plainToInstance(Role, updatedRole);
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === DatabaseErrorEnum.NOT_FOUND) {
        throw new Error(`Role ${data.id} not found`);
      }
      throw error;
    }
  }

  /**
   * Deletes a role by ID
   *
   * @param {number} id - Role ID to delete
   *
   * @throws {Error} If the role with the provided ID was not found
   */
  async delete(id: number): Promise<void> {
    try {
      await this.prisma.rolePermission.deleteMany({ where: { roleId: id } });
      await this.prisma.role.delete({ where: { id: id } });
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === DatabaseErrorEnum.NOT_FOUND) {
        throw new Error(`Role with ID ${id} was not found`);
      }
      if (error.code === DatabaseErrorEnum.FOREIGN_KEY_CONSTRAINT_FAILED) {
        throw new Error(
          `Role with ID ${id} cannot be removed because it is assigned to a User`,
        );
      }
      throw error;
    }
  }

  /**
   * Finds all roles
   * @returns Array of roles
   */
  async findAll(): Promise<Role[]> {
    try {
      const roles = await this.prisma.role.findMany({
        include: { rolePermissions: { include: { permission: true } } },
      });
      return roles.map((role) => plainToInstance(Role, role));
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  /**
   * Finds a role by ID
   * @param id Role ID to find
   * @returns The found role or error if not found
   */
  async findFirst(id: number): Promise<Role | null> {
    try {
      const role = await this.prisma.role.findFirstOrThrow({
        where: { id: id },
        include: { rolePermissions: { include: { permission: true } } },
      });
      return plainToInstance(Role, role);
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === DatabaseErrorEnum.NOT_FOUND) {
        throw new Error(`Role ${id} not found`);
      }
      throw error;
    }
  }

  /**
   * Assigns a permission to a role
   * @param data - Contains the data to assign a permission to a role
   * @returns A promise that resolves to a RolePermission object
   * @throws Error with message "Permission <permissionId> or Role <roleId> not found" if the role or permission was not found in the database
   */
  async assignPermissionToRole(data: RolePermission): Promise<RolePermission> {
    try {
      const rolePermissionExists = await this.prisma.rolePermission.findFirst({
        where: { permissionId: data.permissionId, roleId: data.roleId },
      });
      if (rolePermissionExists) {
        return plainToInstance(RolePermission, rolePermissionExists);
      }
      const rolePermission = await this.prisma.rolePermission.create({
        data: {
          roleId: data.roleId,
          permissionId: data.permissionId,
        },
      });
      return plainToInstance(RolePermission, rolePermission);
    } catch (error) {
      this.logger.error(error.message);
      if (
        error.code === DatabaseErrorEnum.NOT_FOUND ||
        error.code === DatabaseErrorEnum.FOREIGN_KEY_CONSTRAINT_FAILED
      ) {
        throw new Error(
          `Permission ${data.permissionId} or Role ${data.roleId} not found`,
        );
      }
      throw error;
    }
  }

  /**
   * Unassigns a permission from a role
   * @param data - Contains the data to unassign a permission from a role
   * @returns A promise that resolves to void
   * @throws Error with message "Permission <permissionId> or Role <roleId> not found" if the role or permission was not found in the database
   */
  async unassignPermissionFromRole(data: RolePermission): Promise<void> {
    try {
      const rolePermission = await this.prisma.rolePermission.findFirstOrThrow({
        where: { roleId: data.roleId, permissionId: data.permissionId },
      });

      await this.prisma.rolePermission.delete({
        where: {
          id: rolePermission.id,
        },
      });
    } catch (error) {
      if (
        error.code === DatabaseErrorEnum.NOT_FOUND ||
        error.code === DatabaseErrorEnum.FOREIGN_KEY_CONSTRAINT_FAILED
      ) {
        throw new Error(
          `Permission ${data.permissionId} or Role ${data.roleId} not found`,
        );
      }
    }
  }
}
