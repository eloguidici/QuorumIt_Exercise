/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { LoggerService } from '../../commons/logger-service';
import { PrismaClient } from '@prisma/client';
import { LoginService } from '../login.service';
import { LoginDto } from '../dtos/login.dto';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';
import { UsersRepository } from '../../users/users.repository';
import { CryptoService } from '../../commons/crypto.service';
import { TokenService } from '../../commons/token-service';

describe('LoginService', () => {
  let loginService: LoginService;
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  let loggerService: LoggerService;
  let cryptoService: CryptoService;
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
    loggerService = new LoggerService();
    usersRepository = new UsersRepository(new PrismaClient(), loggerService);
    usersService = new UsersService(
      usersRepository,
      loggerService,
      cryptoService,
    );
    loginService = new LoginService(loggerService, usersService, tokenService);
  });

  describe('login', () => {
    it('do login', async () => {
      const loginDto = new LoginDto();
      loginDto.email = 'emilianologuidici@gmail.com';
      loginDto.password = 'password';

      const user: User = {
        id: 1,
        name: 'Emiliano Loguidici',
        email: 'emilianologuidici@gmail.com',
        password: 'password',
        created_at: undefined,
        updated_at: undefined,
        userRoles: [],
      };

      jest
        .spyOn(usersService, 'validateEmailAndPassword')
        .mockResolvedValueOnce(user);
      const result = await loginService.login(loginDto);
      expect(result).not.toBeUndefined();
      expect(result).not.toBeNull();
    });
  });
});
