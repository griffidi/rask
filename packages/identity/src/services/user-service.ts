import { useCache } from '@rask/core/cache/index.js';
import { useInject } from '@rask/core/di/inject.js';
import { injectable } from '@rask/core/di/injectable.js';
import { TOKEN_CACHE_KEY } from '@rask/core/identity/constants/token-cache-key.js';
import type { CachedToken } from '@rask/core/identity/models/cached-token.js';
import { Client } from '@rask/graphql/client/client.js';
import { USER_CACHE_KEY } from '../constants/user-cache-key.js';
import { GetUserByUserNameDocument, type User } from '../types/graphql.js';

@injectable()
export class UserService {
  #client = useInject(Client);

  /**
   * Get the current user.
   *
   * @returns {Promise<User>} The current user.
   */
  async getCurrentUser(): Promise<User | null> {
    const cache = useCache();
    const cachedUser = cache.get<User>(USER_CACHE_KEY);

    if (cachedUser) {
      return cachedUser;
    }

    const cachedToken = cache.get<CachedToken>(TOKEN_CACHE_KEY);
    const { userName } = cachedToken;
    const user = await this.#client.query<User>({
      query: GetUserByUserNameDocument,
      variables: { userName },
    });

    if (user) {
      cache.set(USER_CACHE_KEY, user);
      return user;
    }

    return null;
  }
}
