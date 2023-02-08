/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { PermissionsService } from '../permissions.service';
import { PermissionsRepository } from '../permissions.repository';
import { LoggerService } from '../../commons/logger-service';
import { Permission } from '../entities/permission.entity';
import { PrismaClient } from '@prisma/client';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';

describe('PermissionsService', () => {
  let permissionsService: PermissionsService;
  let permissionsRepository: PermissionsRepository;
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService();
    permissionsRepository = new PermissionsRepository(
      new PrismaClient(),
      loggerService,
    );
    permissionsService = new PermissionsService(
      permissionsRepository,
      loggerService,
    );
  });

  describe('create', () => {
    it('create a permission', async () => {
      const permissionDto = new CreatePermissionDto();
      permissionDto.name = 'Add Product';

      const permission: Permission = {
        id: 1,
        name: 'Add Product',
        created_at: undefined,
        updated_at: undefined,
      };

      jest
        .spyOn(permissionsRepository, 'create')
        .mockResolvedValueOnce(permission);

      const result = await permissionsService.create(permissionDto);

      expect(result).toEqual(permission);
    });
  });

  describe('update', () => {
    it('update a permission', async () => {
      const permissionDto = new UpdatePermissionDto();
      permissionDto.id = 1;
      permissionDto.name = 'Add Product';

      const permission: Permission = {
        id: 1,
        name: 'Add Product',
        created_at: undefined,
        updated_at: undefined,
      };

      jest
        .spyOn(permissionsRepository, 'update')
        .mockResolvedValueOnce(permission);

      const result = await permissionsService.update(permissionDto);

      expect(result).toEqual(permission);
    });
  });

  describe('delete', () => {
    it('should call delete from the permissions repository', async () => {
      const id = 1;
      jest
        .spyOn(permissionsRepository, 'delete')
        .mockImplementation(() => Promise.resolve());
      await permissionsService.delete(1);
      expect(permissionsRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should return an error if the delete operation fails', async () => {
      const id = 1;
      jest
        .spyOn(permissionsRepository, 'delete')
        .mockImplementation(() => Promise.reject(new Error('error')));
      await expect(permissionsService.delete(id)).rejects.toThrowError(
        `Failed to delete permission: error`,
      );
    });
  });
});
