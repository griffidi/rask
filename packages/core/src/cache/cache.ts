import type { LitElement } from 'lit';
import { InMemoryStorage } from './in-memory-storage.js';
import { type CacheKey, type CacheStorage, type StorageEventCallbackType, type StorageType } from './types.js';

export class Cache {
  #cache: CacheStorage = {
    storage: undefined,
  };
  #host: LitElement | undefined;
  #subscriptions: Map<CacheKey, StorageEventCallbackType> = new Map();

  /**
   * Get the storage type used by the cache.
   */
  get storage(): Storage {
    return this.#cache.storage;
  }

  constructor(type: StorageType = 'localStorage') {
    this.#setStorageType(type);

    window.addEventListener('storage', this.#onWindowStorage);
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
   * Subscribe to cache changes by key. A host is required because the global window
   * storage event is used to notify subscribers of changes. The host is used to
   * remove the event listener when the host is disconnected.
   *
   * @param {LitElement}  host The host element.
   * @param {CacheKey} cacheKey Key of item to subscribe to.
   * @param {StorageEventCallbackType} callback The callback to be called when the cache changes.
   */
  subscribe(host: LitElement, cacheKey: CacheKey, callback: StorageEventCallbackType): void {
    this.#registerWindowStorageEvent(host);
    this.#subscriptions.set(cacheKey, callback);
  }

  /**
   * Unsubscribe from cache changes.
   *
   * @param cacheKey {CacheKey} Key of item to unsubscribe from.
   */
  unsubscribe(cacheKey: CacheKey): void {
    this.#subscriptions.delete(cacheKey);
  }

  #registerWindowStorageEvent(host: LitElement): void {
    if (!this.#host) {
      this.#host = host;
      window.addEventListener('storage', this.#onWindowStorage);

      host.addEventListener('disconnected', () => {
        window.removeEventListener('storage', this.#onWindowStorage);
      });
    }
  }

  #onWindowStorage(event: StorageEvent): void {
    const { key } = event;

    for (const [cacheKey, callback] of this.#subscriptions.entries()) {
      if (cacheKey === key) {
        callback(JSON.parse(event.newValue));
      }
    }
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
