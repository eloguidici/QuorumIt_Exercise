/**
 * @file Login Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../commons/logger-service';
import { TokenService } from '../commons/token-service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { LoginResponse } from './dtos/login.response';

@Injectable()
export class LoginService {
  constructor(
    private readonly logger: LoggerService,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(userDto: LoginDto): Promise<LoginResponse> {
    try {
      const user = await this.usersService.validateEmailAndPassword(
        userDto.email,
        userDto.password,
      );
      if (!user) {
        throw new Error(
          `Failed to validate user login: Invalid email or password`,
        );
      }
      const token = await this.tokenService.createToken({
        userId: user.id,
        userRoles: user.userRoles,
      });
      return new LoginResponse(userDto.email, token);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(`Failed to validate user login: ${error.message}`);
    }
  }
}
