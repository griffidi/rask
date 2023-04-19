import { useInject } from '@rask/core/di/inject.js';
import { injectable } from '@rask/core/di/injectable.js';
import { UserService } from '../services/user-service.js';
import type { User } from '../types/graphql.js';

@injectable()
export class CurrentUser {
  #userService = useInject(UserService);

  async get(): Promise<User> {
    const user = await this.#userService.getCurrentUser();
    return user;
  }
}
