import { Cache } from './cache.js';
import { type StorageType } from './types.js';

/**
 * Cache wrapper.
 *
 * @param {string} [type=localStorage] Type of storage to use.
 * @returns
 */
export const useCache = (type: StorageType = 'localStorage') => {
  const cache = new Cache(type);
  return cache;
};

export { createCacheKey } from './cache-key.js';
export { type CacheKey, type StorageType } from './types.js';
