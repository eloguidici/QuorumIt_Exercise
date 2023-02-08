/**
 * @file Users Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../commons/logger-service';
import { CryptoService } from '../commons/crypto.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly logger: LoggerService,
    private readonly passwordService: CryptoService,
  ) {}

  /**
   * Creates a new user
   * @param userDto - The user data transfer object
   * @returns The created user
   */
  async create(userDto: CreateUserDto): Promise<User> {
    try {
      await this.validateEmail(userDto);
      const user = await this.buildUser(userDto);
      return await this.usersRepository.create(user);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  /**
   * Updates a user
   * @param userDto - The updated user data transfer object
   * @returns The updated user
   */
  async update(userDto: UpdateUserDto): Promise<User> {
    try {
      await this.validateEmail(userDto);
      const user = await this.buildUser(userDto);
      return await this.usersRepository.update(user);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  /**
   * Deletes a user
   * @param id - The user ID
   */
  async delete(id: number): Promise<void> {
    try {
      return await this.usersRepository.delete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  /**
   * Gets all users
   * @returns An array of users
   */
  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.findAll();
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to retrieve users: ${error.message}`);
    }
  }

  /**
   * Gets the first user matching the given ID
   * @param id - The user ID
   * @returns The found user
   */
  async findFirst(id: number): Promise<User> {
    try {
      return await this.usersRepository.findFirst(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to retrieve user: ${error.message}`);
    }
  }

  /**
   * Builds a user instance from a DTO
   * @param userDto - The user data transfer object
   * @returns The built user instance
   */
  private async buildUser(
    userDto: CreateUserDto | UpdateUserDto,
  ): Promise<User> {
    try {
      const user = new User();
      user.name = userDto.name;
      user.email = userDto.email;
      'password' in userDto
        ? (user.password = await this.passwordService.encrypt(
            (userDto as CreateUserDto).password,
          ))
        : null;
      'id' in userDto ? (user.id = (userDto as UpdateUserDto).id) : null;
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Error building user`);
    }
  }

  /**
   * Validate user's email and password
   * @param email string
   * @param password string
   * @returns Promise<User>
   */
  async validateEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    {
      try {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) throw new Error(`User ${email} not found`);
        const isValid = await this.passwordService.compare(
          password,
          user.password,
        );
        return isValid ? user : null;
      } catch (error) {
        this.logger.error(error.message);
        throw new Error(`Error validating email and password`);
      }
    }
  }

  /**
   * Validate user's email
   * @param userDto - The user data transfer object
   * @returns Promise<void>
   */
  async validateEmail(userDto: CreateUserDto | UpdateUserDto): Promise<void> {
    try {
      const user = await this.usersRepository.findByEmail(userDto.email);
      if (!user) return;
      if ('id' in userDto) {
        if (user.id == userDto.id) return;
        throw new Error(`Error validating email, it already exists`);
      }
      throw new Error(`Error validating email, it already exists`);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Error validating email`);
    }
  }
}
