import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('')
export class AppController {
  @Get()
  async check() {
    try {
      return {
        message: 'Todo está funcionando correctamente',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
