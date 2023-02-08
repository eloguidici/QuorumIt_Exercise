/**
 * @file Users Module
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CacheService } from './cache-service';
import { CryptoService } from './crypto.service';
import { LoggerService } from './logger-service';
import { TokenService } from './token-service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CacheService,
    CryptoService,
    LoggerService,
    TokenService,
    PrismaClient,
  ],
  exports: [
    CacheService,
    CryptoService,
    LoggerService,
    TokenService,
    PrismaClient,
  ],
})
export class CommonsModule {}
