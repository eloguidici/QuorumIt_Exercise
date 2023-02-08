/**
 * @file Roles Controller
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
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdministratorGuard } from '../auth/guards/administrator-guard';
import { ForbiddenAssignRoleIdGuard } from '../auth/guards/forbidden-assign-role-id-guard';
import { ForbiddenRoleIdGuard } from '../auth/guards/forbidden-role-id-guard';
import { ForbiddenUnssignRoleIdGuard } from '../auth/guards/forbidden-unassign-role-id-guard';
import { LoggerService } from '../commons/logger-service';
import { AssignPermissionToRoleDto } from './dtos/assign-permission-to-role.dto';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RolePermissionResponse } from './dtos/role-permission-response.dto';
import { RoleResponse } from './dtos/role-response.dto';
import { UnassignPermissionToRoleDto } from './dtos/unassign-permission-to-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { RolesService } from './roles.service';

/**
 * Roles Controller
 */
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  /**
   * Roles Controller Constructor
   * @param {RolesService} rolesService Roles Service
   * @param {LoggerService} logger Winston Logger
   */
  constructor(
    private readonly rolesService: RolesService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Create a new role
   * @param {CreateRoleDto} roleDto Role creation DTO
   * @return {Promise<void>} Void Promise
   */
  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @UseGuards(AdministratorGuard)
  @ApiBearerAuth('access-token')
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
  async create(@Body() roleDto: CreateRoleDto): Promise<RoleResponse> {
    try {
      const role = await this.rolesService.create(roleDto);
      return new RoleResponse(role);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update a role
   * @param {UpdateRoleDto} roleDto Role update DTO
   * @return {Promise<void>} Void Promise
   */
  @Put()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AdministratorGuard)
  @UseGuards(ForbiddenRoleIdGuard)
  @ApiBearerAuth('access-token')
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
  async update(@Body() roleDto: UpdateRoleDto): Promise<RoleResponse> {
    try {
      const role = await this.rolesService.update(roleDto);
      return new RoleResponse(role);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  Delete a role
  @param {string} id Role ID
  @return {Promise<void>} Void Promise
  */
  @Delete(':id')
  @HttpCode(200)
  @UseGuards(AdministratorGuard)
  @UseGuards(ForbiddenRoleIdGuard)
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
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
      await this.rolesService.delete(Number(params.id));
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get all roles
   * @return {Promise<void>} Void Promise
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
  async findAll(): Promise<RoleResponse[]> {
    try {
      const roles = await this.rolesService.findAll();
      return roles.map((role) => new RoleResponse(role));
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get the first role by ID
   * @param params - URL parameters containing the role ID
   * @returns A promise that resolves to a RoleResponse object
   */
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
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
  async findFirst(@Param() params): Promise<RoleResponse> {
    try {
      const role = await this.rolesService.findFirst(Number(params.id));
      return new RoleResponse(role);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Assigns permissions to a role
   * @param assignPermissionToRoleDto - Contains the data to assign permissions to a role
   * @returns A promise that resolves to a RolePermissionResponse object
   * @throws HttpException in case of an internal server error
   */
  @Post('assignPermission')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @UseGuards(AdministratorGuard)
  @UseGuards(ForbiddenAssignRoleIdGuard)
  @ApiBearerAuth('access-token')
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
  async assignPermissionToRole(
    @Body() assignPermissionToRoleDto: AssignPermissionToRoleDto,
  ): Promise<RolePermissionResponse> {
    try {
      const rolePermission = await this.rolesService.assignPermissionToRole(
        assignPermissionToRoleDto,
      );
      return new RolePermissionResponse(rolePermission);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Unassigns a permission from a role
   * @param unassignPermissionToRoleDto - Contains the data to unassign a permission from a role
   * @returns A promise that resolves to void
   * @throws HttpException in case of an internal server error
   */
  @Post('unassignPermission')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @UseGuards(AdministratorGuard)
  @UseGuards(ForbiddenUnssignRoleIdGuard)
  @ApiBearerAuth('access-token')
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
  async unassignPermissionFromRole(
    @Body() unassignPermissionToRoleDto: UnassignPermissionToRoleDto,
  ): Promise<void> {
    try {
      await this.rolesService.unassignPermissionFromRole(
        unassignPermissionToRoleDto,
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
