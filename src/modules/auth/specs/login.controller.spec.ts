/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../../commons/logger-service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LoginController } from '../login.controller';
import { LoginService } from '../login.service';
import { LoginDto } from '../dtos/login.dto';
import { LoginResponse } from '../dtos/login.response';
import { TokenService } from '../../commons/token-service';
import { UsersService } from '../../users/users.service';
import { UsersRepository } from '../../users/users.repository';
import { CryptoService } from '../../commons/crypto.service';
import { PrismaClient } from '@prisma/client';

describe('UsersController', () => {
  let loginController: LoginController;
  let loginService: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        LoginService,
        LoggerService,
        TokenService,
        UsersService,
        UsersRepository,
        CryptoService,
        PrismaClient,
      ],
    }).compile();

    loginController = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LoginService);
  });

  describe('login', () => {
    it('should return a login response', async () => {
      const loginDto = new LoginDto();
      loginDto.email = 'emilianologuidici@gmail.com';
      loginDto.password = 'Abc$12345$';

      const loginResponse: LoginResponse = {
        email: 'emilianologuidici@gmail.com',
        token: 'token',
      };
      jest
        .spyOn(loginService, 'login')
        .mockImplementation(() => Promise.resolve(loginResponse));

      const response = await loginController.login(loginDto);
      expect(response.token).toEqual(loginResponse.token);
    });

    it('should return a 500 error if there is a problem creating the role', async () => {
      const loginDto = new LoginDto();
      loginDto.email = 'emilianologuidici@gmail.com';
      loginDto.password = 'Abc$12345$';

      jest.spyOn(loginService, 'login').mockImplementation(() => {
        throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
      });

      try {
        await loginController.login(loginDto);
        fail();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Test error');
      }
    });
  });
});
