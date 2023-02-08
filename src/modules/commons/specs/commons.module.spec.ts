import { Test, TestingModule } from '@nestjs/testing';
import { CommonsModule } from '../commons.module';

describe('UsersModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CommonsModule],
    }).compile();
  });

  describe('when the module is imported', () => {
    it('should be defined', () => {
      expect(module).toBeDefined();
    });
  });
});
