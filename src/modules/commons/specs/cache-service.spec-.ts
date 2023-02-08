/**
@file Cache Service
@author Emiliano Loguidici
@copyright Last modification date
*/

// Import necessary modules
import { CacheService } from '../cache-service';

describe('CacheService', () => {
  let cacheService: CacheService;

  beforeEach(async () => {
    cacheService = new CacheService();
  });

  describe('set', () => {
    it('should set a value in the cache', () => {
      const key = { name: 'John Doe' };
      const value = 'User data';
      cacheService.set(key, value);
      expect(cacheService.get(key)).toEqual(value);
    });
  });

  describe('get', () => {
    it('should return the value for a given key', () => {
      const key = { name: 'John Doe' };
      const value = 'User data';
      cacheService.set(key, value);
      expect(cacheService.get(key)).toEqual(value);
    });

    it('should return undefined for a non-existing key', () => {
      const key = { name: 'John Doe' };
      expect(cacheService.get(key)).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete a value from the cache', () => {
      const key = { name: 'John Doe' };
      const value = 'User data';
      cacheService.set(key, value);
      cacheService.delete(key);
      expect(cacheService.get(key)).toBeUndefined();
    });
  });

  describe('generateHash', () => {
    it('should generate a SHA-256 hash for a given key', () => {
      const key = { name: 'John Doe' };
      const hash = cacheService.generateHash(key);
      expect(hash).toEqual(
        'a5e5dd5fbb97ccedff7c0a09911f91487e64bb5916f1479df37ecc4c37df1d86',
      );
    });
  });
});
