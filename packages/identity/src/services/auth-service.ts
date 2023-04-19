import { useCache } from '@rask/core/cache/index.js';
import { useInject } from '@rask/core/di/inject.js';
import { injectable } from '@rask/core/di/injectable.js';
import { TOKEN_CACHE_KEY } from '@rask/core/identity/constants/token-cache-key.js';
import type { CachedToken } from '@rask/core/identity/models/cached-token.js';
import { throwIfEmpty } from '@rask/core/validation/assert.js';
import { Client } from '@rask/graphql/client/client.js';
import { authGuard } from '../guards/auth-guards.js';
import { LoginDocument } from '../types/graphql.js';

const cache = useCache();

// eslint-disable-next-line ts/no-explicit-any
// export type AuthServiceEventCallbackType = (data: any) => void;
export type AuthServiceEventCallbackType = (isAuthenticated: boolean) => void;

@injectable()
export class AuthService {
  #client = useInject(Client);
  #subscriptions: AuthServiceEventCallbackType[] = [];

  /**
   * Is the current user authenticated.
   *
   * @returns {boolean} True if current user is authenticated.
   */
  async isAuthenticated(): Promise<boolean> {
    return await authGuard();
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

    let isAuthenticated = false;

    const token = await this.#client.query<string>({
      query: LoginDocument,
      variables: { userName, password },
      /** you do not want ot cache the login */
      fetchPolicy: 'no-cache',
    });

    if (token) {
      isAuthenticated = true;
      this.#setToken(userName, token);
    }

    this.#dispatchSubscriptions(isAuthenticated);

    return isAuthenticated;
  }

  /**
   * Sign user out. The cached JWT token will be removed from storage.
   */
  logout(): void {
    this.#removeToken();
    this.#dispatchSubscriptions(false);
  }

  /**
   * Subscribe to authentication state changes.
   *
   * @param {AuthServiceEventCallbackType} callback The callback to be called when the authentication state changes.
   */
  subscribe(callback: AuthServiceEventCallbackType): void {
    this.#subscriptions.push(callback);
  }

  /**
   * Unsubscribe from authentication state changes.
   */
  unsubscribe(): void {
    this.#subscriptions = [];
  }

  #dispatchSubscriptions(isAuthenticated: boolean): void {
    this.#subscriptions.map((callback) => callback(isAuthenticated));
  }

  #setToken(userName: string, token: string): void {
    const cachedToken: CachedToken = {
      userName,
      token,
    };
    cache.set(TOKEN_CACHE_KEY, cachedToken);
  }

  #removeToken(): void {
    cache.remove(TOKEN_CACHE_KEY);
  }
}
