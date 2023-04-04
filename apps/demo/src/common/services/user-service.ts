import { users } from '#/fake-data/users.js';
import { injectable } from '@rask/core/di/injectable.js';
import type { User } from '../models/user.js';

@injectable()
export class UserService {
  async getUserById(id: string): Promise<Readonly<User>> {
    const user = users.find((u) => u.id === id);

    return await Promise.resolve(user);
  }

  async getUsersPaginated(skip: number, take: number): Promise<ReadonlyArray<Readonly<User>>> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const page = users.slice(skip, skip + take);

        await resolve(page);
      }, 1_000);
    });
  }

  async updateUser(user: User): Promise<void> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        let userMatch = users.find((u) => (u.id = user.id));

        if (userMatch) {
          userMatch = {
            ...userMatch,
            ...user,
          };
        }

        resolve();
      }, 1_000);
    });
  }
}
