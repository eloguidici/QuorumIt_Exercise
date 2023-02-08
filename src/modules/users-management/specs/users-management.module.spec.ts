import { Test, TestingModule } from '@nestjs/testing';
import { UsersManagementModule } from '../users-management.module';

describe('UsersManagementModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [UsersManagementModule],
    }).compile();
  });

  describe('when the module is imported', () => {
    it('should be defined', () => {
      expect(module).toBeDefined();
    });
  });
});
