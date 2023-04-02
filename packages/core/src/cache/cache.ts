import { InMemroryStorage } from './in-memory-storage.js';
import { type CacheKey, type CacheStorage, type StorageType } from './types.js';

const cacheStorage: CacheStorage = {
  storage: undefined,
};

/**
 * Set the storage type to be used by the cache.
 *
 * @param type {StorageType} Type of storage.
 */
export function setStorageType(type: StorageType): void {
  cacheStorage.storage = (window[type] as Storage) ?? new InMemroryStorage();
}

/**
 * Does item exists in the cache.
 *
 * @param key {string} Key of the item to check if exists in cache.
 * @returns {boolean} True if item exists in cache.
 */
export function has(key: CacheKey): boolean {
  return !!cacheStorage.storage.getItem(key);
}

/**
 * Get item from cache.
 *
 * @param key {string} Key of item in cache.
 * @returns {T | undefined} Item in cache and if it doesn't exists then undefined is returned.
 */
export function get<T>(key: CacheKey): T | undefined {
  const data = cacheStorage.storage.getItem(key);

  if (data) {
    return JSON.parse(data) as T;
  }

  return undefined;
}

/**
 * Add or update item in cache.
 *
 * @param key {string} Key to use for item being stored in cache.
 * @param data {T} Data to store in cache.
 */
export function set<T>(key: CacheKey, data: T): void {
  cacheStorage.storage.setItem(key, JSON.stringify(data));
}

/**
 * Remove item from cache.
 *
 * @param key {string} Key of item to remove from cache.
 */
export function remove(key: CacheKey): void {
  cacheStorage.storage.removeItem(key);
}
