import { useCache } from '@rask/core/cache/index.js';
import { TOKEN_CACHE_KEY } from '@rask/core/identity/constants/token-cache-key.js';

export async function authGuard(): Promise<boolean> {
  const cache = useCache();

  if (cache.has(TOKEN_CACHE_KEY)) {
    return true;
  }

  return await Promise.resolve(false);
}
