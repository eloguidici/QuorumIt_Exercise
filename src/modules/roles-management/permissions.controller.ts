/**
 * @file Permissions Controller
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
import { LoggerService } from '../commons/logger-service';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { PermissionResponse } from './dtos/permission-response.dto';
import { UpdatePermissionDto } from './dtos/update-permission.dto';
import { PermissionsService } from './permissions.service';

/**
 * Permissions Controller
 */
@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  /**
   * Permissions Controller Constructor
   * @param {PermissionsService} permissionsService Permissions Service
   * @param {LoggerService} logger Winston Logger
   */
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Create a new permission
   * @param {CreatePermissionDto} permissionDto Permission creation DTO
   * @return {Promise<PermissionResponse>} PermissionResponse Promise
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
  async create(
    @Body() permissionDto: CreatePermissionDto,
  ): Promise<PermissionResponse> {
    try {
      const permission = await this.permissionsService.create(permissionDto);
      return new PermissionResponse(permission);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update a permission
   * @param {UpdatePermissionDto} permissionDto Permission update DTO
   * @return {Promise<PermissionResponse>} PermissionResponse Promise
   */
  @Put()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AdministratorGuard)
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
  async update(
    @Body() permissionDto: UpdatePermissionDto,
  ): Promise<PermissionResponse> {
    try {
      const permission = await this.permissionsService.update(permissionDto);
      return new PermissionResponse(permission);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Delete a permission
   * @param {string} id Permission ID
   * @return {Promise<void>} Void Promise
   */
  @Delete(':id')
  @HttpCode(200)
  @UseGuards(AdministratorGuard)
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
      await this.permissionsService.delete(Number(params.id));
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get all permissions
   * @return {Promise<PermissionResponse[]>} Promise containing an array of PermissionResponse objects
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
  async findAll(): Promise<PermissionResponse[]> {
    try {
      const permissions = await this.permissionsService.findAll();
      return permissions.map(
        (permission) => new PermissionResponse(permission),
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Find first permission by id
   * @param {Params} params - Express params object with id
   * @return {Promise<PermissionResponse>} Promise with PermissionResponse object
   */
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
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
  async findFirst(@Param() params): Promise<PermissionResponse> {
    try {
      const permission = await this.permissionsService.findFirst(
        Number(params.id),
      );
      return new PermissionResponse(permission);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
