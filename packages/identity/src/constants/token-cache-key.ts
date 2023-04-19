import { createCacheKey } from '../../../core/src/cache/cache-key.js';
import type { CacheKey } from '../../../core/src/cache/types.js';

export const TOKEN_CACHE_KEY: CacheKey = createCacheKey('token', 'api/token');
