import { useStorage } from '@rask/core/cache/index.js';
import { TOKEN_KEY } from '../constants/token-key.js';

export async function authGuard(): Promise<boolean> {
  const cache = useStorage();

  if (cache.has(TOKEN_KEY)) {
    return true;
  }

  return await Promise.resolve(false);
}
