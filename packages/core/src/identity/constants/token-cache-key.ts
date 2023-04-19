import { createCacheKey, type CacheKey } from '../../cache/index.js';

export const TOKEN_CACHE_KEY: CacheKey = createCacheKey('token', 'api/token');
