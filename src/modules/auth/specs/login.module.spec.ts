import { Test, TestingModule } from '@nestjs/testing';
import { LoginModule } from '../login.module';

describe('LoginModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [LoginModule],
    }).compile();
  });

  describe('when the module is imported', () => {
    it('should be defined', () => {
      expect(module).toBeDefined();
    });
  });
});
