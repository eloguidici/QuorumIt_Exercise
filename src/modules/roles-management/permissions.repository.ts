/**
 * @file Permissions Repository
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Permission } from './entities/permission.entity';
import { plainToInstance } from 'class-transformer';
import { LoggerService } from '../commons/logger-service';
import { DatabaseErrorEnum } from '../commons/enums/database-error.enum';

@Injectable()
export class PermissionsRepository {
  constructor(
    private prisma: PrismaClient,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Creates a new permission
   * @param data Permission data to create
   */
  async create(data: Permission) {
    try {
      const permission = await this.prisma.permission.create({
        data: {
          name: data.name,
        },
      });
      return plainToInstance(Permission, permission);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  /**
   * Updates an existing permission
   * @param data Permission data to update
   * @returns The updated permission
   */
  async update(data: Permission): Promise<Permission | null> {
    try {
      const updatedPermission = await this.prisma.permission.update({
        where: { id: data.id },
        data: {
          name: data.name,
        },
      });
      return plainToInstance(Permission, updatedPermission);
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === DatabaseErrorEnum.NOT_FOUND) {
        throw new Error(`Permission ${data.id} not found`);
      }
      throw error;
    }
  }

  /**
   * Deletes a permission by ID
   *
   * @param {number} id - Permission ID to delete
   *
   * @throws {Error} If the permission with the provided ID was not found
   */
  async delete(id: number): Promise<void> {
    try {
      await this.prisma.permission.delete({ where: { id } });
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === DatabaseErrorEnum.NOT_FOUND) {
        throw new Error(`Permission with ID ${id} was not found`);
      }
      throw error;
    }
  }

  /**
   * Finds all permissions
   * @returns Array of permissions
   */
  async findAll(): Promise<Permission[]> {
    try {
      const permissions = await this.prisma.permission.findMany();
      return permissions.map((permission) =>
        plainToInstance(Permission, permission),
      );
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  /**
   * Finds a permission by ID
   * @param id Permission ID to find
   * @returns The found permission or error if not found
   */
  async findFirst(id: number): Promise<Permission | null> {
    try {
      const permission = await this.prisma.permission.findFirstOrThrow({
        where: { id: id },
      });
      return plainToInstance(Permission, permission);
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === DatabaseErrorEnum.NOT_FOUND) {
        throw new Error(`Permission ${id} not found`);
      }
      throw error;
    }
  }
}
