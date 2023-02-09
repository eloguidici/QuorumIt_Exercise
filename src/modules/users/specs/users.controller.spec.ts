/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { LoggerService } from '../../commons/logger-service';
import { AdministratorGuard } from '../../auth/guards/administrator-guard';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponse } from '../dtos/user-response.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../users.repository';
import { CryptoService } from '../../commons/crypto.service';
import { PrismaClient } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        UsersRepository,
        LoggerService,
        CryptoService,
        PrismaClient,
        {
          provide: AdministratorGuard,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should return a user response', async () => {
      const userDto = new CreateUserDto();
      userDto.email = 'emilianologuidici@gmail.com';
      userDto.password = 'Abc$1234';
      userDto.name = 'Emiliano Loguidici';

      const user: User = {
        id: 1,
        email: 'emilianologuidici@gmail.com',
        password: 'Abc$1234',
        name: 'Emiliano Loguidici',
        created_at: new Date(),
        updated_at: undefined,
        userRoles: [],
        userPermissions: [],
      };
      jest
        .spyOn(usersService, 'create')
        .mockImplementation(() => Promise.resolve(user));

      const response = await usersController.create(userDto);
      expect(response).toEqual(new UserResponse(user));
    });

    it('should return a 500 error if there is a problem creating the user', async () => {
      const userDto = new CreateUserDto();
      userDto.email = 'emilianologuidici@gmail.com';
      userDto.password = 'Abc$1234';
      userDto.name = 'Emiliano Loguidici';

      jest.spyOn(usersService, 'create').mockImplementation(() => {
        throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
      });

      try {
        await usersController.create(userDto);
        fail();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Test error');
      }
    });
  });

  describe('update', () => {
    it('should return a user response', async () => {
      const userDto = new UpdateUserDto();
      userDto.email = 'emilianologuidici@gmail.com';
      userDto.name = 'Emiliano Martin Loguidici';

      const user: User = {
        id: 1,
        email: 'emilianologuidici@gmail.com',
        password: 'Abc$1234',
        name: 'Emiliano Loguidici',
        created_at: undefined,
        updated_at: undefined,
        userRoles: [],
        userPermissions: [],
      };
      jest
        .spyOn(usersService, 'update')
        .mockImplementation(() => Promise.resolve(user));
      const response = await usersController.update(userDto);
      expect(response).toEqual(new UserResponse(user));
    });

    it('should return a 500 error if there is a problem updating the user', async () => {
      const userDto = new UpdateUserDto();
      userDto.email = 'emilianologuidici@gmail.com';
      userDto.name = 'Emiliano Martin Loguidici';

      jest.spyOn(usersService, 'update').mockImplementation(() => {
        throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
      });

      try {
        await usersController.update(userDto);
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
        .spyOn(usersService, 'delete')
        .mockImplementation(() => Promise.resolve());

      await usersController.delete(params);

      expect(usersService.delete).toHaveBeenCalledWith(id);
    });

    it('should return a 500 error if there is a problem updating the user', async () => {
      const id = 1;
      const params = { id };

      jest.spyOn(usersService, 'delete').mockImplementation(() => {
        throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
      });

      try {
        await usersController.delete(params);
        fail();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Test error');
      }
    });
  });
});
