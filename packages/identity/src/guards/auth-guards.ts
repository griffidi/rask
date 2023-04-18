import { useCache } from '@rask/core/cache/index.js';
import { TOKEN_KEY } from '../constants/token-key.js';

export async function authGuard(): Promise<boolean> {
  const cache = useCache();

  if (cache.has(TOKEN_KEY)) {
    return true;
  }

  return await Promise.resolve(false);
}
