export type CacheKey = `${string}|${string}`;

export type StorageType = 'localStorage' | 'sessionStorage';

export interface CacheStorage {
  storage: Storage;
}

// eslint-disable-next-line ts/no-explicit-any
export type StorageEventCallbackType = (data: any) => void;
