import * as cache from './cache.js';
import { type StorageType } from './types.js';

const storage = cache;

/**
 * Storage wrapper that exposes helper APIs.
 *
 * @param {string} [type=localStorage] Type of storage to use.
 * @returns
 */
export const useStorage = (type: StorageType = 'localStorage'): typeof storage => {
  cache.setStorageType(type);

  return storage;
};

export { createCacheKey } from './cache-key.js';
export { type CacheKey, type StorageType } from './types.js';
