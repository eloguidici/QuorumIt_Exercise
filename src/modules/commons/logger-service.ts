/**
 * @file Logger Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService extends Logger {
  private readonly logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  info(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(`${message}`);
  }
}
