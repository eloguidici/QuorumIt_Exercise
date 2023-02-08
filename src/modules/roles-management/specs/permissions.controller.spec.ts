/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../../commons/logger-service';
import { AdministratorGuard } from '../../auth/guards/administrator-guard';
import { CryptoService } from '../../commons/crypto.service';
import { PrismaClient } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PermissionsController } from '../permissions.controller';
import { PermissionsRepository } from '../permissions.repository';
import { PermissionsService } from '../permissions.service';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { Permission } from '../entities/permission.entity';
import { PermissionResponse } from '../dtos/permission-response.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';

describe('UsersController', () => {
  let permissionsController: PermissionsController;
  let permissionsService: PermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        PermissionsService,
        PermissionsRepository,
        LoggerService,
        CryptoService,
        PrismaClient,
        {
          provide: AdministratorGuard,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    permissionsController = module.get<PermissionsController>(
      PermissionsController,
    );
    permissionsService = module.get<PermissionsService>(PermissionsService);
  });

  describe('create', () => {
    it('should return a permission response', async () => {
      const permissionDto = new CreatePermissionDto();
      permissionDto.name = 'Sales';

      const permission: Permission = {
        id: 1,
        name: 'Sales',
        created_at: new Date(),
        updated_at: undefined,
      };
      jest
        .spyOn(permissionsService, 'create')
        .mockImplementation(() => Promise.resolve(permission));

      const response = await permissionsController.create(permissionDto);
      expect(response).toEqual(new PermissionResponse(permission));
    });

    it('should return a 500 error if there is a problem creating the permission', async () => {
      const permissionDto = new CreatePermissionDto();
      permissionDto.name = 'Sales';

      jest.spyOn(permissionsService, 'create').mockImplementation(() => {
        throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
      });

      try {
        await permissionsController.create(permissionDto);
        fail();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Test error');
      }
    });
  });

  describe('update', () => {
    it('should return a permission response', async () => {
      const permissionDto = new UpdatePermissionDto();
      permissionDto.id = 1;
      permissionDto.name = 'Sales';

      const permission: Permission = {
        id: 1,
        name: 'Sales',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest
        .spyOn(permissionsService, 'update')
        .mockImplementation(() => Promise.resolve(permission));

      const response = await permissionsController.update(permissionDto);
      expect(response).toEqual(new PermissionResponse(permission));
    });

    it('should return a 500 error if there is a problem updating the permission', async () => {
      const permissionDto = new UpdatePermissionDto();
      permissionDto.id = 1;
      permissionDto.name = 'Sales';

      jest.spyOn(permissionsService, 'update').mockImplementation(() => {
        throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
      });

      try {
        await permissionsController.update(permissionDto);
        fail();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Test error');
      }
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const id = 1;
      const params = { id };
      jest
        .spyOn(permissionsService, 'delete')
        .mockImplementation(() => Promise.resolve());

      await permissionsController.delete(params);

      expect(permissionsService.delete).toHaveBeenCalledWith(id);
    });

    it('should return a 500 error if there is a problem updating the permission', async () => {
      const id = 1;
      const params = { id };

      jest.spyOn(permissionsService, 'delete').mockImplementation(() => {
        throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
      });

      try {
        await permissionsController.delete(params);
        fail();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Test error');
      }
    });
  });
});
