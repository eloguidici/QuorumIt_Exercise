/**
 * @file Users Repository
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { LoggerService } from '../commons/logger-service';
import { DatabaseErrorEnum } from '../commons/enums/database-error.enum';

@Injectable()
export class UsersRepository {
  constructor(
    private prisma: PrismaClient,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Creates a new user
   * @param data User data to create
   */
  async create(data: User) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });
      return plainToInstance(User, user);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  /**
   * Updates an existing user
   * @param data User data to update
   * @returns The updated user
   */
  async update(data: User): Promise<User | null> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: data.id },
        data: {
          name: data.name,
          email: data.email,
        },
      });
      return plainToInstance(User, updatedUser);
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === DatabaseErrorEnum.NOT_FOUND) {
        throw new Error(`User ${data.id} not found`);
      }
      throw error;
    }
  }

  /**
   * Deletes a user by ID
   *
   * @param {number} id - User ID to delete
   *
   * @throws {Error} If the user with the provided ID was not found
   */
  async delete(id: number): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === DatabaseErrorEnum.NOT_FOUND) {
        throw new Error(`User with ID ${id} was not found`);
      }
      throw error;
    }
  }

  /**
   * Finds all users
   * @returns Array of users
   */
  async findAll(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany({
        include: { userRoles: true, userPermissions: true },
      });
      return users.map((user) => plainToInstance(User, user));
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  /**
   * Finds a user by ID
   * @param id User ID to find
   * @returns The found user or error if not found
   */
  async findFirst(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: { id: id },
        include: { userRoles: true, userPermissions: true },
      });
      return plainToInstance(User, user);
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === DatabaseErrorEnum.NOT_FOUND) {
        throw new Error(`User ${id} not found`);
      }
      throw error;
    }
  }

  /**
   * Finds a user by Email
   * @param id User Email to find
   * @returns The found user or error if not found
   */
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: { email: email },
        include: { userRoles: true },
      });
      return plainToInstance(User, user);
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === DatabaseErrorEnum.NOT_FOUND) {
        throw new Error(`User ${email} not found`);
      }
      throw error;
    }
  }
}
