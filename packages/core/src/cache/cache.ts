import { InMemoryStorage } from './in-memory-storage.js';
import { type CacheKey, type CacheStorage, type StorageType } from './types.js';

export class Cache {
  #cache: CacheStorage = {
    storage: undefined,
  };

  /**
   * Get the storage type used by the cache.
   */
  get storage(): Storage {
    return this.#cache.storage;
  }

  constructor(type: StorageType = 'localStorage') {
    this.#setStorageType(type);
  }

  /**
   * Does item exists in the cache.
   *
   * @param key {string} Key of the item to check if exists in cache.
   * @returns {boolean} True if item exists in cache.
   */
  has(key: CacheKey): boolean {
    return !!this.#cache.storage.getItem(key);
  }

  /**
   * Get item from cache.
   *
   * @param key {string} Key of item in cache.
   * @returns {T | undefined} Item in cache and if it doesn't exists then undefined is returned.
   */
  get<T>(key: CacheKey): T | undefined {
    const data = this.#cache.storage.getItem(key);

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
  set<T>(key: CacheKey, data: T): void {
    this.#cache.storage.setItem(key, JSON.stringify(data));
  }

  /**
   * Remove item from cache.
   *
   * @param key {string} Key of item to remove from cache.
   */
  remove(key: CacheKey): void {
    this.#cache.storage.removeItem(key);
  }

  /**
   * Set the storage type to be used by the cache.
   *
   * @param type {StorageType} Type of storage.
   */
  #setStorageType(type: StorageType): void {
    this.#cache.storage = (window[type] as Storage) ?? new InMemoryStorage();
  }
}
