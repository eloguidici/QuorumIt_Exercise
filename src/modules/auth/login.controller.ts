/**
 * @file Login Controller
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../commons/logger-service';
import { LoginDto } from './dtos/login.dto';
import { LoginResponse } from './dtos/login.response';
import { LoginService } from './login.service';

/**
 * Login Controller
 */
@ApiTags('Login')
@Controller('login')
export class LoginController {
  /**
   * Login Controller Constructor
   * @param {UsersService} usersService Users Service
   * @param {LoggerService} logger Winston Logger
   */
  constructor(
    private readonly loginService: LoginService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Login user
   * @param {LoginDto} loginDto Login DTO
   * @return {Promise<LoginResponse>} LoginResponse Promise
   */
  @Post()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid username or password',
  })
  @ApiResponse({
    status: 500,
    description: 'Server error - An unexpected error occurred on the server',
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    try {
      return await this.loginService.login(loginDto);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
