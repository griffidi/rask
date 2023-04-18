import { useCache } from '@rask/core/cache/index.js';
import { useCrypto } from '@rask/core/crypto/index.js';
import { useInject } from '@rask/core/di/inject.js';
import { injectable } from '@rask/core/di/injectable.js';
import { throwIfEmpty } from '@rask/core/validation/assert.js';
import { Client } from '@rask/graphql/client/client.js';
import { TOKEN_KEY } from '../constants/token-key.js';
import { LoginDocument } from '../types/graphql.js';

@injectable()
export class AuthService {
  #client = useInject(Client);

  /**
   * Is the current user authenticated.
   *
   * @returns {boolean} True if current user is authenticated.
   */
  async isAuthenticated(): Promise<boolean> {
    // TODO Add API call to check if user is authenticated
    return await Promise.resolve(false);
  }

  /**
   * Sign user in, using userName and password. A JWT token
   * will be cached to storage for this user.
   *
   * @param {string} userName
   * @param {string} password
   * @returns {*}  {Promise<boolean>}
   */
  async login(userName: string, password: string): Promise<boolean> {
    throwIfEmpty(userName, 'UserName is required');
    throwIfEmpty(password, 'Password is required');

    try {
      const token = await this.#client.query<string>({
        query: LoginDocument,
        variables: { userName, password },
        /** you do not want ot cache the login */
        fetchPolicy: 'no-cache',
      });

      if (token) {
        const cache = useCache();
        const crypto = useCrypto();

        cache.set(TOKEN_KEY, crypto.nanoid);
        return true;
      }
    } catch (e) {
      console.error(e);
    }

    return false;
  }

  async setToken(token: string): Promise<void> {
    if (token) {
      const cache = useCache();
      const crypto = useCrypto();

      cache.set(TOKEN_KEY, crypto.nanoid);
    }
  }
}
