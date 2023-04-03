export type CacheKey = `${string}|${string}`;

export type StorageType = 'localStorage' | 'sessionStorage';

export interface CacheStorage {
  storage: Storage;
}
