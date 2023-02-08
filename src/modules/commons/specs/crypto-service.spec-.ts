/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import crypto from 'crypto';
import { CacheService } from '../cache-service';

jest.mock('crypto', () => {
  return {
    createHash: jest.fn().mockReturnValue({
      update: jest.fn().mockReturnValue({
        digest: jest.fn().mockReturnValue('mocked-hash'),
      }),
    }),
  };
});

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    service = new CacheService();
  });

  describe('#set', () => {
    it('should set a value in the cache', () => {
      const key = {};
      const value = 'test-value';

      service.set(key, value);
      expect(service.get(key)).toBe(value);
    });
  });

  describe('#get', () => {
    it('should get a value from the cache', () => {
      const key = {};
      const value = 'test-value';
      service.set(key, value);

      expect(service.get(key)).toBe(value);
    });

    it('should return undefined for a non-existent key', () => {
      const key = {};

      expect(service.get(key)).toBeUndefined();
    });
  });

  describe('#delete', () => {
    it('should delete a value from the cache', () => {
      const key = {};
      const value = 'test-value';
      service.set(key, value);

      service.delete(key);
      expect(service.get(key)).toBeUndefined();
    });
  });

  describe('#generateHash', () => {
    it('should generate a SHA-256 hash for a given key', () => {
      const key = {};

      expect(service.generateHash(key)).toBe('mocked-hash');
      expect(crypto.createHash).toHaveBeenCalledWith('sha256');
    });
  });
});
