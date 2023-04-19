import { useCache } from '@rask/core/cache/index.js';
import type { StorageEventCallbackType } from '@rask/core/cache/types.js';
import { useInject } from '@rask/core/di/inject.js';
import { injectable } from '@rask/core/di/injectable.js';
import { throwIfEmpty } from '@rask/core/validation/assert.js';
import { Client } from '@rask/graphql/client/client.js';
import type { LitElement } from 'lit';
import { TOKEN_CACHE_KEY } from '../constants/token-cache-key.js';
import { authGuard } from '../guards/auth-guards.js';
import type { CachedToken } from '../models/cached-token.js';
import { LoginDocument } from '../types/graphql.js';

const cache = useCache();

@injectable()
export class AuthService {
  #client = useInject(Client);

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

    const token = await this.#client.query<string>({
      query: LoginDocument,
      variables: { userName, password },
      /** you do not want ot cache the login */
      fetchPolicy: 'no-cache',
    });

    if (token) {
      this.#setToken(userName, token);
      return true;
    }

    return false;
  }

  /**
   * Sign user out. The cached JWT token will be removed from storage.
   */
  logout(): void {
    this.#removeToken();
  }

  /**
   * Subscribe to authentication state changes. A host is required so that the
   * subscription can be unsubscribed when the host is disconnected.
   *
   * @param {LitElement} host The host element.
   * @param {StorageEventCallbackType} callback The callback to be called when the authentication state changes.
   */
  subscribe(host: LitElement, callback: StorageEventCallbackType): void {
    cache.subscribe(host, TOKEN_CACHE_KEY, callback);
  }

  /**
   * Unsubscribe from authentication state changes.
   */
  unsubscribe(): void {
    cache.unsubscribe(TOKEN_CACHE_KEY);
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
