import {
  randEmail,
  randFirstName,
  randLastName,
  randNumber,
  randPassword,
  randPastDate,
  randUserName,
  randUuid,
} from '@ngneat/falso';
import { roles } from './roles.js';

const adminRoleId = roles.find((role) => role.name === 'Administrator').id;
const userRoleId = roles.find((role) => role.name === 'User').id;

const adminUser = {
  id: randUuid(),
  userName: `${randUserName()}-${randNumber()}`,
  password: randPassword(),
  email: randEmail(),
  firstName: randFirstName(),
  lastName: randLastName(),
  roleId: adminRoleId,
  dateCreated: randPastDate({ years: 10 }),
};

const basicUsers = Array.from({ length: 50 }, () => {
  return {
    id: randUuid(),
    userName: `${randUserName()}-${randNumber()}`,
    password: randPassword(),
    email: randEmail(),
    firstName: randFirstName(),
    lastName: randLastName(),
    roleId: userRoleId,
    dateCreated: randPastDate({ years: 10 }),
  };
});

export const users = [adminUser, ...basicUsers];
