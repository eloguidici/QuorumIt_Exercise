/**
 * @file Users Controller
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { LoggerService } from '../commons/logger-service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponse } from './dtos/user-response.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdministratorGuard } from '../auth/guards/administrator-guard';

/**
 * Users Controller
 */
@ApiTags('Users')
@Controller('users')
export class UsersController {
  /**
   * Users Controller Constructor
   * @param {UsersService} usersService Users Service
   * @param {LoggerService} logger Winston Logger
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Create a new user
   * @param {CreateUserDto} userDto User creation DTO
   * @return {Promise<UserResponse>} UserResponse Promise
   */
  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @UseGuards(AdministratorGuard)
  @ApiResponse({
    status: 201,
    description: 'Successful response',
    type: UserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid username or password',
  })
  @ApiResponse({
    status: 500,
    description: 'Server error - An unexpected error occurred on the server',
  })
  async create(@Body() userDto: CreateUserDto): Promise<UserResponse> {
    try {
      const user = await this.usersService.create(userDto);
      return new UserResponse(user);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update a user
   * @param {UpdateUserDto} userDto User update DTO
   * @return {Promise<void>} Void Promise
   */
  @Put()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AdministratorGuard)
  @ApiResponse({
    status: 201,
    description: 'Successful response',
    type: UserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 500,
    description: 'Server error - An unexpected error occurred on the server',
  })
  async update(@Body() userDto: UpdateUserDto): Promise<UserResponse> {
    try {
      const user = await this.usersService.update(userDto);
      return new UserResponse(user);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Delete a user
   * @param {string} params User ID
   * @return {Promise<void>} Void Promise
   */
  @Delete(':id')
  @HttpCode(200)
  @UseGuards(AdministratorGuard)
  @ApiResponse({
    status: 200,
    description: 'Successful response',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 500,
    description: 'Server error - An unexpected error occurred on the server',
  })
  async delete(@Param() params): Promise<void> {
    try {
      await this.usersService.delete(Number(params.id));
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get all users
   * @returns Promise<UserResponse[]>
   */
  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Successful response',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 500,
    description: 'Server error - An unexpected error occurred on the server',
  })
  async findAll(): Promise<UserResponse[]> {
    try {
      const users = await this.usersService.findAll();
      return users.map((user) => new UserResponse(user));
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get the first user by id
   * @param params
   * @returns Promise<UserResponse>
   */
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Successful response',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 500,
    description: 'Server error - An unexpected error occurred on the server',
  })
  async findFirst(@Param() params): Promise<UserResponse> {
    try {
      const user = await this.usersService.findFirst(Number(params.id));
      return new UserResponse(user);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
