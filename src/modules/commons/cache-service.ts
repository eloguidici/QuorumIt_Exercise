/**
@file Cache Service
@author Emiliano Loguidici
@copyright Last modification date
*/

// Import necessary modules
import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class CacheService {
  /**

* @property {Record<string, any>} cache - An object to store cache data.
* @private
*/
  private cache: Record<string, any> = {};

  /**
   * @function set
   * @description Set a value in the cache object.
   * @param {object} key - The key for the cache value.
   * @param {any} value - The value to be stored in the cache.
   * @returns {void}
   */
  set(key: object, value: any): void {
    const hash = this.generateHash(key);
    this.cache[hash] = value;
  }

  /**
   * @function get
   * @description Get a value from the cache object.
   * @param {object} key - The key for the cache value.
   * @returns {any} The value stored in the cache.
   */
  get(key: object): any {
    const hash = this.generateHash(key);
    return this.cache[hash];
  }

  /**
   * @function delete
   * @description Delete a value from the cache object.
   * @param {object} key - The key for the cache value.
   * @returns {void}
   */
  delete(key: object): void {
    const hash = this.generateHash(key);
    delete this.cache[hash];
  }

  /**
   * @function generateHash
   * @description Generate a SHA-256 hash for a given key.
   * @param {object} key - The key for which to generate the hash.
   * @returns {string} The generated hash.
   * @private
   */
  generateHash(key: object): string {
    const keyString = JSON.stringify(key);
    return crypto.createHash('sha256').update(keyString).digest('hex');
  }
}
