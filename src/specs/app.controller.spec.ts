/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('check', () => {
    it('should return "Todo está funcionando correctamente" and HttpStatus.OK', async () => {
      const result = await appController.check();
      expect(result.message).toBe('Todo está funcionando correctamente');
      expect(result.status).toBe(HttpStatus.OK);
    });

    it('should throw HttpException with error and HttpStatus.INTERNAL_SERVER_ERROR', async () => {
      jest.spyOn(appController, 'check').mockImplementation(() => {
        throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
      });
      try {
        await appController.check();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Test error');
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
