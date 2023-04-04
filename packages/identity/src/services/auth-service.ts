import { TOKEN_KEY } from '#/constants/token-key.js';
import { useStorage } from '@rask/core/cache/index.js';
import { useCrypto } from '@rask/core/crypto/index.js';
import { injectable } from '@rask/core/di/injectable.js';
import { throwIfEmpty } from '@rask/core/validation/assert.js';

@injectable()
export class AuthService {
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

    // TODO add API call to sign in user
    const success = await Promise.resolve(true);

    if (success) {
      const storage = useStorage();
      const crypto = useCrypto();

      storage.set(TOKEN_KEY, crypto.uuid);
      return true;
    }

    return false;
  }
}
