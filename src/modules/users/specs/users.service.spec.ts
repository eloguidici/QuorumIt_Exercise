/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { UsersService } from '../users.service';
import { UsersRepository } from '../users.repository';
import { LoggerService } from '../../commons/logger-service';
import { CryptoService } from '../../commons/crypto.service';
import { User } from '../entities/user.entity';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  let loggerService: LoggerService;
  let cryptoService: CryptoService;

  beforeEach(() => {
    loggerService = new LoggerService();
    cryptoService = new CryptoService();
    usersRepository = new UsersRepository(new PrismaClient(), loggerService);
    usersService = new UsersService(
      usersRepository,
      loggerService,
      cryptoService,
    );
  });

  describe('create', () => {
    it('create a user', async () => {
      const userDto = new CreateUserDto();
      userDto.email = 'emilianologuidici@gmail.com';
      userDto.password = 'Abc$1234';
      userDto.name = 'Emiliano Loguidici';

      const user: User = {
        id: 1,
        email: 'emilianologuidici@gmail.com',
        password: 'Abc$1234',
        name: 'Emiliano Loguidici',
        created_at: undefined,
        updated_at: undefined,
        userRoles: [],
      };

      jest.spyOn(usersRepository, 'create').mockResolvedValueOnce(user);
      jest
        .spyOn(cryptoService, 'encrypt')
        .mockResolvedValueOnce('encrypted_secret');

      const result = await usersService.create(userDto);

      expect(result).toEqual(user);
      expect(cryptoService.encrypt).toHaveBeenCalledWith(userDto.password);
      expect(usersRepository.create).toHaveBeenCalledWith({
        name: userDto.name,
        email: userDto.email,
        password: 'encrypted_secret',
        userRoles: [],
      });
    });
  });

  describe('update', () => {
    it('update a user', async () => {
      const userDto = new UpdateUserDto();
      userDto.email = 'emilianologuidici@gmail.com';
      userDto.name = 'Emiliano Loguidici';

      const user: User = {
        id: 1,
        email: 'emilianologuidici@gmail.com',
        password: 'Abc$1234',
        name: 'Emiliano Loguidici',
        created_at: undefined,
        updated_at: undefined,
        userRoles: [],
      };

      jest.spyOn(usersRepository, 'update').mockResolvedValueOnce(user);

      const result = await usersService.update(userDto);

      expect(result).toEqual(user);
    });
  });

  describe('delete', () => {
    it('should call delete from the users repository', async () => {
      const id = 1;
      jest
        .spyOn(usersRepository, 'delete')
        .mockImplementation(() => Promise.resolve());
      await usersService.delete(1);
      expect(usersRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should return an error if the delete operation fails', async () => {
      const id = 1;
      jest
        .spyOn(usersRepository, 'delete')
        .mockImplementation(() => Promise.reject(new Error('error')));
      await expect(usersService.delete(id)).rejects.toThrowError(
        `Failed to delete user: error`,
      );
    });
  });
});
