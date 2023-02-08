/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { RolesService } from '../roles.service';
import { RolesRepository } from '../roles.repository';
import { LoggerService } from '../../commons/logger-service';
import { Role } from '../entities/role.entity';
import { PrismaClient } from '@prisma/client';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';

describe('RolesService', () => {
  let rolesService: RolesService;
  let rolesRepository: RolesRepository;
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService();
    rolesRepository = new RolesRepository(new PrismaClient(), loggerService);
    rolesService = new RolesService(rolesRepository, loggerService);
  });

  describe('create', () => {
    it('create a role', async () => {
      const roleDto = new CreateRoleDto();
      roleDto.name = 'Sales';

      const role: Role = {
        id: 1,
        name: 'Sales',
        created_at: undefined,
        updated_at: undefined,
      };

      jest.spyOn(rolesRepository, 'create').mockResolvedValueOnce(role);
      const result = await rolesService.create(roleDto);
      expect(result).toEqual(role);
    });

    it('should return an error if the create operation fails', async () => {
      const roleDto = new CreateRoleDto();
      roleDto.name = 'Sales';
      jest
        .spyOn(rolesRepository, 'create')
        .mockImplementation(() => Promise.reject(new Error('error')));
      await expect(rolesService.create(roleDto)).rejects.toThrowError(
        `Failed to create role: error`,
      );
    });
  });

  describe('update', () => {
    it('update a role', async () => {
      const roleDto = new UpdateRoleDto();
      roleDto.id = 1;
      roleDto.name = 'Sales';

      const role: Role = {
        id: 1,
        name: 'Sales',
        created_at: undefined,
        updated_at: undefined,
      };

      jest.spyOn(rolesRepository, 'update').mockResolvedValueOnce(role);
      const result = await rolesService.update(roleDto);
      expect(result).toEqual(role);
    });

    it('should return an error if the update operation fails', async () => {
      const roleDto = new UpdateRoleDto();
      roleDto.id = 1;
      roleDto.name = 'Sales';

      jest
        .spyOn(rolesRepository, 'update')
        .mockImplementation(() => Promise.reject(new Error('error')));
      await expect(rolesService.update(roleDto)).rejects.toThrowError(
        `Failed to update role: error`,
      );
    });
  });

  describe('delete', () => {
    it('should call delete from the roles repository', async () => {
      const id = 1;
      jest
        .spyOn(rolesRepository, 'delete')
        .mockImplementation(() => Promise.resolve());
      await rolesService.delete(1);
      expect(rolesRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should return an error if the delete operation fails', async () => {
      const id = 1;
      jest
        .spyOn(rolesRepository, 'delete')
        .mockImplementation(() => Promise.reject(new Error('error')));
      await expect(rolesService.delete(id)).rejects.toThrowError(
        `Failed to delete role: error`,
      );
    });
  });
});
