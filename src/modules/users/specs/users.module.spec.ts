import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users.module';

describe('UsersModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();
  });

  describe('when the module is imported', () => {
    it('should be defined', () => {
      expect(module).toBeDefined();
    });
  });
});
