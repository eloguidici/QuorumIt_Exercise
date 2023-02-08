/**
 * @file Users Management Controller
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { LoggerService } from '../commons/logger-service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignRoleToUserDto } from './dtos/assign-role-to-user.dto';
import { UsersManagementService } from './users-management.service';
import { UserRoleResponse } from './dtos/user-role-response.dto';
import { UnassignRoleToUserDto } from './dtos/unassign-role-to-user.dto';
import { UserPermissionResponse } from './dtos/user-permission-response.dto';
import { AssignPermissionToUserDto } from './dtos/assign-permission-to-user.dto';
import { UnassignPermissionToUserDto } from './dtos/unassign-permission-to-user.dto';
import { AdministratorGuard } from '../auth/guards/administrator-guard';

/**
 * Users Management Controller
 */
@ApiTags('Users Management')
@Controller('usersManagement')
export class UsersManagementController {
  /**
   * Users Management Controller Constructor
   * @param {UsersManagementService} usersManagementService Users Management Service
   * @param {LoggerService} logger Winston Logger
   */
  constructor(
    private readonly usersManagementService: UsersManagementService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Assigns role to a user
   * @param assignRoleToUserDto - Contains the data to assign role to a user
   * @returns A promise that resolves to a UserRoleResponse object
   * @throws HttpException in case of an internal server error
   */
  @Post('assignRole')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @UseGuards(AdministratorGuard)
  async assignRoleToUser(
    @Body() assignRoleToUserDto: AssignRoleToUserDto,
  ): Promise<UserRoleResponse> {
    try {
      const userRole = await this.usersManagementService.assignRoleToUser(
        assignRoleToUserDto,
      );
      return new UserRoleResponse(userRole);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Unassigns role to a user
   * @param unassignRoleToUserDto - Contains the data to unassign role to a user
   * @returns A promise that resolves to a UserRoleResponse object
   * @throws HttpException in case of an internal server error
   */
  @Post('unassignRole')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @UseGuards(AdministratorGuard)
  @ApiResponse({
    status: 201,
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
  async unassignRoleFromUser(
    @Body() unassignRoleToUserDto: UnassignRoleToUserDto,
  ): Promise<void> {
    try {
      await this.usersManagementService.unassignRoleFromUser(
        unassignRoleToUserDto,
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Assigns role to a user
   * @param assignPermissionToUserDto - Contains the data to assign permission to a user
   * @returns A promise that resolves to a UserPermissionResponse object
   * @throws HttpException in case of an internal server error
   */
  @Post('assignPermission')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @UseGuards(AdministratorGuard)
  @ApiResponse({
    status: 201,
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
  async assignPermissionToUser(
    @Body() assignPermissionToUserDto: AssignPermissionToUserDto,
  ): Promise<UserPermissionResponse> {
    try {
      const userPermission =
        await this.usersManagementService.assignPermissionToUser(
          assignPermissionToUserDto,
        );
      return new UserPermissionResponse(userPermission);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Unassigns role to a user
   * @param unassignPermissionToUserDto - Contains the data to unassign permission to a user
   * @returns A promise that resolves to a UserPermissionResponse object
   * @throws HttpException in case of an internal server error
   */
  @Post('unassignPermission')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @UseGuards(AdministratorGuard)
  @ApiResponse({
    status: 201,
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
  async unassignPermissionFromUser(
    @Body() unassignPermissionToUserDto: UnassignPermissionToUserDto,
  ): Promise<void> {
    try {
      await this.usersManagementService.unassignPermissionFromUser(
        unassignPermissionToUserDto,
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
