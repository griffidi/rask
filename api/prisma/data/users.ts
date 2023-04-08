import {
  randEmail,
  randFirstName,
  randLastName,
  randNumber,
  randPassword,
  randPastDate,
  randUserName,
  randUuid,
  toCollection,
} from '@ngneat/falso';
import { Roles } from './roles.js';

export const adminUser = {
  id: randUuid(),
  userName: `${randUserName()}-${randNumber()}`,
  password: randPassword(),
  email: randEmail(),
  firstName: randFirstName(),
  lastName: randLastName(),
  role: Roles.ADMIN,
  dateCreated: randPastDate({ years: 10 }),
};

export const basicUsers = toCollection(
  () => {
    return {
      id: randUuid(),
      userName: `${randUserName()}-${randNumber()}`,
      password: randPassword(),
      email: randEmail(),
      firstName: randFirstName(),
      lastName: randLastName(),
      role: Roles.USER,
      dateCreated: randPastDate({ years: 10 }),
    };
  },
  { length: 50 }
);
