import { Test, TestingModule } from '@nestjs/testing';
import { RolesManagementModule } from '../roles-management.module';

describe('RolesManagementModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RolesManagementModule],
    }).compile();
  });

  describe('when the module is imported', () => {
    it('should be defined', () => {
      expect(module).toBeDefined();
    });
  });
});
