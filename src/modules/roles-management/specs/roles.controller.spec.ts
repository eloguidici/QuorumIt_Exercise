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
import { RolesController } from '../roles.controller';
import { RolesRepository } from '../roles.repository';
import { RolesService } from '../roles.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { Role } from '../entities/role.entity';
import { RoleResponse } from '../dtos/role-response.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';

describe('UsersController', () => {
  let rolesController: RolesController;
  let rolesService: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService,
        RolesRepository,
        LoggerService,
        CryptoService,
        PrismaClient,
        {
          provide: AdministratorGuard,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    rolesController = module.get<RolesController>(RolesController);
    rolesService = module.get<RolesService>(RolesService);
  });

  describe('create', () => {
    it('should return a role response', async () => {
      const roleDto = new CreateRoleDto();
      roleDto.name = 'Sales';

      const role: Role = {
        id: 1,
        name: 'Sales',
        created_at: new Date(),
        updated_at: undefined,
        rolePermissions: [],
      };
      jest
        .spyOn(rolesService, 'create')
        .mockImplementation(() => Promise.resolve(role));

      const response = await rolesController.create(roleDto);
      expect(response).toEqual(new RoleResponse(role));
    });

    it('should return a 500 error if there is a problem creating the role', async () => {
      const roleDto = new CreateRoleDto();
      roleDto.name = 'Sales';

      jest.spyOn(rolesService, 'create').mockImplementation(() => {
        throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
      });

      try {
        await rolesController.create(roleDto);
        fail();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Test error');
      }
    });
  });

  describe('update', () => {
    it('should return a role response', async () => {
      const roleDto = new UpdateRoleDto();
      roleDto.id = 1;
      roleDto.name = 'Sales';

      const role: Role = {
        id: 1,
        name: 'Sales',
        created_at: new Date(),
        updated_at: new Date(),
        rolePermissions: [],
      };
      jest
        .spyOn(rolesService, 'update')
        .mockImplementation(() => Promise.resolve(role));

      const response = await rolesController.update(roleDto);
      expect(response).toEqual(new RoleResponse(role));
    });

    it('should return a 500 error if there is a problem updating the role', async () => {
      const roleDto = new UpdateRoleDto();
      roleDto.id = 1;
      roleDto.name = 'Sales';

      jest.spyOn(rolesService, 'update').mockImplementation(() => {
        throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
      });

      try {
        await rolesController.update(roleDto);
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
        .spyOn(rolesService, 'delete')
        .mockImplementation(() => Promise.resolve());

      await rolesController.delete(params);

      expect(rolesService.delete).toHaveBeenCalledWith(id);
    });

    it('should return a 500 error if there is a problem updating the role', async () => {
      const id = 1;
      const params = { id };

      jest.spyOn(rolesService, 'delete').mockImplementation(() => {
        throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
      });

      try {
        await rolesController.delete(params);
        fail();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Test error');
      }
    });
  });
});
